using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.WebDtos;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface ITransactionService
    {
        Task<Transaction> CreateTransactionAsync( TransactionWebDto transactionDto );
        Task<IReadOnlyList<Transaction>> GetTransactionAsync( DateTime date, string pointName );
        Task<Transaction> UpdateTransactionAsync( TransactionWebDto transactionWebDto );
        Task<int> DeleteTransactionAsync( int transactionId );
        Task<IReadOnlyList<ProductCategory>> GetProductCategories();
    }
}