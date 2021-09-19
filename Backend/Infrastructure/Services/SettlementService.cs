using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class SettlementService : ISettlementService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SettlementService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<int> CreateSettlement( Settlement settlement )
        {
            if( settlement.DayBilansInCash + settlement.MonthBilansInCart > settlement.DayBilans )
                settlement.DayBilansInCart = await GetMonthSumCartPayment ( settlement.Point.Name ) -
                                             settlement.DayBilans - settlement.DayBilansInCash;
            else
                settlement.DayBilansInCart = settlement.DayBilans - settlement.DayBilansInCash;

            settlement.Point = null;
            
            _unitOfWork.Repository<Settlement>().Add ( settlement );
            return await _unitOfWork.CompleteAsync();
        }

        
        private async Task<double> GetMonthSumCartPayment(string pointName, int month = 0)
        {
            if( month == 0 ) month = DateTime.Now.Month;
            
            var settlementSpec = new SettlementSpecification ( month, pointName );
            var settlements = await  _unitOfWork.Repository<Settlement>().ListAsync ( settlementSpec );

            return settlements?.Sum ( x => x.DayBilansInCart ) ?? 0;
        }
    }
}