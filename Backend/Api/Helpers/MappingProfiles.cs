using Api.Dtos;
using AutoMapper;
using Core.Entities.Halko;

namespace Api.Helpers
{
    public class MappingProfiles : Profile
    {
        
        public MappingProfiles()
        {
            CreateMap<ParticipantPoint, ParticipantsToReturnDto>();
            ProductCategoryToProductCategoryDto();
            TransactionToTransactionDto();
            TransactionDeletedToTransactionDeletedDto();
        }


        private void ProductCategoryToProductCategoryDto()
        {
            CreateMap<ProductCategory, ProductCategoriesToReturnDto>()
                .ForMember ( d => d.Type,
                    m => m.MapFrom ( s => s.TransactionType.Type ) );
        }

        private void TransactionToTransactionDto()
        {
            CreateMap<Transaction, TransactionDto>()
                .ForMember ( d => d.Initial,
                    m => m.MapFrom ( s => s.Participant.Initial ) )
                .ForMember ( d => d.Category,
                    m => m.MapFrom ( s => s.ProductCategory.Category ) )
                .ForMember ( d => d.Type,
                    m => m.MapFrom ( s => s.TransactionType.Type ) )
                .ForMember ( d => d.Name,
                    m => m.MapFrom ( s => s.Point.Name ) );
        }

        private void TransactionDeletedToTransactionDeletedDto()
        {
            CreateMap<TransactionDeleted, TransactionDeletedDto>()
                .ForMember ( d => d.Initial,
                    m => m.MapFrom ( s => s.Participant.Initial ) )
                .ForMember ( d => d.Category,
                    m => m.MapFrom ( s => s.ProductCategory.Category ) )
                .ForMember ( d => d.Type,
                    m => m.MapFrom ( s => s.TransactionType.Type ) )
                .ForMember ( d => d.Name,
                    m => m.MapFrom ( s => s.Point.Name ) );
        }
    }
}