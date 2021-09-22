using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Halko;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Point = Core.Entities.Identity.Point;

namespace Infrastructure.Services
{
    public class PointService : IPointService
    {
        #region Private Members
        
        private readonly AppIdentityDbContext _identityContext;
        private readonly HalkoContext _halkoContext;
        private readonly IUnitOfWork _unitOfWork;

        #endregion
        
        #region Constructors

        public PointService(
            AppIdentityDbContext identityContext,
            HalkoContext halkoContext,
            IUnitOfWork unitOfWork)
        {
            _identityContext = identityContext;
            _halkoContext = halkoContext;
            _unitOfWork = unitOfWork;
        }
        
        #endregion
        
        #region Implemented Methods
        
        public async Task<Point> CreatePointAsync( string name )
        {
            #region Identity Point
            
            if( name == null ) return null;
            
            var identityPoint = new Point
            {
                Name = name
            };
            
            await _identityContext.AddAsync ( identityPoint );
            await _identityContext.SaveChangesAsync();
            
            #endregion
            
            #region Halko Point
            
            var halkoPoint = new Core.Entities.Halko.Point
            {
                Name = name
            };
            
            await _halkoContext.AddAsync ( halkoPoint );
            await _halkoContext.SaveChangesAsync();

            #endregion
            
            return identityPoint;
        }

        public async Task<bool> DeletePointAsync( string name )
        {
            #region Halko
            var point = await _halkoContext.Points.Where ( p => p.Name == name ).FirstOrDefaultAsync();
            if( point == null ) return false;


            var deviceSpec = new DeviceSpecification ( name );
            var devices = await _unitOfWork.Repository<Device>().ListAsync ( deviceSpec );
            if( devices.Count > 0 )
                foreach ( var device in devices )
                    _unitOfWork.Repository<Device>().Delete ( device );
                
            var deviceServiceSpec = new DeviceServiceSpecification ( name );
            var deviceServices = await _unitOfWork.Repository<Core.Entities.Halko.DeviceService>().ListAsync ( deviceServiceSpec );
            if( deviceServices.Count > 0 )
                foreach ( var deviceService in deviceServices )
                    _unitOfWork.Repository<Core.Entities.Halko.DeviceService>().Delete ( deviceService );
            
            var participantSpec = new ParticipantSpecification ( name );
            var participants = await _unitOfWork.Repository<ParticipantPoint>().ListAsync ( participantSpec );
            if( participants.Count > 0 )
                foreach ( var participant in participants )
                    _unitOfWork.Repository<ParticipantPoint>().Delete ( participant );
            
            var transactionSpec = new TransactionSpecification ( name );
            var transactions = await _unitOfWork.Repository<Transaction>().ListAsync ( transactionSpec );
            if( transactions.Count > 0 )
                foreach ( var transaction in transactions )
                    _unitOfWork.Repository<Transaction>().Delete ( transaction );
            
            var transactionDeletedSpec = new TransactionDeletedSpecification ( name );
            var transactionsDeleted = await _unitOfWork.Repository<TransactionDeleted>().ListAsync ( transactionDeletedSpec );
            if( transactionsDeleted.Count > 0 )
                foreach ( var transactionDeleted in transactionsDeleted )
                    _unitOfWork.Repository<TransactionDeleted>().Delete ( transactionDeleted );
            
            var settlementSpec = new SettlementSpecification ( name );
            var settlements = await _unitOfWork.Repository<Settlement>().ListAsync ( settlementSpec );
            if( settlements.Count > 0 )
                foreach ( var settlement in settlements )
                    _unitOfWork.Repository<Settlement>().Delete ( settlement );
            
            _unitOfWork.Repository<Core.Entities.Halko.Point>().Delete ( point );
            var result = await _unitOfWork.CompleteAsync();
            if( result < 0 ) return false;
            
            #endregion
            
            #region Identity
            
            var authPoint = await _identityContext.Points.Where ( p => p.Name == name ).FirstOrDefaultAsync();
            if( authPoint == null ) return false;
            var authPointId = authPoint.Id;
            string userId = null;
            

            var userPoints = await _identityContext.UserPoints.Where ( x => x.PointId == authPointId ).ToListAsync();
            if( userPoints.Count > 0 )
            {
                foreach ( var userPoint in userPoints )
                {
                    var userRole = await _identityContext.UserRoles
                        .Where ( p => p.UserId == userPoint.AppUserId ).FirstOrDefaultAsync();
                    var role = _identityContext.Roles.First( r => r.Id == userRole.RoleId );
                    
                    if( role.Name == "Point" )
                        userId = userRole.UserId;
                }
                
                _identityContext.UserPoints.RemoveRange ( userPoints );
            }

            
            var aspUserRole = _identityContext.UserRoles.First ( x => x.UserId == userId );
            var aspUser = _identityContext.Users.First ( x => x.Id == userId );
            
            
            _identityContext.UserRoles.Remove ( aspUserRole );
            _identityContext.Users.Remove ( aspUser );
            _identityContext.Points.Remove ( authPoint );

            
            result = await _identityContext.SaveChangesAsync();

            #endregion
            
            return result >= 0;
        }

        public async Task<List<Point>> ListPointsAsync()
        {
            return await _identityContext.Points.ToListAsync();
        }

        public async Task<Point> GetPointByUserAsync( AppUser user )
        {
            var userPoint = await _identityContext.UserPoints
                .FirstOrDefaultAsync (  x => x.AppUserId == user.Id );


            var point = await _identityContext.Points
                .FirstOrDefaultAsync ( x => x.Id == userPoint.PointId );
            

            return point;
        }

        public async Task<int> AddPointToUser( string appUserId, int pointId )
        {
                var userPoint = new UserPoints
                {
                    AppUserId = appUserId,
                    PointId = pointId
                };

                await _identityContext.AddAsync ( userPoint );
                var result = await _identityContext.SaveChangesAsync();

                return !(result > 0) ? -1 : 1;
        }

        public async Task<bool> IsPointExist( string name )
        {
            return await _identityContext.Points.FirstOrDefaultAsync ( x => x.Name == name ) != null;
        }
        
        #endregion
    }
}