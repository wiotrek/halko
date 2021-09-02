using System;

namespace Core.Entities.Halko
{
    public class Device : BaseEntity
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public string Imei { get; set; }
        public string Color { get; set; }
        public string Comment { get; set; }
        public DateTime DateBuyed { get; set; } = DateTime.Now;
        public DateTime? DateSold { get; set; }
        public double PriceBuyed { get; set; }
        public double Price { get; set; }
        
        
        public Point Point { get; set; }
        public int PointId { get; set; }

        public DeviceState DeviceState { get; set; }
        public int DeviceStateId { get; set; }
    }
}