namespace Core.Entities.Halko
{
    /// <summary>
    /// The member of specific point
    /// </summary>
    public class ParticipantPoint : BaseEntity
    {
        public string Initial { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int PointId { get; set; }
        public Point Point { get; set; }
    }
}