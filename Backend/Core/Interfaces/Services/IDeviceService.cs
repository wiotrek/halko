using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Enums;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IDeviceService
    {
        Task<EServiceResponse> CreateDevice( Device device );

        Task<EServiceResponse> CreateServiceDevice( DeviceService deviceService );

        /// <summary>
        /// Get device list with service history.
        /// </summary>
        /// <param name="status">Device servise status</param>
        /// <returns>List of device being service if status is 'OnService' or list of device returned to client for status 'ReturnedToClient'</returns>
        Task<IReadOnlyList<DeviceService>> GetServiceDeviceList( EServiceDeviceStatus status );

        Task<DeviceService> GetDeviceBeingServiceById( int deviceServiceId );
        
        /// <summary>
        /// Get device list to sell
        /// </summary>
        /// <param name="deviceParams">The params contain filter properties to find devices by them</param>
        /// <returns>If each item of params is null return all devices, otherwise get devices finding by specific no empty and correct params</returns>
        Task<IEnumerable<Device>> GetDevicesToSell( DeviceSpecParams deviceParams );
        
        /// <summary>
        /// Get sold list of devices
        /// </summary>
        /// <param name="deviceParams">The params contain filter properties to find devices by them</param>
        /// <returns>If each item of params is null return all devices being sold, otherwise get sold devices finding by specific no empty and correct params</returns>
        Task<IEnumerable<Device>> GetSoldDevices( DeviceSpecParams deviceParams );
        Task<Device> GetDeviceToSellById( int deviceId );
        Task<Device> GetSoldDeviceById( int deviceId );
        
        /// <summary>
        /// Create sold date for device which is selling
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="price">The device sold price</param>
        /// <returns></returns>
        Task<EServiceResponse> SellDevice( int deviceId, double price );
        
        /// <summary>
        /// Change device point location
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="point">The point name</param>
        /// <returns></returns>
        Task<EServiceResponse> MoveDevice( int deviceId, string point );

        /// <summary>
        /// Edit <see cref="Device"/> with property from DeviceBaseDto include <see cref="DeviceState"/>
        /// NOTE: Imei can't be changed 
        /// </summary>
        /// <param name="device">Device Entity</param>
        /// <returns>Response result</returns>
        Task<EServiceResponse> EditDevice( Device device );

        Task<IReadOnlyList<DeviceState>> ReadDeviceState();
    }
}