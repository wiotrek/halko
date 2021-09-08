using Core.Entities.Halko;

namespace Core.Specifications
{
    public class DeviceCountSpecification : BaseSpecification<Device>
    {
        public DeviceCountSpecification( DeviceSpecParams deviceParams, bool isSold = false )
            : base ( x =>
                ( string.IsNullOrEmpty ( deviceParams.Point ) || x.Point.Name == deviceParams.Point ) &&
                ( string.IsNullOrEmpty ( deviceParams.DeviceState ) || x.DeviceState.State == deviceParams.DeviceState ) &&
                ( isSold ? x.DateSold != null : x.DateSold == null ) &&
                ( string.IsNullOrEmpty ( deviceParams.Search ) ||
                                                                          x.Producer.Contains ( deviceParams.Search ) ||
                                                                          x.Model.Contains ( deviceParams.Search ) ||
                                                                          x.Imei == deviceParams.Search ||
                                                                          x.Color == deviceParams.Search ||
                                                                          x.Comment == deviceParams.Search )
            )
        {

        }
    }
}