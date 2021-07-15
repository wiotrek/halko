using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface IPointService
    {
        /// <summary>
        /// Add to halko and identity database new point
        /// </summary>
        /// <param name="name">The unique name of the point</param>
        /// <returns>The inserted point</returns>
        Task<Point> CreatePointAsync( string name );

        /// <summary>
        /// Add reference between user and point in UserPoints database
        /// </summary>
        /// <returns>Number greater than 0 if added with success</returns>
        Task<int> AddPointToUser( string appUserId, int pointId );

        /// <summary>
        /// Check if point is exist in database
        /// </summary>
        /// <param name="name">The point name</param>
        /// <returns>True if exist, false otherwise</returns>
        Task<bool> IsPointExist( string name );
    }
}