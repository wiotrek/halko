using System;

namespace Api.Dtos
{
    public class DeviceDisplayItemDto : DeviceBaseDto
    {
        public int Id { get; set; }
        public DateTime DateBuyed { get; set; }
        public DateTime? DateSold { get; set; }
        
        /// <summary>
        /// The device state
        /// </summary>
        public string State { get; set; }
        
        /// <summary>
        /// The point name
        /// </summary>
        public string Name { get; set; }
    }
}