using FastTrack.API.Helpers;
using FastTrack.Core.Interfaces;
using FastTrack.Core.Repositories;
using FastTrack.Core.Services;
using FastTrack.Infrastructure.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FastTrack.API
{
    public partial class Startup
    {
        private IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc();
            services.AddScoped<IJwtHelpers, JwtHelpers>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<IAuthenticationService, AccountService>();

            ConfigureServicesAuth(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            ConfigureAuth(app);

            app.UseMvc(routes =>
            {
                routes.MapRoute(name: "default", template: "api/{controller}/{action=Index}/{id?}");
            });
        }
    }
}
