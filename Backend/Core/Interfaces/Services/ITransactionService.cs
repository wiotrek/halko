using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.WebDtos;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface ITransactionService
    {
        Task<Transaction> CreateTransactionAsync(TransactionToInsertDto transactionDto);
        Task<IReadOnlyList<Transaction>> GetTransactionAsync( DateTime date, string pointName );
        Task<IReadOnlyList<ProductCategory>> GetProductCategories();
    }
}