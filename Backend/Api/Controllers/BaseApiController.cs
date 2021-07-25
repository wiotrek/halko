using System.Threading.Tasks;
using Api.Extensions;
using Core.Entities.Identity;
using Core.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public BaseApiController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        protected async Task<bool> IsAdmin()
        {
            var userRole = await _userManager.FindByNameByClaimsPrincipleUserRoleAsync ( User );

            return userRole == EUserRole.Admin.GetDisplayName();
        }
    }
}