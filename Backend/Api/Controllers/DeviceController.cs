﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Errors;
using Api.Helpers;
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

        #region Device
        
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
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeviceDisplayItemDto>>> GetDevices( 
            [FromQuery] DeviceSpecParams deviceParams )
        {
            var result =  await _deviceService.GetDevicesToSell ( deviceParams );
            var deviceListToReturn = _mapper.Map<IReadOnlyList<DeviceDisplayItemDto>> ( result.Data );

            return Ok ( new Pagination<DeviceDisplayItemDto>( result.PageIndex, result.PageSize, result.Count, deviceListToReturn ) );
        }
        
        
        [HttpGet("sold")]
        public async Task<ActionResult<Pagination<DeviceDisplayItemDto>>> GetSoldDevices( 
            [FromQuery] DeviceSpecParams deviceParams )
        {
            var result =  await _deviceService.GetSoldDevices ( deviceParams );
            var deviceListToReturn = _mapper.Map<IReadOnlyList<DeviceDisplayItemDto>> ( result.Data );

            return Ok ( new Pagination<DeviceDisplayItemDto>( result.PageIndex, result.PageSize, result.Count, deviceListToReturn ) );
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
        
        #endregion
        
        #region Device Service

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
        public async Task<ActionResult<Pagination<DeviceServiceItemDto>>> GetServiceDevices( [FromQuery] DeviceSpecParams deviceParams )
        {
            var result = await _deviceService.GetServiceDeviceList ( deviceParams, EServiceDeviceStatus.OnService );

            var deviceServiceDto = _mapper.Map<IReadOnlyList<DeviceServiceItemDto>> ( result.Data );

            return Ok ( new Pagination<DeviceServiceItemDto> ( result.PageIndex, result.PageSize, result.Count,
                deviceServiceDto ) );
        }

        [HttpGet ( "service/returned" )]
        public async Task<ActionResult<Pagination<DeviceServiceItemDto>>> GetServiceDevicesReturned([FromQuery] DeviceSpecParams deviceParams)
        {
            var result = await _deviceService.GetServiceDeviceList ( deviceParams, EServiceDeviceStatus.ReturnedToClient );

            var deviceServiceDto = _mapper.Map<IReadOnlyList<DeviceServiceItemDto>> ( result.Data );

            return Ok ( new Pagination<DeviceServiceItemDto> ( result.PageIndex, result.PageSize, result.Count,
                deviceServiceDto ) );
        }

        #endregion

        #region Device Price List

        [HttpPost("price-list")]
        public async Task<ActionResult<DevicePrice>> CreateDevicePrice(DevicePrice devicePrice)
        {
            if( !await IsAdmin() )
                return BadRequest ( new ApiResponse ( 401 ) );
            
            var result = await _deviceService.CreateDevicePrice ( devicePrice );

            if( result == null )
                return BadRequest ( new ApiResponse ( 400, "Dla tego urządzenia jest już zdefiniowany cennik" ) );

            return Ok ( result );
        }

        [HttpGet ( "price-list" )]
        public async Task<ActionResult<Pagination<DevicePrice>>> GetDevicePriceList( 
            [FromQuery] DeviceSpecParams deviceParams )
        {
            var result = await _deviceService.GetDevicePriceList ( deviceParams );

            return Ok ( new Pagination<DevicePrice> ( result.PageIndex, result.PageSize, result.Count, result.Data ) );
        }

        [HttpGet ( "price-list/get" )]
        public async Task<ActionResult<DevicePrice>> GetDevicePriceListByName(
            [FromQuery] string producer, string model )
        {
            if( string.IsNullOrEmpty ( producer ) || string.IsNullOrEmpty ( model ) )
                return BadRequest ( new ApiResponse ( 400, "Nie uzupełnione pole" ) );

            var result = await _deviceService.GetDevicePriceListByName ( producer, model );

            return Ok ( result );
        }
        
        #endregion
    }
}