using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByNameByClaimsPrincipleAsync( 
            this UserManager<AppUser> input, ClaimsPrincipal user )
        {
            var name = user.FindFirstValue ( ClaimTypes.Name );

            return await input.Users
                .SingleOrDefaultAsync ( x => x.UserName == name );
        }
    }
}