using Core.Entities.Auth;

namespace Core.Specifications
{
    public class UserWithRoleSpecification : BaseSpecification<UserRole>
    {
        public UserWithRoleSpecification( int userId ) 
            : base( x => x.UserId == userId )
        {
            AddInclude ( x => x.User );
            AddInclude ( x => x.Role );
        }
    }
}