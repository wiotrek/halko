using System;
using System.Threading.Tasks;
using Api.Extensions;
using Core.Entities.Halko;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Api
{
    public class Program
    {
        public static async Task Main( string[] args )
        {
            var host = CreateHostBuilder ( args ).Build();

            using ( var scope = host.Services.CreateScope() )
            {
                var services = scope.ServiceProvider;
                
                // Collect log information
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();

                // When application is starting, then create database from existing migration
                try
                {
                    var context = services.GetRequiredService<HalkoContext>();
                    await context.Database.MigrateAsync();
                    await context.Database.ExecuteSqlRawAsync ( "drop table if exists AppUser" );
                    await context.Database.ExecuteSqlRawAsync ( "drop table if exists Point" );
                    await context.Database.ExecuteSqlRawAsync ( "drop table if exists UserPoints" );

                    var identityConext = services.GetRequiredService<AppIdentityDbContext>();
                    await identityConext.Database.MigrateAsync();

                    await identityConext.Database.ExecuteSqlRawAsync ( "drop table if exists Point" );
                    await identityConext.Database.ExecuteSqlRawAsync ( "drop table if exists ParticipantPoint" );

                    // Necessery data as first user and roles are inserted to database after migration
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                    var unitOfWork = services.GetRequiredService<IUnitOfWork>();
                    
                    await InitializeIdentityExtensions.FirstUsingApplicationAsync ( roleManager, userManager, unitOfWork  );
                }
                // Something was wrong like migration file not exist, missing nugget package, ...
                catch ( Exception ex )
                {
                    var logger = loggerFactory.CreateLogger<Program>();
                    logger.LogError ( ex, "An error occured during migration" );
                }
                
                // Run Application if all is fine
                await host.RunAsync ();
            }
        }

        public static IHostBuilder CreateHostBuilder( string[] args ) =>
            Host.CreateDefaultBuilder ( args )
                .ConfigureWebHostDefaults ( webBuilder => { webBuilder.UseStartup<Startup>(); } );
    }
}