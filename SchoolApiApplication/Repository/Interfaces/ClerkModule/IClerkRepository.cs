using SchoolApiApplication.DTO.ClerkModule;

namespace SchoolApiApplication.Repository.Interfaces.ClerkModule
{
    public interface IClerkRepository
    {
        public Task<ClerkDto> GetClerkProfile(long? ClerkId);
        public Task<ClerkDto> ClerkProfileUpsert(ClerkDto ClerkObj, int UserId);
        public Task<DatatableResponseModel> GetClerkList(DatatableRequestWrapper requestObjectWrapper);
        public Task<ClerkDeleteRespose> ClerkProfileDelete(long? ClerkId, int UserId);
    }

}
