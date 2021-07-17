using System.Linq;
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
        
        /// <summary>
        /// Finding role of the user
        /// </summary>
        /// <returns>User role name</returns>
        public static async Task<string> FindByNameByClaimsPrincipleUserRoleAsync( 
            this UserManager<AppUser> input, ClaimsPrincipal user )
        {
            
            
            var loginUser = await input.FindByNameByClaimsPrincipleAsync ( user );
            var role = await input.GetRolesAsync ( loginUser );

            return role.First();
        }
    }
}