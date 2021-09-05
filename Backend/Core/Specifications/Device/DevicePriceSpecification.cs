using Core.Entities.Halko;
using Core.Extensions;

namespace Core.Specifications
{
    public class DevicePriceSpecification : BaseSpecification<DevicePrice>
    {
        public DevicePriceSpecification( string producer, string model )
            : base ( x => x.Producer == producer.FirstLetterToUpper() && x.Model == model.FirstLetterToUpper() )
        {

        }
    }
}