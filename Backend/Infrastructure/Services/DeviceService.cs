using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Interfaces;
using Core.Specifications;

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

        public async Task<IEnumerable<Device>> GetDevicesToSell( string point )
        {
            var deviceList = await GetDevicesByPoint ( point );
            var deviceListToSell = deviceList.Where ( x => x.DateSold == null );
            
            return deviceListToSell;
        }
        
        public async Task<IEnumerable<Device>> GetSoldDevices( string point )
        {
            var deviceList = await GetDevicesByPoint ( point );
            var deviceListToSell = deviceList.Where ( x => x.DateSold != null );
            
            return deviceListToSell;
        }

        public async Task<Device> GetDeviceToSellById( int deviceId )
        {
            var device = await GetDeviceByid ( deviceId );
            return device is {DateSold: { }} ? null : device;
        }

        public async Task<int> SellDevice( int deviceId, double price )
        {
            var device = await GetDeviceByIdAsync ( deviceId );
            if( device is not {DateSold: null} ) return 0;


            device.Price = price;
            device.DateSold = DateTime.Now;
            
            
            _unitOfWork.Repository<Device>().Update ( device );
            var result = await _unitOfWork.CompleteAsync();
            
            
            return result;
        }

        public async Task<int> MoveDevice( int deviceId, string point )
        {
            var device = await GetDeviceByIdAsync ( deviceId );
            var pointEntity = await GetPointByNameAsync ( point );
            if( device is not {DateSold: null} || pointEntity == null ) return 0;


            device.PointId = pointEntity.Id;
            
            
            _unitOfWork.Repository<Device>().Update ( device );
            var result = await _unitOfWork.CompleteAsync();
            
            
            return result;
        }

        public async Task<IReadOnlyList<DeviceState>> ReadDeviceState()
        {
            return await _unitOfWork.Repository<DeviceState>().ListAllAsync();
        }

        #region Private Methods

        private async Task<Device> GetDeviceByIdAsync( int deviceId )
        {
            var deviceSpec = new DeviceSpecification ( deviceId );
            var device = await _unitOfWork.Repository<Device>().GetEntityWithSpecAsync ( deviceSpec );
            
            return device;
        }

        private async Task<Point> GetPointByNameAsync( string point )
        {
            var pointSpec = new PointSpecification ( point );
            var pointEntity = await _unitOfWork.Repository<Point>().GetEntityWithSpecAsync ( pointSpec );
            
            return pointEntity;
        }

        private async Task<IEnumerable<Device>> GetDevicesByPoint( string point )
        {
            var pointEntity = await GetPointByNameAsync ( point );
            if( pointEntity == null ) return null;
            
            var deviceSpec = new DeviceSpecification ( point );
            var deviceList = await _unitOfWork.Repository<Device>().ListAsync ( deviceSpec );

            return deviceList;
        }
        
        private async Task<Device> GetDeviceByid( int deviceId )
        {
            var deviceSpec = new DeviceSpecification ( deviceId );
            var device = await _unitOfWork.Repository<Device>().GetEntityWithSpecAsync ( deviceSpec );

            return device;
        }

        #endregion
    }
}