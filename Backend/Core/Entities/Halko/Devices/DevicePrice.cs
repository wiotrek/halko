namespace Core.Entities.Halko
{
    public class DevicePrice : BaseEntity
    {
        public string Producer { get; set; }
        public string Model { get; set; }
        public double BoughtPrice { get; set; }
        public double SellPrice { get; set; }
        public double? ScreenChangeCost { get; set; }
        public double? CameraChangeCost { get; set; }
    }
}