using System.Threading.Tasks;
using Core.Entities.Auth;

namespace Core.Interfaces
{
    public interface IPointService
    {
        Task<Point> CreatePointAsync( string name );
    }
}