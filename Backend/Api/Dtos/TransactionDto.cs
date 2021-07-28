using System;

namespace Api.Dtos
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public DateTime InsertedDateTime { get; set; }
        public DateTime? EditedDateTime { get; set; } = null;
        public string Initial { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
    }
}