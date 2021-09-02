using System;

namespace Core.Entities.Halko
{
    /// <summary>
    /// Service for device which are going to archive after device was served.
    /// Archive meaning that GiveBackDate and GiveBackInfo are fill.
    /// </summary>
    public class DeviceService : BaseEntity
    {
        /// <summary>
        /// Name of device
        /// </summary>
        public string Name { get; set; }
        
        public string Owner { get; set; }
        
        /// <summary>
        ///  Contact phone to owner
        /// </summary>
        public string OwnerContact { get; set; }
        
        /// <summary>
        ///  Cost for owner
        /// </summary>
        public double OwnerCost { get; set; }
        
        /// <summary>
        /// Cost for service
        /// </summary>
        public double ServiceCost { get; set; }
        public string Imei { get; set; }
        public string TroubleDescription { get; set; }
        
        /// <summary>
        /// Date of take to point
        /// </summary>
        public DateTime PointSubmitDate { get; set; }

        /// <summary>
        /// Employee which took device to service
        /// </summary>
        public ParticipantPoint Participant { get; set; }
        public int ParticipantId { get; set; }
        
        /// <summary>
        /// Point in which device was delivered to service
        /// </summary>
        public Point Point { get; set; }
        public int PointId { get; set; }

        public DateTime? GiveBackDate { get; set; }

        /// <summary>
        /// Information about service was done success
        /// </summary>
        public string GiveBackInfo { get; set; }
    }
}