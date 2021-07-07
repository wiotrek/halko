using Core.Entities.Auth;

namespace Core.Specifications
{
    public class UserWithPointsSpecification : BaseSpecification<UserPoint>
    {
        public UserWithPointsSpecification( int id ) : 
            base( x => x.UserId == id )
        {
            AddInclude ( x => x.User );
            AddInclude ( x => x.Point );
        }
    }
}