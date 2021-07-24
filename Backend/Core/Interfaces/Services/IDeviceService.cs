using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface IDeviceService
    {
        Task<int> CreateDevice( Device device );
        Task<IReadOnlyList<DeviceState>> ReadDeviceState();
    }
}