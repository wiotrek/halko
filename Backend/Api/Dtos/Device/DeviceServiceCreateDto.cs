using System;

namespace Api.Dtos
{
    public class DeviceServiceCreateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }
        public string OwnerContact { get; set; }
        public double OwnerCost { get; set; }
        public double ServiceCost { get; set; }
        public string Imei { get; set; }
        public string TroubleDescription { get; set; }
        public DateTime PointSubmitDate { get; set; }
        public ParticipantWithPointDto Participant { get; set; }
    }
}