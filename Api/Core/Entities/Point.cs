using System.Collections.Generic;

namespace Core.Entities
{
    public class Point : BaseEntity
    {
        public string Name { get; set; }
        public List<ParticipantPoint> Participants;
    }
}