using Core.Entities.Halko;

namespace Core.Specifications
{
    public class ProductCategoriesSpecification : BaseSpecification<ProductCategory>
    {
        public ProductCategoriesSpecification( string name, int transactionTypeId ) 
            : base( x => x.Category == name && 
                         x.TransactionTypeId == transactionTypeId)
        {
            AddInclude ( x => x.TransactionType );
        }
        
        public ProductCategoriesSpecification( string name, string transactionType ) 
            : base( x => x.Category == name && 
                         x.TransactionType.Type == transactionType)
        {
            AddInclude ( x => x.TransactionType );
        }
        
        public ProductCategoriesSpecification()
        {
            AddInclude ( x => x.TransactionType );
        }
    }
}