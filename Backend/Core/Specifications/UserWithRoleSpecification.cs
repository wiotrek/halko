using Core.Entities.Auth;

namespace Core.Specifications
{
    public class UserWithRoleSpecification : BaseSpecification<UserRole>
    {
        public UserWithRoleSpecification( int userId ) : 
            base( x => x.User.Id == userId )
        {
            AddInclude ( x => x.Role );
        }
    }
}