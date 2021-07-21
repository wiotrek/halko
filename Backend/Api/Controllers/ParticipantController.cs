using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Extensions;
using AutoMapper;
using Core.Entities.Halko;
using Core.Entities.Identity;
using Core.Enums;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

namespace Api.Controllers
{
    [Authorize]
    public class ParticipantController : BaseApiController
    {
        #region Private Members
        
        private readonly IParticipantService _participantService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        #endregion

        #region Constructor
        
        public ParticipantController(
            IParticipantService participantService,
            UserManager<AppUser> userManager,
            IMapper mapper)
        {
            _participantService = participantService;
            _userManager = userManager;
            _mapper = mapper;
        }
        
        #endregion
        
        [HttpPost]
        public async Task<ActionResult> SaveParticipant(ParticipantCreateDto participantCreateDto)
        {
            #region Validate
            
            var userRole = await _userManager.FindByNameByClaimsPrincipleUserRoleAsync ( User );

            if( userRole != EUserRole.Admin.GetDisplayName() )
                return Unauthorized();

            if( string.IsNullOrWhiteSpace ( participantCreateDto.Initial ) ||
                string.IsNullOrWhiteSpace ( participantCreateDto.PointName ) )
                return BadRequest();
            
            #endregion

            var participant = _mapper.Map<ParticipantPoint> ( participantCreateDto );

            var result = await _participantService.CreateParticipant ( participant, participantCreateDto.PointName );

            return result > 0 ? Ok() : BadRequest();
        }
        
        [HttpGet]
        public async Task<ActionResult<List<ParticipantDto>>> GetParticipantsAsync([FromQuery] string pointName)
        {
            if (string.IsNullOrEmpty(pointName)) return BadRequest();

            var participants = await _participantService.GetParticipants ( pointName );
            var participantsToReturn = _mapper.Map<IReadOnlyList<ParticipantDto>> ( participants );
            
            return Ok ( participantsToReturn );
        }

        [HttpPut]
        public async Task<ActionResult<ParticipantDto>> UpdateParticipantAsync
            ( ParticipantDto participant, [FromQuery] string pointName ) 
        {
            #region Validate
            
            var userRole = await _userManager.FindByNameByClaimsPrincipleUserRoleAsync ( User );

            if( userRole != EUserRole.Admin.GetDisplayName() )
                return Unauthorized();

            if (string.IsNullOrEmpty(pointName)) return BadRequest();

            #endregion

            var participantEntity = _mapper.Map<ParticipantPoint> ( participant );
            var participantUpdated = await _participantService.UpdateParticipant ( participantEntity, pointName );
            var participantDto = _mapper.Map<ParticipantDto> ( participantUpdated );

            
            return participantUpdated == null ? BadRequest() : Ok(participantDto);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteParticipantAsync( [FromQuery] int id )
        {
            #region Validate
            
            var userRole = await _userManager.FindByNameByClaimsPrincipleUserRoleAsync ( User );

            if( userRole != EUserRole.Admin.GetDisplayName() )
                return Unauthorized();

            #endregion

            var result = await _participantService.DeleteParticipant ( id );

            return result <= 0 ? BadRequest() : Ok();
        }
        
    }
}