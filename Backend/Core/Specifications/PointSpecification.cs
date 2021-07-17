using Core.Entities.Halko;

namespace Core.Specifications
{
    public class PointSpecification : BaseSpecification<Point>
    {
        public PointSpecification( string name ) 
            : base( x => x.Name == name )
        {
            
        }
    }
}