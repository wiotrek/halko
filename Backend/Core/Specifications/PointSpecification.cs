using Core.Entities.Auth;

namespace Core.Specifications
{
    public class PointSpecification : BaseSpecification<Point>
    {
        public PointSpecification( int pointId )
            : base ( x => x.Id == pointId )
        {
        }
    }
}