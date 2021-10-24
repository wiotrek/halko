using System;
using System.Configuration;
using Api.Processes;
using Coravel;
using Core.Interfaces;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static void AddApplicationServices( this IServiceCollection services )
        {
            services.AddScoped ( typeof(IGenericRepository<>), typeof(GenericRepository<>) );
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPointService, PointService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IParticipantService, ParticipantService>();
            services.AddScoped<IDeviceService, DeviceService>();
            services.AddScoped<ISettlementService, SettlementService>();
            services.AddScheduler();
            services.AddTransient<DbBackupProcess>();
        }
        
        public static void DbBackupService( this IServiceProvider services )
        {
            
            services.UseScheduler ( scheduler =>
            {
                var hour = int.Parse(ConfigurationManager.AppSettings["backup time"] ?? "20");
                var jobSchedule = scheduler.Schedule<DbBackupProcess>();
                jobSchedule.DailyAtHour ( hour )
                    .Zoned ( TimeZoneInfo.Local );
            } );
        }
    }
}