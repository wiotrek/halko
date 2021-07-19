using System;

namespace Api.Dtos
{
    public class TransactionDeletedDto : TransactionDto
    {
        public DateTime DeletedDateTime { get; set; }
    }
}