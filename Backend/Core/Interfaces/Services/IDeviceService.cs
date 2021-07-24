using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface IDeviceService
    {
        Task<int> CreateDevice( Device device );
        Task<int> SellDevice( int deviceId, double price );
        Task<IReadOnlyList<DeviceState>> ReadDeviceState();
    }
}