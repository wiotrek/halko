using Core.Entities.Halko;

namespace Core.Specifications
{
    public class DeviceServiceSpecification : BaseSpecification<DeviceService>
    {
        public DeviceServiceSpecification()
        {
            AddInclude ( x => x.Participant.Point );
        }

        public DeviceServiceSpecification( int id )
            : base ( x => x.Id == id )
        {
            AddInclude ( x => x.Participant.Point );
        }

        public DeviceServiceSpecification( string name )
            : base ( x => x.Name == name )
        {
            AddInclude ( x => x.Participant.Point );
        }
    }
}