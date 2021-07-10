using Core.Entities.Auth;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}