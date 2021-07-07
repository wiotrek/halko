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
        private readonly ITokenService _tokenService;

        public AuthController(
            IGenericRepository<User> userRepo,
            ITokenService tokenService)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
        }

        //TODO: Create token service
        [HttpPost ( "login" )]
        public async Task<ActionResult<User>> LoginAsync( LoginDto loginDto )
        {
            var spec = new UserSpecification ( loginDto.Login );

            var userToReturn = await _userRepo.GetEntityWithSpecAsync ( spec );
            //TODO: After founded user get assigned point of this user to return or all points if user is admin

            if( userToReturn == null ) return Unauthorized ();

            return new User
            {
                Id = userToReturn.Id,
                Login = userToReturn.Login,
                Password = _tokenService.CreateToken ( userToReturn )
            };
        }
    }
}