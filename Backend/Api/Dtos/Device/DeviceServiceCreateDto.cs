using Core.Entities.Halko;

namespace Api.Dtos
{
    public class DeviceServiceCreateDto
    {
        public string Name { get; set; }
        public string Owner { get; set; }
        public string OwnerContact { get; set; }
        public double OwnerCost { get; set; }
        public double ServiceCost { get; set; }
        public string Imei { get; set; }
        public string TroubleDescription { get; set; }
        public ParticipantPoint Participant { get; set; }
    }
}