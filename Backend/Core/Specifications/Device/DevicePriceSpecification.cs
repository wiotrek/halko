using Core.Entities.Halko;

namespace Core.Specifications
{
    public class DevicePriceSpecification : BaseSpecification<DevicePrice>
    {
        public DevicePriceSpecification( string producer, string model )
            : base ( x => x.Producer == producer && x.Model == model )
        {

        }
    }
}