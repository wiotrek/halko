using System;

namespace Core.Entities.Halko
{
    public class TransactionDeleted : BaseEntity
    {
        public string ProductName { get; set; }
        public double Price { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime EditedDateTime { get; set; }
        public DateTime DeletedDateTime { get; set; } = DateTime.Now;

        public int ParticipantId { get; set; }
        public ParticipantPoint Participant { get; set; }

        public int ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }

        public int TransactionTypeId { get; set; }
        public TransactionType TransactionType { get; set; }

        public int PointId { get; set; }
        public Point Point { get; set; }
    }
}