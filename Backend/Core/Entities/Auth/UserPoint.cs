namespace Core.Entities.Auth
{
    /// <summary>
    /// How many points are assing to user
    /// </summary>
    public class UserPoint : BaseEntity
    {
        public User User { get; set; }
        public int UserId { get; set; }

        public Point Point { get; set; }
        public int PointId { get; set; }
    }
}