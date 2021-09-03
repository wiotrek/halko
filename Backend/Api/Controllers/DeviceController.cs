using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Errors;
using AutoMapper;
using Core.Entities.Halko;
using Core.Entities.Identity;
using Core.Enums;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    public class DeviceController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IDeviceService _deviceService;

        public DeviceController(
            IMapper mapper,
            IDeviceService deviceService,
            UserManager<AppUser> userManager ) : base ( userManager )
        {
            _mapper = mapper;
            _deviceService = deviceService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateDevice( DeviceCreateDto deviceCreateDto )
        {
            var device = _mapper.Map<Device> ( deviceCreateDto );
            var result = await _deviceService.CreateDevice ( device );

            if( result <= 0 )
                return BadRequest ( new ApiResponse ( 400, result ) );

            
            var deviceCreated = await _deviceService.GetDeviceToSellById ( (int) result );
            var deviceDto = _mapper.Map<DeviceDisplayItemDto> ( deviceCreated );
            
            return Ok ( deviceDto );
        }

        [HttpPost ( "service" )]
        public async Task<ActionResult> CreateDeviceService(DeviceServiceCreateDto deviceServiceCreateDto)
        {
            var deviceService = _mapper.Map<DeviceService> ( deviceServiceCreateDto );
            var result = await _deviceService.CreateServiceDevice ( deviceService );

            if( result <= 0 )
                return BadRequest ( new ApiResponse ( 400, result ) );

            var deviceServiceCreated = await _deviceService.GetDeviceBeingServiceById ( (int) result );
            var deviceServiceDto = _mapper.Map<DeviceServiceCreateDto> ( deviceServiceCreated );

            return Ok ( deviceServiceDto );
        }

        [HttpPut("service")]
        public async Task<ActionResult> ReturnDeviceService( DeviceServiceItemDto deviceServiceItemDto, [FromQuery] int id )
        {
            var result = await _deviceService.UpdateDeviceService ( deviceServiceItemDto.GiveBackInfo, id );
            
            if( result <= 0 )
                return BadRequest ( new ApiResponse ( 400, result ) );

            var deviceServiceUpdated = await _deviceService.GetDeviceBeingServiceById ( (int) result );
            var deviceServiceDto = _mapper.Map<DeviceServiceItemDto> ( deviceServiceUpdated );

            return Ok ( deviceServiceDto );
        }

        [HttpGet ( "service/repairing" )]
        public async Task<ActionResult> GetServiceDevices()
        {
            var result = await _deviceService.GetServiceDeviceList ( EServiceDeviceStatus.OnService );

            var deviceServiceDto = _mapper.Map<IReadOnlyList<DeviceServiceItemDto>> ( result );

            return Ok ( deviceServiceDto );
        }
        
        [HttpGet ( "service/returned" )]
        public async Task<ActionResult> GetServiceDevicesReturned()
        {
            var result = await _deviceService.GetServiceDeviceList ( EServiceDeviceStatus.ReturnedToClient );

            var deviceServiceDto = _mapper.Map<IReadOnlyList<DeviceServiceItemDto>> ( result );

            return Ok ( deviceServiceDto );
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeviceDisplayItemDto>>> GetDevices( 
            [FromQuery] DeviceSpecParams deviceParams )
        {
            var deviceList =  await _deviceService.GetDevicesToSell ( deviceParams );
            var deviceListToReturn = _mapper.Map<IEnumerable<DeviceDisplayItemDto>> ( deviceList );

            return Ok ( deviceListToReturn );
        }
        
        
        [HttpGet("sold")]
        public async Task<ActionResult<IEnumerable<DeviceDisplayItemDto>>> GetSoldDevices( 
            [FromQuery] DeviceSpecParams deviceParams )
        {
            var deviceList =  await _deviceService.GetSoldDevices ( deviceParams );
            var deviceListToReturn = _mapper.Map<IEnumerable<DeviceDisplayItemDto>> ( deviceList );

            return Ok ( deviceListToReturn );
        }


        [HttpGet("details")]
        public async Task<ActionResult<DeviceDisplayItemDto>> GetDeviceById( [FromQuery] int id )
        {
            var device = await _deviceService.GetDeviceToSellById ( id );
            var deviceToReturn = _mapper.Map<DeviceDisplayItemDto> ( device );

            return Ok ( deviceToReturn );
        }
        
        [HttpGet("sold-details")]
        public async Task<ActionResult<DeviceDisplayItemDto>> GetSoldDeviceById( [FromQuery] int id )
        {
            var device = await _deviceService.GetSoldDeviceById ( id );
            var deviceToReturn = _mapper.Map<DeviceDisplayItemDto> ( device );

            return Ok ( deviceToReturn );
        }


        [HttpPut ( "sell" )]
        public async Task<ActionResult> SellDevice( [FromQuery] int id, double price )
        {
            var result = await _deviceService.SellDevice ( id, price );

            return result <= 0 ? 
                BadRequest( new ApiResponse ( 400, result ) ) : 
                Ok( new ApiResponse ( 200, result ) );
        }


        [HttpPut ( "move" )]
        public async Task<ActionResult> MoveDevice( [FromQuery] int id, string point )
        {
            var result = await _deviceService.MoveDevice ( id, point );

            return result <= 0 ? 
                BadRequest( new ApiResponse ( 400, result ) ) : 
                Ok( new ApiResponse ( 200, result ) );
        }

        [HttpPut]
        public async Task<ActionResult<DeviceDisplayItemDto>> EditDevice(DeviceCreateDto deviceCreateDto, [FromQuery] int id)
        {
            var deviceEntity = _mapper.Map<Device> ( deviceCreateDto );
            deviceEntity.Id = id;

            var deviceUpdatedId = await _deviceService.EditDevice ( deviceEntity );
            if( deviceUpdatedId <= 0 )
                return BadRequest ( new ApiResponse ( 400, deviceUpdatedId ) );

            var deviceUpdated = await _deviceService.GetDeviceToSellById ( (int) deviceUpdatedId );
            var deviceToReturn = _mapper.Map<DeviceDisplayItemDto> ( deviceUpdated );

            return Ok ( deviceToReturn );
        }

        [HttpGet ( "states" )]
        public async Task<ActionResult<IReadOnlyList<DeviceState>>> GetDeviceState()
        {
            return Ok ( await _deviceService.ReadDeviceState() );
        }
    }
}