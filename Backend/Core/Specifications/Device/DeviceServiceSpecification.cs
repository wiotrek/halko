using Core.Entities.Halko;

namespace Core.Specifications
{
    public class DeviceServiceSpecification : BaseSpecification<DeviceService>
    {
        public DeviceServiceSpecification( DeviceSpecParams deviceParams )
            : base ( x =>
                ( string.IsNullOrEmpty ( deviceParams.Point ) || x.Point.Name == deviceParams.Point ) &&
                ( string.IsNullOrEmpty ( deviceParams.Search ) || x.Name == deviceParams.Search ) )
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