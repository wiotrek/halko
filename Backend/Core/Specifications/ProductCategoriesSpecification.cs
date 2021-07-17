using Core.Entities.Halko;

namespace Core.Specifications
{
    public class ProductCategoriesSpecification : BaseSpecification<ProductCategory>
    {
        public ProductCategoriesSpecification( string name, int transactionTypeId ) 
            : base( x => x.Name == name && 
                         x.TransactionTypeId == transactionTypeId)
        {
            
        }
    }
}