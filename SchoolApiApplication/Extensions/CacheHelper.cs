using Microsoft.Extensions.Caching.Memory;

namespace SchoolApiApplication.Extensions
{
    public class CacheHelper
    {
        public MemoryCache Cache { get; } = new MemoryCache(
            new MemoryCacheOptions
            {
                SizeLimit = null
            });
    }
}
