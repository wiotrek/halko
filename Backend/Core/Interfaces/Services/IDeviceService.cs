using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Enums;

namespace Core.Interfaces
{
    public interface IDeviceService
    {
        Task<EServiceResponse> CreateDevice( Device device );
        
        /// <summary>
        /// Get device list to sell
        /// </summary>
        /// <param name="point">The point name as optional parameter</param>
        /// <returns>If point isn't null then get device list for selected point, otherwise get device list from all points</returns>
        Task<IEnumerable<Device>> GetDevicesToSell( string point );
        Task<IEnumerable<Device>> GetSoldDevices( string point );
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