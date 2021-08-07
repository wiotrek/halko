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

        public DeviceSpecification( DeviceSpecParams deviceParams )
            : base ( x =>
                ( string.IsNullOrEmpty ( deviceParams.Point ) || x.Point.Name == deviceParams.Point ) &&
                ( string.IsNullOrEmpty ( deviceParams.DeviceState ) || x.DeviceState.State == deviceParams.DeviceState ) && 
                ( string.IsNullOrEmpty ( deviceParams.Search ) ||
                                                                         x.Producer == deviceParams.Search ||
                                                                         x.Model == deviceParams.Search ||
                                                                         x.Imei == deviceParams.Search ||
                                                                         x.Color == deviceParams.Search ||
                                                                         x.Comment == deviceParams.Search
                  )
            )
        {
            AddInclude ( x => x.DeviceState );
            AddInclude ( x => x.Point );
        }
    }
}