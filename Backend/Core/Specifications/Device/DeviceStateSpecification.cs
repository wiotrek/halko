using Core.Entities.Halko;

namespace Core.Specifications
{
    public class DeviceStateSpecification : BaseSpecification<DeviceState>
    {
        public DeviceStateSpecification( string state )
            : base ( x => x.State == state )
        {

        }
    }
}