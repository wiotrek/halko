using Core.Entities.Halko;

namespace Core.Specifications
{
    public class SettlementSpecification : BaseSpecification<Settlement>
    {
        public SettlementSpecification( int month, string pointName ) :
            base ( x => x.DateTime.Month == month && x.Point.Name == pointName )
        {

        }
    }
}