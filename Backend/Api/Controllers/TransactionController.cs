using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.WebDtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
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
            if( !IsLogin() ) return Unauthorized();
            
            var transaction = await _transactionService.CreateTransactionAsync ( transactionWebDto );

            if( transaction == null ) return BadRequest();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TransactionDto>>> GetTransactionsAsync([FromQuery] DateTime date, string pointName )
        {
            if( !IsLogin() ) return Unauthorized();
            
            var transactions = await _transactionService.GetTransactionAsync ( date, pointName );

            var transactionsToReturn = _mapper.Map<IReadOnlyList<TransactionDto>> ( transactions );

            return Ok ( transactionsToReturn );
        }

        [HttpPut]
        public async Task<ActionResult<TransactionDto>> UpdateTransactionAsync( TransactionWebDto transactionWebDto )
        {
            if( !IsLogin() ) return Unauthorized();
            
            var transaction = await _transactionService.UpdateTransactionAsync ( transactionWebDto );
            
            if (transaction == null) return BadRequest();

            var transactionToReturn = _mapper.Map<TransactionDto> ( transaction );

            return Ok ( transactionToReturn );
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteTransactionAsync( [FromQuery] int id )
        {
            if( !IsLogin() ) return Unauthorized();
            
            var result = await _transactionService.DeleteTransactionAsync ( id );

            return result > 0 ? Ok() : BadRequest();
        }
        
        [HttpGet("deleted")]
        public async Task<ActionResult<IReadOnlyList<TransactionDeletedDto>>> GetDeletedTransactionsAsync 
            ([FromQuery] DateTime? insertedDate, string pointName)
        {
            if( !await IsAdmin() ) return Unauthorized();
            
            var deletedTransactions = await _transactionService.GetDeletedTransactionsAsync ( insertedDate, pointName );
            if (deletedTransactions == null) return BadRequest();

            var deletedTransactionsToReturn = _mapper.Map<IReadOnlyList<TransactionDeletedDto>> ( deletedTransactions );

            return Ok ( deletedTransactionsToReturn );
        }


        [HttpGet ( "product-categories" )]
        public async Task<ActionResult<List<ProductCategoriesToReturnDto>>> GetProductCategoriesAsync()
        {
            if( !IsLogin() ) return Unauthorized();
            
            var productCategories = await _transactionService.GetProductCategories();

            var productCategoriesToReturn = _mapper.Map<IReadOnlyList<ProductCategoriesToReturnDto>> ( productCategories );

            return Ok ( productCategoriesToReturn );
        }
        
    }
}