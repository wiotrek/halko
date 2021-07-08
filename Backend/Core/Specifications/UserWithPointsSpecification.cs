using Core.Entities.Auth;

namespace Core.Specifications
{
    public class UserWithPointsSpecification : BaseSpecification<UserPoint>
    {
        public UserWithPointsSpecification( int userId ) : 
            base( x => x.UserId == userId )
        {
            AddInclude ( x => x.User );
            AddInclude ( x => x.Point );
        }
    }
}