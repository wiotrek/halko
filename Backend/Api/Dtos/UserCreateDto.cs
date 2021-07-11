namespace Api.Dtos
{
    /// <summary>
    /// Create user which can be point or admin
    /// Kind is recognized by Route where the class is used
    /// </summary>
    public class UserCreateDto
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}