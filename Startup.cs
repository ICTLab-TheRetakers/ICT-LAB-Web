using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Hangfire;
using Hangfire.PostgreSql;
using ICT_LAB_Web.Components.Helper;

namespace ICT_LAB_Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Register the Swagger generator, defining one or more Swagger documents  
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new Info { Title = "HINT Reservation System API", Version = "v1" });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetEntryAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddCors(options => {
                options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            //services.AddHangfire(x => x.UsePostgreSqlStorage(@"Host=localhost; Database=hangfire; User Id=hangfire; Password=retakers;"));
            
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.Use(async (context, next) => {
                await next();
                if (context.Response.StatusCode == 404 &&
                   !Path.HasExtension(context.Request.Path.Value) &&
                   !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseMvcWithDefaultRoute();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSwagger();

            app.UseSwaggerUI(c => {
                c.RoutePrefix = "api";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "HINT Reservation System API");
            });

            app.UseCors("AllowAll");

            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "readings",
                    template: "api/readings/{action}/{id?}",
                    defaults: new { controller = "RoomReadings" }
                );
                routes.MapRoute(
                    name: "api",
                    template: "api/{controller}/{action}/{id?}"
                );
            });

            //app.UseHangfireDashboard();
            //app.UseHangfireServer();

            //var bgWorker = new BackgroundWorker();

            //// Check reservation time once an hour (from 6 AM to 10 PM) in order to send reminders
            //RecurringJob.AddOrUpdate(() => bgWorker.CheckReservationsForReminders(), "0 6-22 * * MON-FRI");

            //// Check Reservations and notifications once a week for deletions
            //RecurringJob.AddOrUpdate(() => bgWorker.CheckReservationsForDeletion(), "0 0 * * SUN");
            //RecurringJob.AddOrUpdate(() => bgWorker.CheckNotificationsForDeletion(), "0 0 * * SUN");

            //var email = new Email();

            //BackgroundJob.Enqueue(() => email.ReservationConfirmationEmail("justmike112@hotmail.com", "WD.0.016", new DateTime(), new DateTime()));
        }
    }
}
