using System;
using System.Threading.Tasks;
using Api.Extensions;
using Core;
using Core.Entities.Identity;
using Core.File;
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
using ILogger = Core.Logging.ILogger;
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
                IoC.Kernel.Bind<ILogFactory>().ToConstant ( new BaseLogFactory ( new ILogger[]
                {
                    // For now just log to the path where this application is running
                    new FileLogger ( "log.txt" )
                } ) );
                IoC.Kernel.Bind<ITaskManager>().ToConstant ( new TaskManager() );
                IoC.Kernel.Bind<IFileManager>().ToConstant ( new FileManager() );

                IoC.Logger.Log ( "Application starting up...", LogLevel.Debug );

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
                    
                    services.DbBackupService();
                }
                // Something was wrong like migration file not exist, missing nugget package, ...
                catch ( Exception ex )
                {
                    var logger = loggerFactory.CreateLogger<Program>();
                    logger.LogError ( ex, "An error occured during migration" );
                    IoC.Logger.Log ( "An error occured during migration", LogLevel.Error );
                    await IoC.File.WriteTextToFileAsync ( "An error occured during migration", "Log.txt", true );
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