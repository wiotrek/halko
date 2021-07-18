using Core.Entities.Halko;

namespace Core.Specifications
{
    public class ParticipantSpecification : BaseSpecification<ParticipantPoint>
    {
        public ParticipantSpecification(string pointName) 
            : base(x => x.Point.Name == pointName)
        {
            AddInclude ( x => x.Point );
        }
        
        public ParticipantSpecification( string initial, int pointId ) 
            : base( x => x.Initial == initial &&  
                         x.PointId == pointId)
        {
            AddInclude ( x => x.Point );
        }
        
    }
}