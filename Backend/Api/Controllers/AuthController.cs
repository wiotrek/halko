using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Errors;
using Api.Extensions;
using Core.Entities.Identity;
using Core.Enums;
using Core.Interfaces;
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
            IPointService pointService ) : base ( userManager )
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
            #region Get User
            
            var user = await _userManager.FindByNameAsync ( loginDto.Login );
            if( user == null ) return Unauthorized ( new ApiResponse ( 401 ) );

            var result = await _signInManager.CheckPasswordSignInAsync ( user, loginDto.Password, false );
            
            if( !result.Succeeded ) return Unauthorized ( new ApiResponse ( 401 ) );

            #endregion

            var listPoints = new List<string>();
            var userRole = _userManager.GetRolesAsync ( user ).Result.First();
            
            if( userRole == EUserRole.Point.GetDisplayName() )
                listPoints.Add ( _pointService.GetPointByUserAsync ( user ).Result.Name );
            else
                listPoints = _pointService.ListPointsAsync().Result.Select ( x => x.Name ).ToList();
            

            return new LoginUserDto
            {
                Login = user.UserName,
                PointNames = listPoints,
                Role = userRole,
                Token = _tokenService.CreateToken ( user )
            };
        }


        [Authorize]
        [HttpPost ("register-point")]
        public async Task<ActionResult> RegisterPointAsync( PointCreateDto pointCreateDto)
        {
            if( !await IsAdmin() ) 
                return Unauthorized ( new ApiResponse ( 401, ApiErrorMessage.AdminContent.GetnEnumMemberValue() ) );
            
            #region Duplicate Checker
            
            var isExistUser = await _userManager.FindByNameAsync ( pointCreateDto.Login );
            if( isExistUser != null )
                return BadRequest ( new ApiResponse ( 400, ApiErrorMessage.UserExist.GetnEnumMemberValue() ) );

            if( await _pointService.IsPointExist ( pointCreateDto.PointName ) )
                return BadRequest ( new ApiResponse ( 400, ApiErrorMessage.PointExist.GetnEnumMemberValue() ) );
            
            #endregion
            
            #region Create user with point role
            
            var appUser = new AppUser
            {
                UserName = pointCreateDto.Login
            };
            
            var insertedUser = await  _userManager.CreateAsync ( appUser, pointCreateDto.Password );
            if( !insertedUser.Succeeded )
                return BadRequest ( new ApiResponse ( 400, ApiErrorMessage.PointCreate.GetnEnumMemberValue() ) );
            
            await _userManager.AddToRoleAsync ( appUser, EUserRole.Point.GetDisplayName() );
            
            #endregion
            
            #region Create Point
            
            // Create point
            var insertedPoint = await _pointService.CreatePointAsync ( pointCreateDto.PointName );
            if( insertedPoint == null )
                return BadRequest ( new ApiResponse ( 400, ApiErrorMessage.PointCreate.GetnEnumMemberValue() ) );
            
            
            // Make reference between created user and point in UserPoints table
            await _pointService.AddPointToUser ( appUser.Id, insertedPoint.Id );
            
            // and also reference between admin users with this point
            var adminUsers = await _userManager.GetUsersInRoleAsync ( EUserRole.Admin.GetDisplayName() );
            foreach ( var user in adminUsers )
                await _pointService.AddPointToUser ( user.Id, insertedPoint.Id );
            
            #endregion
            
            
            return Ok();
        }

        [Authorize]
        [HttpPost ( "register-admin" )]
        public async Task<ActionResult> RegisterUserAsync( UserCreateDto userCreateDto )
        {
            if( !await IsAdmin() )
                return Unauthorized ( new ApiResponse ( 401, ApiErrorMessage.AdminContent.GetnEnumMemberValue() ) );
            
            
            var isExistUser = await _userManager.FindByNameAsync ( userCreateDto.Name );
            if( isExistUser != null )
                return BadRequest ( new ApiResponse ( 400, ApiErrorMessage.AdminExist.GetnEnumMemberValue() ) );


            var appUser = new AppUser { UserName = userCreateDto.Name };
            
            
            var insertedUser = await  _userManager.CreateAsync ( appUser, userCreateDto.Password );
            if( !insertedUser.Succeeded ) 
                return BadRequest( new ApiResponse ( 400, ApiErrorMessage.AdminCreate.GetnEnumMemberValue() ) );
            
            
            await _userManager.AddToRoleAsync ( appUser, EUserRole.Admin.GetDisplayName() );


            foreach ( var point in await _pointService.ListPointsAsync() )
                await _pointService.AddPointToUser ( appUser.Id, point.Id );
            
            
            return Ok();
        }

        [Authorize]
        [HttpPut("change-password")]
        public async Task<ActionResult> ChangePasswordAsync(ChangePasswordDto changePasswordDto)
        {
            if( !await IsAdmin() ) 
                return Unauthorized( new ApiResponse ( 401, ApiErrorMessage.AdminContent.GetnEnumMemberValue() ) );
            
            var user = await _userManager.FindByNameAsync ( changePasswordDto.Login );
            if( user  == null )
                return BadRequest( new ApiResponse ( 400, ApiErrorMessage.UserNotExist.GetnEnumMemberValue() ) );
            

            var result = await _userManager.ChangePasswordAsync ( user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword );
            
            return result.Succeeded ? 
                Ok() : 
                BadRequest( new ApiResponse ( 400, ApiErrorMessage.ChangePassword.GetnEnumMemberValue() ) );
        }
    }
}