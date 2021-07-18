﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class PointService : IPointService
    {
        #region Private Members
        
        private readonly AppIdentityDbContext _identityContext;
        private readonly HalkoContext _halkoContext;

        #endregion
        
        #region Constructors

        public PointService(
            AppIdentityDbContext identityContext,
            HalkoContext halkoContext)
        {
            _identityContext = identityContext;
            _halkoContext = halkoContext;
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