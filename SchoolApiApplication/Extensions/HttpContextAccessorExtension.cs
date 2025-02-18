using Microsoft.IdentityModel.Tokens;

namespace SchoolApiApplication.Extensions
{
    public static class HttpContextAccessorExtension
    {
        public static string GetSchoolDBConnectionString(this IHttpContextAccessor httpContextAccessor)
        {
            if (httpContextAccessor == null || httpContextAccessor?.HttpContext==null)
            {
                throw new ArgumentNullException("School DB Connectionstring Not Found.");
            }
            if (string.IsNullOrEmpty(httpContextAccessor.HttpContext.Items["SchoolDatabase"] as string))
            {
                throw new ArgumentNullException("School DB Connectionstring Not Found.");
            }
            return httpContextAccessor.HttpContext.Items["SchoolDatabase"] as string ?? string.Empty;
           
            
        }
    }
}
