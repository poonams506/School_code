using Azure.Core;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Security.Claims;
using System.Text;

namespace SchoolApiApplication.Middleware
{
    public class RequestLoggerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggerMiddleware> _logger;

        public RequestLoggerMiddleware(RequestDelegate next, ILogger<RequestLoggerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            var sw = Stopwatch.StartNew();
            try
            {
                await _next(context);
            }
            finally
            {
                sw.Stop();
                await LogRequest(context, sw.ElapsedMilliseconds);
            }
        }

        private async Task LogRequest(HttpContext context, long elapsedMilliseconds)
        {
            var clientIPAddress = context.Request.Headers["X-Public-IP"];
            var clientLatitude= context.Request.Headers["X-Latitude"];
            var clientLongitude = context.Request.Headers["X-Longitude"];
            var userIdClaim = context.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            var userId = string.Empty;
            if (userIdClaim != null)
            {
                userId = userIdClaim.Value;
            }
            if (string.IsNullOrEmpty(clientIPAddress) || string.IsNullOrWhiteSpace(clientIPAddress))
            {
                clientIPAddress = context.Connection.RemoteIpAddress?.ToString();
            }

            _logger.LogWarning($@"Request Log :- RequestUrl={context.Request.Path}, 
                                                     Client IP Address={clientIPAddress},
                                                     Client IP Port={context.Connection.RemotePort},
                                                     Client Latitude={clientLatitude},
                                                     Client Longitude={clientLongitude},
                                                     User ID= {userId}
                                                     RequestMethod={context.Request.Method},
                                                     ResponseStatusCode={context.Response.StatusCode},
                                                     ElapsedTimeMs={elapsedMilliseconds}");
            
            
        }
    }
    public static class RequestLoggerMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestLoggerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLoggerMiddleware>();
        }
    }
}
