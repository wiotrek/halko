using Core.Entities.Halko;

namespace Core.Specifications
{
    public class DeviceSpecification : BaseSpecification<Device>
    {
        public DeviceSpecification()
        {
            AddInclude ( x => x.DeviceState );
            AddInclude ( x => x.Point );
        }
        
        public DeviceSpecification( int id )
            : base ( x => x.Id == id )
        {
            AddInclude ( x => x.DeviceState );
            AddInclude ( x => x.Point );
        }
        
        public DeviceSpecification( string point )
            : base ( x => x.Point.Name == point )
        {
            AddInclude ( x => x.DeviceState );
            AddInclude ( x => x.Point );
        }
    }
}