using System.Collections.Generic;
using System.Threading.Tasks;
using Core.WebDtos;
using Core.Entities.Halko;

namespace Core.Interfaces
{
    public interface ITransactionService
    {
        Task<Transaction> CreateTransactionAsync(TransactionToInsertDto transactionDto);
        Task<IReadOnlyList<ProductCategory>> GetProductCategories();
    }
}