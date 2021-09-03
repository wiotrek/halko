using System;

namespace Api.Dtos
{
    public class DeviceServiceItemDto : DeviceServiceCreateDto
    {
        public DateTime PointSubmitDate { get; set; }
        public DateTime? GiveBackDate { get; set; }
        public string GiveBackInfo { get; set; }
    }
}