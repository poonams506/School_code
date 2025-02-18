using SchoolApiApplication.DTO.AdminModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.AdminModule
{
    public interface IAdminService
    {
        public Task<AdminDto> GetAdminProfile(long? AdminId);
        public Task<AdminDto> AdminProfileUpsert(AdminDto AdminObj, int UserId);
        public Task<DatatableResponseModel> GetAdminList(DatatableRequestWrapper requestObjectWrapper);
        public Task<AdminDeleteRespose> AdminProfileDelete(long? AdminId,int UserId);
    }
}
