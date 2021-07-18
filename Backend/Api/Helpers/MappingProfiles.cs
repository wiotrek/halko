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
        }


        private void ProductCategoryToProductCategoryDto()
        {
            CreateMap<ProductCategory, ProductCategoriesToReturnDto>()
                .ForMember ( d => d.Type,
                    m => m.MapFrom ( s => s.TransactionType.Type ) );
        }
    }
}