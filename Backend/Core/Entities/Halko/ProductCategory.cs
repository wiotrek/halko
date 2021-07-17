namespace Core.Entities.Halko
{
    public class ProductCategory : BaseEntity
    {
        public string Name { get; set; }

        public int TransactionTypeId { get; set; }
        public TransactionType TransactionType { get; set; }
    }
}