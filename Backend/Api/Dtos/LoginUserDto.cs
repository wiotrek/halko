using System.Collections.Generic;

namespace Api.Dtos
{
    /// <summary>
    /// Is pass on to client if user is login successfully
    /// </summary>
    public class LoginUserDto
    {
        public string Login { get; set; }
        public IEnumerable<string> PointNames { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
    }
}