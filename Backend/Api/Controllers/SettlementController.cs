using System.Threading.Tasks;
using Api.Dtos;
using Api.Errors;
using AutoMapper;
using Core.Entities.Halko;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class SettlementController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly ISettlementService _settlementService;

        public SettlementController( 
            UserManager<AppUser> userManager,
            IMapper mapper,
            ISettlementService settlementService
            ) : base( userManager )
        {
            _mapper = mapper;
            _settlementService = settlementService;
        }

        [HttpPost]
        public async Task<ActionResult> StoreDaySettlement(SettlementDto settlementDto)
        {
            var settlement = _mapper.Map<Settlement> ( settlementDto );
            var result = await _settlementService.CreateSettlement ( settlement );

            return result < 0 
                ? BadRequest ( new ApiResponse ( 400, "Nie zamknięto dnia" ) ) 
                : Ok();
        }
    }
}