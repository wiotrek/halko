using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Extensions;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
            // TODO: Change login way using Identity
            // TODO: Modify user table in halko database for reference between user in halko and user in identity

            // Sign out any previous sessions
            await HttpContext.SignOutAsync ( IdentityConstants.ApplicationScheme );

            
            var user = await _userManager.FindByNameAsync ( loginDto.Login );
            if( user == null ) return Unauthorized();

            var userRole = _userManager.GetRolesAsync ( user ).Result.First();
            
            // TODO: Add Point and AspNetUserPoints tables in identity database
            // var userWithPointSpec = new UserWithPointsSpecification ( user.Id );
            // var userPoints = await _userPointsRepo.ListAsync ( userWithPointSpec );

            var result = await _signInManager.PasswordSignInAsync ( loginDto.Login, loginDto.Password, true, true );


            if( !result.Succeeded )
                return BadRequest();

            
            return new LoginUserDto
            {
                PointNames = new List<string>(),//userPoints.Select ( x => x.Point.Name ),
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
            // Get current user
            var currentUser = await _userManager.FindByNameByClaimsPrincipleAsync ( User );
            
            // Get user role
            var userRole = await _userManager.GetRolesAsync ( currentUser );
            var userRoleName = userRole.First();
            
            // Make sure that user is admin
            if( userRoleName != "Admin" )
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
            
            await _userManager.AddToRoleAsync ( appUser, "Point" );
            
            #endregion
            
            #region Create Point
            
            // Create point
            var insertedPoint = await _pointService.CreatePointAsync ( pointCreateDto.PointName );
            if (insertedPoint == null) return BadRequest();
            
            
            // Make reference between created user and point in UserPoints table
            await _pointService.AddPointToUser ( appUser.Id, insertedPoint.Id );
            
            // and also reference between admin users with this point
            var adminUsers = await _userManager.GetUsersInRoleAsync ( "Admin" );
            foreach ( var user in adminUsers )
                await _pointService.AddPointToUser ( user.Id, insertedPoint.Id );
            
            #endregion
            
            
            return Ok();
        }
    }
}