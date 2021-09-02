using Core.Entities.Halko;

namespace Core.Specifications
{
    public class ParticipantSpecification : BaseSpecification<ParticipantPoint>
    {
        public ParticipantSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude ( x => x.Point );
        }
        
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
        
        public ParticipantSpecification( string initial, string pointName ) 
            : base( x => x.Initial == initial &&  
                         x.Point.Name == pointName)
        {
            AddInclude ( x => x.Point );
        }
        
    }
}