using Core.Entities.Halko;
using Core.Enums;

namespace Core.Specifications
{
    public class DeviceServiceSpecification : BaseSpecification<DeviceService>
    {
        public DeviceServiceSpecification( DeviceSpecParams deviceParams, EServiceDeviceStatus status )
            : base ( x =>
                ( string.IsNullOrEmpty ( deviceParams.Point ) || x.Point.Name == deviceParams.Point ) &&
                ( string.IsNullOrEmpty ( deviceParams.Search ) || x.Name == deviceParams.Search ) &&
                ( status == EServiceDeviceStatus.OnService ? x.GiveBackDate == null : x.GiveBackDate != null ) )
        {
            AddInclude ( x => x.Participant.Point );
            ApplyPaging ( deviceParams.PageSize * ( deviceParams.PageIndex - 1 ), deviceParams.PageSize );
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