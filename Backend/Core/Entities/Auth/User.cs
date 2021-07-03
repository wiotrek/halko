namespace Core.Entities.Auth
{
    /// <summary>
    /// The identity as point or admin having access to all points
    /// </summary>
    public class User : BaseEntity
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}