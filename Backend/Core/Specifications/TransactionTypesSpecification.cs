using Core.Entities.Halko;

namespace Core.Specifications
{
    public class TransactionTypesSpecification : BaseSpecification<TransactionType>
    {
        public TransactionTypesSpecification( string type ) 
            : base( x => x.Type == type )
        {
            
        }
    }
}