using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface IDeviceService
    {
        Task<int> CreateDevice( Device device );
        
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
        Task<int> SellDevice( int deviceId, double price );
        
        /// <summary>
        /// Change device point location
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="point">The point name</param>
        /// <returns></returns>
        Task<int> MoveDevice( int deviceId, string point );

        Task<IReadOnlyList<DeviceState>> ReadDeviceState();
    }
}