using System.Threading.Tasks;
using Core.Entities.Auth;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class PointService : IPointService
    {
        public Task<Point> CreatePointAsync( string name )
        {
            throw new System.NotImplementedException();
        }
    }
}