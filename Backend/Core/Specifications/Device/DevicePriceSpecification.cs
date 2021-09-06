using Core.Entities.Halko;
using Core.Extensions;

namespace Core.Specifications
{
    public class DevicePriceSpecification : BaseSpecification<DevicePrice>
    {
        public DevicePriceSpecification()
        {
            
        }
        
        public DevicePriceSpecification( DeviceSpecParams deviceParams )
        {
            ApplyPaging ( deviceParams.PageSize * ( deviceParams.PageIndex - 1 ), deviceParams.PageSize );
        }

        public DevicePriceSpecification( string producer, string model )
            : base ( x => x.Producer == producer.FirstLetterToUpper() && x.Model == model.FirstLetterToUpper() )
        {

        }
    }
}