using System.Reflection;
using Core.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class HalkoContext : DbContext
    {
        #region DB Members
        
        #region Auth Members

        public DbSet<Point> Points { get; set; }
        public DbSet<ParticipantPoint> Participants { get; set; }
        public DbSet<UserPoint> UserPoints { get; set; }
        
        #endregion
        
        #endregion
        
        #region DI Constructor

        public HalkoContext( DbContextOptions<HalkoContext> options ) : base( options )
        {
            
        }

        #endregion

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            base.OnModelCreating ( modelBuilder );
            
            modelBuilder.ApplyConfigurationsFromAssembly ( Assembly.GetExecutingAssembly() );
        }
    }
}