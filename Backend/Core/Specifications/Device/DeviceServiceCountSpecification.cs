using Core.Entities.Halko;
using Core.Enums;

namespace Core.Specifications
{
    public class DeviceServiceCountSpecification : BaseSpecification<DeviceService>
    {
        public DeviceServiceCountSpecification( DeviceSpecParams deviceParams, EServiceDeviceStatus status )
            : base ( x =>
                ( string.IsNullOrEmpty ( deviceParams.Point ) || x.Point.Name == deviceParams.Point ) &&
                ( string.IsNullOrEmpty ( deviceParams.Search ) || x.Name == deviceParams.Search ) &&
                ( status == EServiceDeviceStatus.OnService ? x.GiveBackDate == null : x.GiveBackDate != null ) )
        {

        }
    }
}