using System.Threading.Tasks;
using Api.Dtos;
using Core.Entities.Auth;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly IGenericRepository<User> _userRepo;
        private readonly IGenericRepository<UserRole> _userRoleRepo;
        private readonly IGenericRepository<Role> _roleRepo;
        private readonly IGenericRepository<UserPoint> _userPointsRepo;
        private readonly IGenericRepository<Point> _pointsRepo;
        private readonly ITokenService _tokenService;

        public AuthController(
            IGenericRepository<User> userRepo,
            IGenericRepository<UserRole> userRoleRepo,
            IGenericRepository<Role> roleRepo,
            IGenericRepository<UserPoint> userPointsRepo,
            IGenericRepository<Point> pointsRepo,
            ITokenService tokenService)
        {
            _userRepo = userRepo;
            _userRoleRepo = userRoleRepo;
            _roleRepo = roleRepo;
            _userPointsRepo = userPointsRepo;
            _pointsRepo = pointsRepo;
            _tokenService = tokenService;
        }

        
        // TODO: Move body to auth service
        // TODO: Check correct password
        [HttpPost ( "login" )]
        public async Task<ActionResult<LoginUserDto>> LoginAsync( LoginDto loginDto )
        {
            var spec = new UserSpecification ( loginDto.Login );

            var userToReturn = await _userRepo.GetEntityWithSpecAsync ( spec );
            if( userToReturn == null ) return Unauthorized ();

            var userWithPointSpec = new UserWithPointsSpecification ( userToReturn.Id );

            var userRole =  await _userRoleRepo.GetByIdAsync ( userToReturn.Id );
            var userRoleName = await _roleRepo.GetByIdAsync ( userRole.RoleId );

            var userPoints = await _userPointsRepo.ListAsync ( userWithPointSpec );
            
            // TODO: We have a problem to create spec with list of points to pass
            //var pointSpec = new PointSpecification ();

            return new LoginUserDto
            {
                //PointNames = 
                Role = userRoleName.Name,
                Token = _tokenService.CreateToken ( userToReturn )
            };
        }
    }
}