using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;
using Core.Entities.Auth;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AuthController : BaseApiController
    {
        #region Private Members
        
        private readonly IGenericRepository<User> _userRepo;
        private readonly IGenericRepository<UserRole> _userRoleRepo;
        private readonly IGenericRepository<UserPoint> _userPointsRepo;
        private readonly ITokenService _tokenService;
        
        /// <summary>
        /// The manager for handling users creation, deletion, searching, roles etc...
        /// </summary>
        private readonly UserManager<AppUser> _userManager;
        
        /// <summary>
        /// The manager for handling signing in and out for our users
        /// </summary>
        private readonly SignInManager<AppUser> _signInManager;
        
        #endregion

        public AuthController(
            IGenericRepository<User> userRepo,
            IGenericRepository<UserRole> userRoleRepo,
            IGenericRepository<UserPoint> userPointsRepo,
            ITokenService tokenService,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager)
        {
            _userRepo = userRepo;
            _userRoleRepo = userRoleRepo;
            _userPointsRepo = userPointsRepo;
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        

        [HttpPost ( "login" )]
        public async Task<ActionResult<LoginUserDto>> LoginAsync( LoginDto loginDto )
        {
            // TODO: Change login way using Identity
            // TODO: Modify user table in halko database for reference between user in halko and user in identity
            
            // var spec = new UserSpecification ( loginDto.Login );
            // var user = await _userRepo.GetEntityWithSpecAsync ( spec );
            //
            //
            // if( user == null ) return Unauthorized ();
            // if (user.Password != loginDto.Password) return Unauthorized ();
            //
            //
            // var userWithRoleSpec = new UserWithRoleSpecification ( user.Id );
            // var userWithPointSpec = new UserWithPointsSpecification ( user.Id );
            //
            // var userRole = await _userRoleRepo.GetEntityWithSpecAsync ( userWithRoleSpec );
            // var userPoints = await _userPointsRepo.ListAsync ( userWithPointSpec );

            var result = await _signInManager.PasswordSignInAsync ( loginDto.Login, loginDto.Password, true, true );
            
            return new LoginUserDto
            {
                PointNames = new List<string>(),//userPoints.Select ( x => x.Point.Name ),
                Role = "",//userRole.Role.Name,
                Token = ""//_tokenService.CreateToken ( user )
            };
        }
        
        [HttpPost ("register-points")]
        public async Task<ActionResult> RegisterPointAsync( UserCreateDto userCreateDto)
        {
            var user = HttpContext.User.Identity.Name;
            
            // Check if user is admin to create point
            
            // TODO: Attach role to user as point
            
            return Ok();
        }
        
        [HttpPost ("register-user")]
        public async Task<ActionResult> RegisterAdminAsync( UserCreateDto userCreateDto)
        {
            // Check if user is admin to add next admin user
            
            var user = new AppUser
            {
                UserName = userCreateDto.Name,
            };
            
            // TODO: attach role to user as admin

            var result = await _userManager.CreateAsync ( user, userCreateDto.Password );

            if( !result.Succeeded ) return BadRequest();
            
            return Ok();
        }
    }
}