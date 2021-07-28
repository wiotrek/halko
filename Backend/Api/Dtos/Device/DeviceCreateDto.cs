using Core.Entities.Halko;

namespace Api.Dtos
{
    public class DeviceCreateDto : DeviceBaseDto
    {
        public DeviceState DeviceState { get; set; }
        public Point Point { get; set; }
    }
}