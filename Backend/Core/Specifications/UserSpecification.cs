using Core.Entities.Auth;

namespace Core.Specifications
{
    public class UserSpecification : BaseSpecification<User>
    {
        
        public UserSpecification( string login ) : 
            base( x => x.Login == login ) { }
        
    }
}