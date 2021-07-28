using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Errors;
using Api.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.WebDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    public class TransactionController : BaseApiController
    {
        private readonly ITransactionService _transactionService;
        private readonly IMapper _mapper;

        public TransactionController(
            ITransactionService transactionService,
            IMapper mapper,
            UserManager<AppUser> userManager ) : base ( userManager )
        {
            _transactionService = transactionService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> CreateTransactionAsync(TransactionWebDto transactionWebDto)
        {
            var result = await _transactionService.CreateTransactionAsync ( transactionWebDto );

            if( result <= 0 )
                return BadRequest ( new ApiResponse ( 400, result ) );

            var transactionCreated = await _transactionService.GetTransactionById ( (int) result );
            var transactionDto = _mapper.Map<TransactionDto> ( transactionCreated );

            return Ok ( transactionDto );
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TransactionDto>>> GetTransactionsAsync([FromQuery] DateTime date, string pointName )
        {
            var transactions = await _transactionService.GetTransactionAsync ( date, pointName );

            var transactionsToReturn = _mapper.Map<IReadOnlyList<TransactionDto>> ( transactions );

            return Ok ( transactionsToReturn );
        }

        [HttpPut]
        public async Task<ActionResult<TransactionDto>> UpdateTransactionAsync( TransactionWebDto transactionWebDto )
        {
            var transaction = await _transactionService.UpdateTransactionAsync ( transactionWebDto );

            if( transaction == null )
                return BadRequest (
                    new ApiResponse ( 400,
                        $"Transakcja nie została zaktualizowana. Możliwe przyczyny: {Environment.NewLine}  " +
                        $"Brak rodzaju produktu.{Environment.NewLine} " +
                        $"Brak lub usunięty pracownik.{Environment.NewLine} " +
                        "Aktualizowana transakcja została wcześniej usunięta" ) );

            var transactionToReturn = _mapper.Map<TransactionDto> ( transaction );

            return Ok ( transactionToReturn );
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteTransactionAsync( [FromQuery] int id )
        {
            var result = await _transactionService.DeleteTransactionAsync ( id );

            return result <= 0
                ? BadRequest ( new ApiResponse ( 400, result ) )
                : Ok ( new ApiResponse ( 200, result ) );
        }
        
        [HttpGet("deleted")]
        public async Task<ActionResult<IReadOnlyList<TransactionDeletedDto>>> GetDeletedTransactionsAsync 
            ([FromQuery] DateTime? insertedDate, string pointName)
        {
            if( !await IsAdmin() )
                return Unauthorized ( new ApiResponse ( 401, ApiErrorMessage.AdminContent.GetnEnumMemberValue() ) );
            
            var deletedTransactions = await _transactionService.GetDeletedTransactionsAsync ( insertedDate, pointName );
            if( deletedTransactions == null )
                return BadRequest ( new ApiResponse ( 401, ApiErrorMessage.TransactionDeletedFailed.GetnEnumMemberValue() ) );

            var deletedTransactionsToReturn = _mapper.Map<IReadOnlyList<TransactionDeletedDto>> ( deletedTransactions );

            return Ok ( deletedTransactionsToReturn );
        }


        [HttpGet ( "product-categories" )]
        public async Task<ActionResult<List<ProductCategoriesToReturnDto>>> GetProductCategoriesAsync()
        {
            var productCategories = await _transactionService.GetProductCategories();

            var productCategoriesToReturn = _mapper.Map<IReadOnlyList<ProductCategoriesToReturnDto>> ( productCategories );

            return Ok ( productCategoriesToReturn );
        }
        
    }
}