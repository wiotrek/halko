namespace Api.Dtos
{
    public class DeviceDto
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public string Imei { get; set; }
        public string Color { get; set; }
        public string Comment { get; set; }
        public double PriceBuyed { get; set; }
        public double Price { get; set; }
        public int DeviceStateId { get; set; }
        public int PointId { get; set; }
    }
}