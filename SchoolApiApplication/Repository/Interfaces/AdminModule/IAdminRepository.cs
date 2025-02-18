using SchoolApiApplication.DTO.AdminModule;

namespace SchoolApiApplication.Repository.Interfaces.AdminModule
{
    public interface IAdminRepository
    {
        public Task<AdminDto> GetAdminProfile(long? AdminId);
        public Task<AdminDto> AdminProfileUpsert(AdminDto AdminObj, int UserId);
        public Task<DatatableResponseModel> GetAdminList(DatatableRequestWrapper requestObjectWrapper);
        public Task<AdminDeleteRespose> AdminProfileDelete(long? AdminId, int UserId);
    }

}
