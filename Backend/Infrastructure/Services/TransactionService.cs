using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.WebDtos;
using Core.Entities.Halko;
using Core.Enums;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TransactionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<EServiceResponse> CreateTransactionAsync( TransactionWebDto transactionDto )
        {
            if( string.IsNullOrEmpty ( transactionDto.ProductName ) ) return EServiceResponse.ProductEmpty;
            if( transactionDto.Price <= 0 ) return EServiceResponse.PriceBelowZero;
            
            
            var pointSpec = new PointSpecification ( transactionDto.PointName );
            var point = await _unitOfWork.Repository<Point>().GetEntityWithSpecAsync ( pointSpec );
            if( point == null ) return EServiceResponse.PointNotExist;
            
            
            var participantSpec = new ParticipantSpecification ( transactionDto.ParticipantInitial, point.Id );
            var participant = await _unitOfWork.Repository<ParticipantPoint>().GetEntityWithSpecAsync ( participantSpec );

            
            var productCategorySpec = new ProductCategoriesSpecification ( transactionDto.ProductCategoryName, transactionDto.TransactionType );
            var productCategory = await _unitOfWork.Repository<ProductCategory>().GetEntityWithSpecAsync ( productCategorySpec );

            
            if( participant == null ) return EServiceResponse.ParticipantNotExist;
            if( productCategory == null ) return EServiceResponse.ProductCategoryNotExist;
            if( transactionDto.ParticipantInitial.Contains ( "[D]" ) ) return EServiceResponse.ParticipantWasDeleted;

            
            var transactionToSave = new Transaction
            {
                ProductName = transactionDto.ProductName,
                Price = transactionDto.Price,
                Participant = participant,
                ProductCategory = productCategory,
                TransactionType = productCategory.TransactionType,
                Point = point
            };

            
            _unitOfWork.Repository<Transaction>().Add ( transactionToSave );
            var result = await _unitOfWork.CompleteAsync();

            
            return result <= 0 
                ? EServiceResponse.TransactionCreateFailed 
                : EServiceResponse.TransactionCreateSuccess;
        }


        public async Task<Transaction> UpdateTransactionAsync( TransactionWebDto transactionWebDto )
        {
            var transactionSpec = new TransactionSpecification ( transactionWebDto.Id );
            var transactionToUpdate = await _unitOfWork.Repository<Transaction>().GetEntityWithSpecAsync ( transactionSpec );

            if( transactionToUpdate == null ) return null;

            if( transactionToUpdate.ProductName != transactionWebDto.ProductName )
                transactionToUpdate.ProductName = transactionWebDto.ProductName;
            
            if( transactionToUpdate.Price != transactionWebDto.Price )
                transactionToUpdate.Price = transactionWebDto.Price;

            if( transactionToUpdate.Participant.Initial != transactionWebDto.ParticipantInitial )
            {
                var participantSpec = new ParticipantSpecification ( transactionWebDto.ParticipantInitial, transactionToUpdate.PointId );
                var participant = await _unitOfWork.Repository<ParticipantPoint>().GetEntityWithSpecAsync ( participantSpec );
                
                if (participant == null) return null;

                if( participant.Initial.Contains ( "[D]" ) ||
                    transactionToUpdate.Participant.Initial.Contains ( "[D]" ) ) return null;
                
                transactionToUpdate.ParticipantId = participant.Id;
            }

            if( transactionToUpdate.ProductCategory.Category != transactionWebDto.ProductCategoryName )
            {
                var productSpec = new ProductCategoriesSpecification ( 
                    transactionWebDto.ProductCategoryName, 
                    transactionToUpdate.TransactionTypeId 
                );
                
                var product = await _unitOfWork
                    .Repository<ProductCategory>()
                    .GetEntityWithSpecAsync ( productSpec );

                if( product == null ) return null;
                
                transactionToUpdate.ProductCategoryId = product.Id;
            }
            
            transactionToUpdate.EditedDateTime = DateTime.Now;

            _unitOfWork.Repository<Transaction>().Update ( transactionToUpdate );
            var result = await _unitOfWork.CompleteAsync();

            return result <= 0 ? null : transactionToUpdate;
        }


        public async Task<IReadOnlyList<Transaction>> GetTransactionAsync( DateTime date, string pointName )
        {
            var transactionSpec = new TransactionSpecification ( date, pointName );
            
            var transactions = await _unitOfWork.Repository<Transaction>().ListAsync ( transactionSpec );

            return transactions;
        }

        
        public async Task<EServiceResponse> DeleteTransactionAsync( int transactionId )
        {
            var transactionSpec = new TransactionSpecification ( transactionId );
            var transaction = await _unitOfWork.Repository<Transaction>().GetEntityWithSpecAsync ( transactionSpec );

            if( transaction == null ) return EServiceResponse.TransactionNotExist;

            var transactionDelete = new TransactionDeleted
            {
                ProductName = transaction.ProductName,
                Price = transaction.Price,
                InsertedDateTime = transaction.InsertedDateTime,
                EditedDateTime = transaction.EditedDateTime,
                DeletedDateTime = DateTime.Now,
                ParticipantId = transaction.ParticipantId,
                ProductCategoryId = transaction.ProductCategoryId,
                TransactionTypeId = transaction.TransactionTypeId,
                PointId = transaction.PointId
            };

            _unitOfWork.Repository<Transaction>().Delete ( transaction );
            var result = await _unitOfWork.CompleteAsync();
            if( result <= 0 ) return EServiceResponse.TransactionDeleteFailed;

            _unitOfWork.Repository<TransactionDeleted>().Add ( transactionDelete );
            await _unitOfWork.CompleteAsync();

            return EServiceResponse.TransactionDeleteSuccess;
        }


        public async Task<IReadOnlyList<TransactionDeleted>> GetDeletedTransactionsAsync( DateTime? insertedDate, string pointName )
        {
            var transactionSpec = insertedDate != null ? 
                new TransactionDeletedSpecification ( (DateTime) insertedDate, pointName ) : 
                new TransactionDeletedSpecification ( pointName );

            var deletedTransactions = await _unitOfWork.Repository<TransactionDeleted>().ListAsync ( transactionSpec );

            return deletedTransactions;
        }


        public async Task<IReadOnlyList<ProductCategory>> GetProductCategories()
        {
            var productCategories = await _unitOfWork.Repository<ProductCategory>()
                .ListAsync ( new ProductCategoriesSpecification() );

            return productCategories;
        }
    }
}