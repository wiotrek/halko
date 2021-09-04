using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Enums;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class DeviceService : IDeviceService
    {
        #region Private Members
        
        private readonly IUnitOfWork _unitOfWork;
        
        #endregion
        
        #region Constructors

        public DeviceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        #endregion
        
        #region Implemented Methods
        
        #region Device
        
        public async Task<EServiceResponse> CreateDevice( Device device )
        {
            var stateSpec = new DeviceStateSpecification ( device.DeviceState.State );
            var pointSpec = new PointSpecification ( device.Point.Name );
            var deviceState = await _unitOfWork.Repository<DeviceState>().GetEntityWithSpecAsync (  stateSpec );
            var point = await _unitOfWork.Repository<Point>().GetEntityWithSpecAsync ( pointSpec );
            
            #region Errors
            
            if( deviceState == null ) return EServiceResponse.StateNotExist;
            if( point == null ) return EServiceResponse.PointNotExist;
            
            #endregion

            device.DeviceState = null;
            device.Point = null;
            device.DeviceStateId = deviceState.Id;
            device.PointId = point.Id;
            _unitOfWork.Repository<Device>().Add ( device );
            var result = await _unitOfWork.CompleteAsync();
            
            
            return result <= 0 ? 
                EServiceResponse.DeviceCreateFailed : 
                (EServiceResponse) device.Id;
        }
        
        public async Task<IEnumerable<Device>> GetDevicesToSell( DeviceSpecParams deviceParams )
        {
            var deviceSpecParams = new DeviceSpecification ( deviceParams );
            var deviceListToSell = await _unitOfWork.Repository<Device>().ListAsync ( deviceSpecParams );

            return deviceListToSell;
        }
        
        
        public async Task<IEnumerable<Device>> GetSoldDevices( DeviceSpecParams deviceParams )
        {
            var deviceSpecParams = new DeviceSpecification ( deviceParams, true );
            var deviceListToSell = await _unitOfWork.Repository<Device>().ListAsync ( deviceSpecParams );

            return deviceListToSell;
        }

        
        public async Task<Device> GetDeviceToSellById( int deviceId )
        {
            var device = await GetDeviceByid ( deviceId );
            return device is {DateSold: { }} ? null : device;
        }
        
        
        public async Task<Device> GetSoldDeviceById( int deviceId )
        {
            var device = await GetDeviceByid ( deviceId );
            return device is not {DateSold: { }} ? null : device;
        }

        
        public async Task<EServiceResponse> SellDevice( int deviceId, double price )
        {
            var device = await GetDeviceByIdAsync ( deviceId );
            
            #region Errors
            
            if( device == null ) return EServiceResponse.DeviceNotExist;
            if( device.DateSold != null ) return EServiceResponse.DeviceWasSold;
            
            #endregion


            device.Price = price;
            device.DateSold = DateTime.Now;
            
            
            _unitOfWork.Repository<Device>().Update ( device );
            var result = await _unitOfWork.CompleteAsync();
            
            
            return result <= 0 ?
                EServiceResponse.DeviceNotSold : 
                EServiceResponse.DeviceSold;
        }

        
        public async Task<EServiceResponse> MoveDevice( int deviceId, string point )
        {
            var device = await GetDeviceByIdAsync ( deviceId );
            var pointEntity = await GetPointByNameAsync ( point );
            
            #region Errors
            
            if( device == null ) return EServiceResponse.DeviceNotExist;
            if( pointEntity == null ) return EServiceResponse.PointNotExist;
            if( device.DateSold != null ) return EServiceResponse.DeviceWasSold;
            if( device.PointId == pointEntity.Id ) return EServiceResponse.DeviceIsInThisPoint;
            
            #endregion

            device.PointId = pointEntity.Id;
            
            
            _unitOfWork.Repository<Device>().Update ( device );
            var result = await _unitOfWork.CompleteAsync();
            
            
            return result <= 0 ? 
                EServiceResponse.DeviceMoveFailed : 
                EServiceResponse.DeviceMoveSuccess;
        }

        public async Task<EServiceResponse> EditDevice( Device device )
        {
            var stateSpec = new DeviceStateSpecification ( device.DeviceState.State );
            var deviceState = await _unitOfWork.Repository<DeviceState>().GetEntityWithSpecAsync (  stateSpec );
            var deviceFromDb = await _unitOfWork.Repository<Device>().GetByIdAsync ( device.Id );

            
            if( deviceState == null ) return EServiceResponse.StateNotExist;
            if( deviceFromDb == null ) return EServiceResponse.DeviceNotExist;


            device.DeviceStateId = deviceState.Id;
            device.PointId = deviceFromDb.PointId;
            device.DateBuyed = deviceFromDb.DateBuyed;
            device.Imei = deviceFromDb.Imei;
            
            
            _unitOfWork.Repository<Device>().DetachLocal ( device, device.Id );
            _unitOfWork.Repository<Device>().Update ( device );
            var result = await _unitOfWork.CompleteAsync();
            
            
            if( result <= 0 )
                return EServiceResponse.DeviceEditFailed;

            return (EServiceResponse) deviceFromDb.Id;
        }
        
        public async Task<IReadOnlyList<DeviceState>> ReadDeviceState()
        {
            return await _unitOfWork.Repository<DeviceState>().ListAllAsync();
        }

        #endregion
        
        #region Device Service

        public async Task<EServiceResponse> CreateServiceDevice( Core.Entities.Halko.DeviceService deviceService )
        {
            var participantSpec = new ParticipantSpecification ( deviceService.Participant.Initial, deviceService.Participant.Point.Name );
            var participant = await _unitOfWork.Repository<ParticipantPoint>().GetEntityWithSpecAsync ( participantSpec );

            if( participant == null ) return EServiceResponse.ParticipantOrStateNotExist;

            deviceService.Participant = null;
            deviceService.Point = null;
            deviceService.ParticipantId = participant.Id;
            deviceService.PointId = participant.Point.Id;
            deviceService.PointSubmitDate = DateTime.Now;

            _unitOfWork.Repository<Core.Entities.Halko.DeviceService>().Add ( deviceService );
            var result = await _unitOfWork.CompleteAsync();

            return result <= 0 ? 
                EServiceResponse.DeviceServiceCreateFailed : 
                (EServiceResponse) deviceService.Id;
        }

        public async Task<IReadOnlyList<Core.Entities.Halko.DeviceService>> GetServiceDeviceList(EServiceDeviceStatus status)
        {
            var deviceServiceSpec = new DeviceServiceSpecification();
            var deviceServiceList = await _unitOfWork.Repository<Core.Entities.Halko.DeviceService>()
                .ListAsync ( deviceServiceSpec );

            switch ( status )
            {
                case EServiceDeviceStatus.OnService:
                    deviceServiceList = deviceServiceList.Where ( x => x.GiveBackDate == null ).ToList();
                    break;
                case EServiceDeviceStatus.ReturnedToClient:
                    deviceServiceList = deviceServiceList.Where ( x => x.GiveBackDate != null ).ToList();
                    break;
                default:
                    return deviceServiceList;
            }

            return deviceServiceList;
        }

        public async Task<EServiceResponse> UpdateDeviceService( string giveBackInfo, int id )
        {
            var deviceServiceSpec = new DeviceServiceSpecification ( id );
            var deviceService = await _unitOfWork.Repository<Core.Entities.Halko.DeviceService>()
                .GetEntityWithSpecAsync ( deviceServiceSpec );

            
            if( deviceService == null ) return EServiceResponse.DeviceServiceNotExist;
            deviceService.GiveBackDate = DateTime.Now;
            deviceService.GiveBackInfo = giveBackInfo;

            
            _unitOfWork.Repository<Core.Entities.Halko.DeviceService>().Update ( deviceService );
            var result  = await _unitOfWork.CompleteAsync();


            return result <= 0
                ? EServiceResponse.DeviceServiceUpdateFailed
                : (EServiceResponse) deviceService.Id;
        }

        public async Task<IReadOnlyList<Core.Entities.Halko.DeviceService>> GetDeviceServicesByName( string phoneName )
        {
            var deviceServiceSpec = new DeviceServiceSpecification ( phoneName );

            return await _unitOfWork
                .Repository<Core.Entities.Halko.DeviceService>()
                .ListAsync ( deviceServiceSpec );;
        }

        public async Task<Core.Entities.Halko.DeviceService> GetDeviceBeingServiceById( int deviceServiceId )
        {
            var deviceServiceSpec = new DeviceServiceSpecification ( deviceServiceId );
            var deviceService = await _unitOfWork.Repository<Core.Entities.Halko.DeviceService>()
                .GetEntityWithSpecAsync ( deviceServiceSpec );

            return deviceService;
        }
        
        #endregion
        
        #region Device Price List

        public async Task<DevicePrice> CreateDevicePrice( DevicePrice devicePrice )
        {
            var devicePriceSpec = new DevicePriceSpecification ( devicePrice.Producer, devicePrice.Model );
            var devicePriceFromDb = await _unitOfWork.Repository<DevicePrice>()
                .GetEntityWithSpecAsync ( devicePriceSpec );

            if( devicePriceFromDb != null )
                return null;
            
            _unitOfWork.Repository<DevicePrice>().Add ( devicePrice );
            await _unitOfWork.CompleteAsync();
            
            return devicePrice;
        }

        public async Task<IReadOnlyList<DevicePrice>> GetDevicePriceList()
        {
            return await _unitOfWork.Repository<DevicePrice>().ListAllAsync();
        }

        public async Task<DevicePrice> GetDevicePriceListByName( string producer, string model )
        {
            var devicePriceSpec = new DevicePriceSpecification ( producer, model );
            var devicePrice = await _unitOfWork.Repository<DevicePrice>().GetEntityWithSpecAsync ( devicePriceSpec );

            return devicePrice;
        }

        #endregion
        
        #endregion

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

        private async Task<IEnumerable<Device>> GetDevicesByPointAsync( string point )
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