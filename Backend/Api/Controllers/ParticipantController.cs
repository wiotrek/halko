using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Extensions;
using AutoMapper;
using Core.Entities.Halko;
using Core.Entities.Identity;
using Core.Enums;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;
using Point = Core.Entities.Halko.Point;

namespace Api.Controllers
{
    [Authorize]
    public class ParticipantController : BaseApiController
    {
        #region Private Members
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        #endregion

        #region Constructor
        
        public ParticipantController(
            IUnitOfWork unitOfWork,
            UserManager<AppUser> userManager,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
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

            var pointSpec = new PointSpecification ( participantCreateDto.PointName );
            var point = await _unitOfWork.Repository<Point>().GetEntityWithSpecAsync ( pointSpec );
            if( point == null ) return BadRequest();

            
            var participantSpec = new ParticipantSpecification ( participantCreateDto.Initial, point.Id );
            var participant = await _unitOfWork.Repository<ParticipantPoint>().GetEntityWithSpecAsync ( participantSpec );
            if (participant != null) return BadRequest();
            

            var participantToCreate = new ParticipantPoint
            {
                FirstName = participantCreateDto.FirstName,
                LastName = participantCreateDto.LastName,
                Initial = participantCreateDto.Initial,
                PointId = point.Id,
            };


            _unitOfWork.Repository<ParticipantPoint>().Add ( participantToCreate );
            var result = await _unitOfWork.CompleteAsync();


            return result > 0 ? Ok() : BadRequest();
        }
        
        [HttpGet]
        public async Task<ActionResult<List<ParticipantsToReturnDto>>> GetParticipantsAsync(ParticipantCreateDto participantCreateDto)
        {
            if (participantCreateDto.PointName == null) return BadRequest();
            
            var pointName = participantCreateDto.PointName;
            var participantSpec = new ParticipantSpecification ( pointName );
            var participants = await _unitOfWork
                .Repository<ParticipantPoint>()
                .ListAsync ( participantSpec );

            var participantsToReturn = _mapper.Map<IReadOnlyList<ParticipantsToReturnDto>> ( participants );

            return Ok ( participantsToReturn );
        }
        
    }
}