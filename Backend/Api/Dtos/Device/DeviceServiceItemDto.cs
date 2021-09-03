using System;

namespace Api.Dtos
{
    /// <summary>
    /// Device service contain all information
    /// </summary>
    public class DeviceServiceItemDto : DeviceServiceCreateDto
    {
        public DateTime PointSubmitDate { get; set; }
        public DateTime? GiveBackDate { get; set; }
        public string GiveBackInfo { get; set; }
    }
}