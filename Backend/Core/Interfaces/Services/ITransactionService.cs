using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.WebDtos;
using Core.Entities.Halko;
using Core.Enums;

namespace Core.Interfaces
{
    public interface ITransactionService
    {
        Task<EServiceResponse> CreateTransactionAsync( TransactionWebDto transactionDto );
        Task<IReadOnlyList<Transaction>> GetTransactionAsync( DateTime date, string pointName );
        Task<Transaction> GetTransactionById( int transactionId );
        Task<Transaction> UpdateTransactionAsync( TransactionWebDto transactionWebDto );
        Task<EServiceResponse> DeleteTransactionAsync( int transactionId );
        Task<IReadOnlyList<TransactionDeleted>> GetDeletedTransactionsAsync( DateTime? date, string pointName );
        Task<IReadOnlyList<ProductCategory>> GetProductCategories();
    }
}