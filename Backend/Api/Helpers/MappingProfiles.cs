using Api.Dtos;
using AutoMapper;
using Core.Entities.Halko;

namespace Api.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ParticipantPoint, ParticipantDto>();
            CreateMap<ParticipantDto, ParticipantPoint>().ReverseMap();
            CreateMap<SettlementDto, Settlement>().ReverseMap();
            
            ProductCategoryToProductCategoryDto();
            TransactionToTransactionDto();
            TransactionDeletedToTransactionDeletedDto();
            DeviceDtoToDevice();
            DeviceToDeviceDisplayItemDto();
            DeviceServiceDtoToDeviceService();
            DeviceServiceToDeviceServiceDto();
            DeviceServiceToDeviceServiceItemDto();
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

        private void DeviceDtoToDevice()
        {
            CreateMap<DeviceCreateDto, Device>().ReverseMap();
        }

        private void DeviceServiceDtoToDeviceService()
        {
            CreateMap<DeviceServiceCreateDto, DeviceService>().ReverseMap();
        }
        
        private void DeviceServiceToDeviceServiceDto()
        {
            CreateMap<DeviceServiceCreateDto, DeviceService>();
            CreateMap<ParticipantWithPointDto, ParticipantPoint>();
            CreateMap<PointDto, Point>();
        }
        
        private void DeviceServiceToDeviceServiceItemDto()
        {
            CreateMap<DeviceService, DeviceServiceItemDto>();
            CreateMap<ParticipantPoint, ParticipantWithPointDto>();
            CreateMap<Point, PointDto>();
        }

        private void DeviceToDeviceDisplayItemDto()
        {
            CreateMap<Device, DeviceDisplayItemDto>()
                .ForMember ( d => d.Name,
                    m => m.MapFrom ( s => s.Point.Name ) )
                .ForMember ( d => d.State,
                    m => m.MapFrom ( s => s.DeviceState.State ) );
        }
    }
}