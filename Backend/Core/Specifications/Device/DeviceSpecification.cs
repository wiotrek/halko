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

        public DeviceSpecification( DeviceSpecParams deviceParams, bool isSold = false )
            : base ( x =>
                ( string.IsNullOrEmpty ( deviceParams.Point ) || x.Point.Name == deviceParams.Point ) &&
                ( string.IsNullOrEmpty ( deviceParams.DeviceState ) || x.DeviceState.State == deviceParams.DeviceState ) && 
                ( isSold ? x.DateSold != null : x.DateSold == null ) &&
                ( string.IsNullOrEmpty ( deviceParams.Search ) ||
                                                                         x.Producer.Contains ( deviceParams.Search ) ||
                                                                         x.Model.Contains ( deviceParams.Search ) ||
                                                                         x.Imei == deviceParams.Search ||
                                                                         x.Color == deviceParams.Search ||
                                                                         x.Comment == deviceParams.Search
                  )
            )
        {
            AddInclude ( x => x.DeviceState );
            AddInclude ( x => x.Point );
            ApplyPaging ( deviceParams.PageSize * ( deviceParams.PageIndex - 1 ), deviceParams.PageSize );
        }
    }
}