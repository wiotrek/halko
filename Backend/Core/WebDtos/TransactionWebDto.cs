namespace Core.WebDtos
{
    public class TransactionWebDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string ParticipantInitial { get; set; }
        public string ProductCategoryName { get; set; }
        public string TransactionType { get; set; }
        public string PointName { get; set; }
    }
}