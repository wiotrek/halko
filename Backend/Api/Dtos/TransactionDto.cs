using System;

namespace Api.Dtos
{
    public class TransactionDto
    {
        public string ProductName { get; set; }
        public double Price { get; set; }
        public DateTime DateTime { get; set; }
        public string Initial { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
    }
}