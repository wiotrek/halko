using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class DeviceService : IDeviceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeviceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<int> CreateDevice( Device device )
        {
            var isStateExist = await _unitOfWork.Repository<DeviceState>().GetByIdAsync ( device.DeviceStateId );
            if( isStateExist == null ) return 0;
            
            var isPointExist = await _unitOfWork.Repository<Point>().GetByIdAsync ( device.PointId );
            if( isPointExist == null ) return 0;
            
            
            _unitOfWork.Repository<Device>().Add ( device );
            var result = await _unitOfWork.CompleteAsync();

            return result;
        }

        public async Task<IReadOnlyList<DeviceState>> ReadDeviceState()
        {
            return await _unitOfWork.Repository<DeviceState>().ListAllAsync();
        }
    }
}