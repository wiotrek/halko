namespace Api.Dtos
{
    public class DeviceCreateDto : DeviceBaseDto
    {
        public int DeviceStateId { get; set; }
        public int PointId { get; set; }
    }
}