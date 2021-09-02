using Core.Entities.Halko;

namespace Core.Specifications
{
    public class DeviceServiceSpecification : BaseSpecification<DeviceService>
    {
        public DeviceServiceSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude ( x => x.Participant );
        }
    }
}