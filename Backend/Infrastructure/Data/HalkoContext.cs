using System;
using System.Linq;
using System.Reflection;
using Core.Entities.Halko;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data
{
    public class HalkoContext : DbContext
    {
        #region DB Members

        public DbSet<Point> Points { get; set; }
        public DbSet<ParticipantPoint> Participants { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<TransactionType> TransactionTypes { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionDeleted> TransactionsDeleted { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<DeviceState> DeviceStates { get; set; }
        public DbSet<DeviceService> DeviceServices { get; set; }
        public DbSet<DevicePrice> DevicePrices { get; set; }
        public DbSet<Settlement> Settlements { get; set; }
        
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
            
            if( Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite" )
            {
                foreach ( var entityType in modelBuilder.Model.GetEntityTypes() )
                {
                    var properties = entityType.ClrType.GetProperties()
                        .Where ( p => p.PropertyType == typeof(decimal) );

                    var dateTimeProperties = entityType.ClrType.GetProperties()
                        .Where ( p => p.PropertyType == typeof(DateTimeOffset) );

                    foreach ( var property in properties )
                    {
                        modelBuilder.Entity ( entityType.Name ).Property ( property.Name )
                            .HasConversion<double>();
                    }
                    
                    foreach ( var property in dateTimeProperties )
                    {
                        modelBuilder.Entity ( entityType.Name ).Property ( property.Name )
                            .HasConversion ( new DateTimeOffsetToBinaryConverter() );
                    }
                }
            }
        }
    }
}