using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Extensions;
using Core.Entities.Identity;
using Core.Enums;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

namespace Api.Controllers
{
    public class AuthController : BaseApiController
    {
        #region Private Members
        
        private readonly ITokenService _tokenService;
        
        /// <summary>
        /// The manager for handling users creation, deletion, searching, roles etc...
        /// </summary>
        private readonly UserManager<AppUser> _userManager;
        

        /// <summary>
        /// The manager for handling signing in and out for our users
        /// </summary>
        private readonly SignInManager<AppUser> _signInManager;
        

        private readonly IPointService _pointService;

        #endregion

        #region Constructor
        
        public AuthController(
            ITokenService tokenService,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IPointService pointService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _pointService = pointService;
        }
        
        #endregion

        [HttpPost ( "login" )]
        public async Task<ActionResult<LoginUserDto>> LoginAsync( LoginDto loginDto )
        {
            // Sign out any previous sessions
            await HttpContext.SignOutAsync ( IdentityConstants.ApplicationScheme );

            #region Get User
            
            var user = await _userManager.FindByNameAsync ( loginDto.Login );
            if( user == null ) return Unauthorized();

            var result = await _signInManager.PasswordSignInAsync ( loginDto.Login, loginDto.Password, true, true );
            
            if( !result.Succeeded )
                return BadRequest();

            #endregion

            var listPoints = new List<string>();
            var userRole = _userManager.GetRolesAsync ( user ).Result.First();
            
            if( userRole == EUserRole.Point.GetDisplayName() )
                listPoints.Add ( _pointService.GetPointByUserAsync ( user ).Result.Name );
            else
                listPoints = _pointService.ListPointsAsync().Result.Select ( x => x.Name ).ToList();
            

            return new LoginUserDto
            {
                PointNames = listPoints,
                Role = userRole,
                Token = _tokenService.CreateToken ( user )
            };
        }

        
        [HttpGet ( "logout" )]
        public async Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync ( IdentityConstants.ApplicationScheme );

            return Ok();
        }
        
        
        [HttpPost ("register-point")]
        [Authorize]
        public async Task<ActionResult> RegisterPointAsync( PointCreateDto pointCreateDto)
        {
            var userRole = await _userManager.FindByNameByClaimsPrincipleUserRoleAsync ( User );

            if( userRole != EUserRole.Admin.GetDisplayName() )
                return Unauthorized();

            
            #region Duplicate Checker
            
            var isExistUser = await _userManager.FindByNameAsync ( pointCreateDto.Login );
            if( isExistUser  != null )
                return BadRequest();

            if( await _pointService.IsPointExist ( pointCreateDto.PointName ) )
                return BadRequest();
            
            #endregion
            
            #region Create user with point role
            
            var appUser = new AppUser
            {
                UserName = pointCreateDto.Login
            };
            
            var insertedUser = await  _userManager.CreateAsync ( appUser, pointCreateDto.Password );
            if( !insertedUser.Succeeded ) return BadRequest();
            
            await _userManager.AddToRoleAsync ( appUser, EUserRole.Point.GetDisplayName() );
            
            #endregion
            
            #region Create Point
            
            // Create point
            var insertedPoint = await _pointService.CreatePointAsync ( pointCreateDto.PointName );
            if (insertedPoint == null) return BadRequest();
            
            
            // Make reference between created user and point in UserPoints table
            await _pointService.AddPointToUser ( appUser.Id, insertedPoint.Id );
            
            // and also reference between admin users with this point
            var adminUsers = await _userManager.GetUsersInRoleAsync ( EUserRole.Admin.GetDisplayName() );
            foreach ( var user in adminUsers )
                await _pointService.AddPointToUser ( user.Id, insertedPoint.Id );
            
            #endregion
            
            
            return Ok();
        }

        [HttpPost ( "register-admin" )]
        [Authorize]
        public async Task<ActionResult> RegisterUserAsync( UserCreateDto userCreateDto )
        {
            var userRole = await _userManager.FindByNameByClaimsPrincipleUserRoleAsync ( User );
            
            
            if( userRole != EUserRole.Admin.GetDisplayName() )
                return Unauthorized();
            
            
            var isExistUser = await _userManager.FindByNameAsync ( userCreateDto.Name );
            if( isExistUser  != null )
                return BadRequest();
            
            
            var appUser = new AppUser
            {
                UserName = userCreateDto.Name
            };
            
            
            var insertedUser = await  _userManager.CreateAsync ( appUser, userCreateDto.Password );
            if( !insertedUser.Succeeded ) return BadRequest();
            
            
            await _userManager.AddToRoleAsync ( appUser, EUserRole.Admin.GetDisplayName() );


            foreach ( var point in await _pointService.ListPointsAsync() )
                await _pointService.AddPointToUser ( appUser.Id, point.Id );
            
            
            return Ok();
        }

        [HttpPut("change-password")]
        [Authorize]
        public async Task<ActionResult> ChangePasswordAsync(ChangePasswordDto changePasswordDto)
        {
            var userRole = await _userManager.FindByNameByClaimsPrincipleUserRoleAsync ( User );

            if( userRole != EUserRole.Admin.GetDisplayName() )
                return Unauthorized();
            
            var user = await _userManager.FindByNameAsync ( changePasswordDto.Login );
            if( user  == null )
                return BadRequest();
            

            var result = await _userManager.ChangePasswordAsync ( user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword );
            
            return result.Succeeded ? Ok() : BadRequest();
        }
    }
}