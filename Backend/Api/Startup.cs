using Api.Extensions;
using Api.Helpers;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Api
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup( IConfiguration config )
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices( IServiceCollection services )
        {
            services.AddAutoMapper ( typeof(MappingProfiles) );
            services.AddControllers();//.AddNewtonsoftJson();

            #region Connection Strings
            
            services.AddDbContext<HalkoContext> ( x => x.UseSqlite (
                _config.GetConnectionString ( "DefaultConnection" ) ) );
            
            services.AddDbContext<AppIdentityDbContext> ( x => x.UseSqlite (
                _config.GetConnectionString ( "IdentityConnection" ) ) );
            
            #endregion

            // Services with all register depedencies
            services.AddApplicationServices();
            services.AddIdentityService ( _config );
            
            services.AddSwaggerGen ( c => { c.SwaggerDoc ( "v1", new OpenApiInfo {Title = "Api", Version = "v1"} ); } );
            
            services.AddCors ( opt =>
            {
                opt.AddPolicy ( "CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                } );
            } );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure( IApplicationBuilder app, IWebHostEnvironment env )
        {
            app.UseCors ( "CorsPolicy" );
            
            if( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI ( c => c.SwaggerEndpoint ( "/swagger/v1/swagger.json", "Api v1" ) );
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints ( endpoints => { endpoints.MapControllers(); } );
        }
    }
}