using Microsoft.Extensions.Caching.Memory;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.UserModule;
using System.Diagnostics;
using System.Net;

namespace SchoolApiApplication.Middleware
{
    public class TenantConfigurationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TenantConfigurationMiddleware> _logger;
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepository;
        private readonly CacheHelper _cacheHelper;
        public TenantConfigurationMiddleware(RequestDelegate next,
            IConfiguration config,
            ILogger<TenantConfigurationMiddleware> logger,
            IUserRepository userRepository,
            CacheHelper cacheHelper
            )
        {
            _next = next;
            _logger = logger;
            _config = config;
            _userRepository = userRepository;
            _cacheHelper = cacheHelper;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.HasValue &&
                (context.Request.Path.Value.Equals("/auth/weblogin", StringComparison.InvariantCultureIgnoreCase)
                || context.Request.Path.Value.Equals("/auth/applogin", StringComparison.InvariantCultureIgnoreCase)
                || context.Request.Path.Value.Equals("/auth/ForgotPassword", StringComparison.InvariantCultureIgnoreCase)
                || context.Request.Path.Value.Equals("/auth/ChangePassword", StringComparison.InvariantCultureIgnoreCase)
               || context.Request.Path.Value.StartsWith("/Uploads/school", StringComparison.InvariantCultureIgnoreCase)

                ))
            {
                await _next(context);
                
            }
            else
            {
                var schoolCode = context.User.Claims.FirstOrDefault(x => x.Type == "SchoolCode");
                if (schoolCode != null)
                {
                   string connectionString = string.Empty;
                   if (! _cacheHelper.Cache.TryGetValue(schoolCode.Value, out  connectionString))
                    {
                        connectionString = await GetTenantConnectionString(schoolCode.Value);
                        var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
                        _cacheHelper.Cache.Set(schoolCode.Value, connectionString, cacheEntryOptions);
                    }
                    
                    if (!string.IsNullOrEmpty(connectionString))
                    {
                        context.Items["SchoolDatabase"] = connectionString;
                        await _next(context);
                    }
                    else
                    {
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                        await context.Response.WriteAsync("School Code Not Found.");
                    }

                }
                else
                {
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    await context.Response.WriteAsync("School Code Not Found.");
                }
                
            }

        }

        private async Task<string> GetTenantConnectionString(string Code)
        {
            return await _userRepository.GetTenantConnectionString(Code);  
        }
    }
    public static class TenantConfigurationMiddlewareExtensions
    {
        public static IApplicationBuilder UseTenantConfigurationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TenantConfigurationMiddleware>();
        }
    }
}
