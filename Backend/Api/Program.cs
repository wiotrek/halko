using System;
using System.Threading.Tasks;
using Api.Extensions;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.IoC.Base;
using Core.IoC.Interfaces;
using Core.Logging;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using LogLevel = Core.Logging.LogLevel;

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
                IoC.Setup();
                IoC.Kernel.Bind<ILogFactory>().ToConstant ( new BaseLogFactory() );
                IoC.Logger.Log ( "Application starting up..." );
                IoC.Logger.Log ( "This is Debug", LogLevel.Debug );
                IoC.Logger.Log ( "This is Error", LogLevel.Error );
                IoC.Logger.Log ( "This is Informative", LogLevel.Informative );
                IoC.Logger.Log ( "This is Success", LogLevel.Success );
                IoC.Logger.Log ( "This is Verbose", LogLevel.Verbose );
                IoC.Logger.Log ( "This is Warning", LogLevel.Warning );

                // When application is starting, then create database from existing migration
                try
                {
                    var context = services.GetRequiredService<HalkoContext>();
                    var identityContext = services.GetRequiredService<AppIdentityDbContext>();
                    
                    await MigrateDatabaseExtension.MigrateHalko ( context );
                    await MigrateDatabaseExtension.MigrateIdentity ( identityContext );

                    // Necessery data as first user and roles are inserted to database after migration
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                    var unitOfWork = services.GetRequiredService<IUnitOfWork>();
                    
                    await InitializeDataExtensions.FirstUsingApplicationAsync ( roleManager, userManager, unitOfWork  );
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