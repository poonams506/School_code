using SchoolApiApplication.BusinessLayer.Interfaces.ClerkModule;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.Repository.Interfaces.ClerkModule;

namespace SchoolApiApplication.BusinessLayer.Services.ClerkModule
{
    public class ClerkService : IClerkService
    {
        private readonly IClerkRepository _ClerkRepository;
        public ClerkService(IClerkRepository ClerkRepository)
        {
            _ClerkRepository = ClerkRepository;
        }
        public async Task<ClerkDto> GetClerkProfile(long? ClerkId)
        {
            return await _ClerkRepository.GetClerkProfile(ClerkId);
        }
        public async Task<ClerkDto> ClerkProfileUpsert(ClerkDto ClerkObj, int UserId)
        {
            return await _ClerkRepository.ClerkProfileUpsert(ClerkObj, UserId);
        }
        public async Task<DatatableResponseModel> GetClerkList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _ClerkRepository.GetClerkList(requestObjectWrapper);
        }

        public async Task<ClerkDeleteRespose> ClerkProfileDelete(long? ClerkId, int UserId)
        {
            return await _ClerkRepository.ClerkProfileDelete(ClerkId, UserId);
        }
    }
}
