using System.Collections.Generic;

namespace Core.Entities.Auth
{
    public class Point : BaseEntity
    {
        public string Name { get; set; }
        public IReadOnlyList<ParticipantPoint> Participants { get; set; }
    }
}