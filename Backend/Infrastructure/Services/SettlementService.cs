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
                settlement.DayBilansInCart = settlement.MonthBilansInCart - await GetMonthSumCartPayment ( settlement.Point.Name );
            else
                settlement.DayBilansInCart = settlement.DayBilans - settlement.DayBilansInCash;

            var pointSpec = new PointSpecification ( settlement.Point.Name );
            var point = await _unitOfWork.Repository<Point>().GetEntityWithSpecAsync ( pointSpec );
            if( point == null ) return -1;

            settlement.Point = null;
            settlement.PointId = point.Id;
            _unitOfWork.Repository<Settlement>().Add ( settlement );
            return await _unitOfWork.CompleteAsync();
        }

        
        public async Task<double> GetAmountCashByPoint( string pointName )
        {
            var settlementSpec = new SettlementSpecification ( pointName );
            var settlements = await  _unitOfWork.Repository<Settlement>().ListAsync ( settlementSpec );

            return settlements.Count == 0 ? 0 : settlements.OrderByDescending ( x => x.DateTime ).First().DayBilansInCash;
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