namespace Core.Entities.Identity
{
    public class UserPoints
    {
        public int Id { get; set; }
        
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        
        public Point Point { get; set; }
        public int PointId { get; set; }
    }
}