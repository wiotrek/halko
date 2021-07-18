namespace Core.Entities.Halko
{
    public class ProductCategory : BaseEntity
    {
        public string Category { get; set; }

        public int TransactionTypeId { get; set; }
        public TransactionType TransactionType { get; set; }
    }
}