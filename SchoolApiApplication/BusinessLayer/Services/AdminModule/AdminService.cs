using SchoolApiApplication.BusinessLayer.Interfaces.AdminModule;
using SchoolApiApplication.DTO.AdminModule;
using SchoolApiApplication.Repository.Interfaces.AdminModule;

namespace SchoolApiApplication.BusinessLayer.Services.AdminModule
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _AdminRepository;
        public AdminService(IAdminRepository AdminRepository)
        {
            _AdminRepository = AdminRepository;
        }
        public async Task<AdminDto> GetAdminProfile(long? AdminId)
        {
            return await _AdminRepository.GetAdminProfile(AdminId);
        }
        public async Task<AdminDto> AdminProfileUpsert(AdminDto AdminObj, int UserId)
        {
            return await _AdminRepository.AdminProfileUpsert(AdminObj, UserId);
        }
        public async Task<DatatableResponseModel> GetAdminList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _AdminRepository.GetAdminList(requestObjectWrapper);
        }

        public async Task<AdminDeleteRespose> AdminProfileDelete(long? AdminId,int UserId)
        {
            return await _AdminRepository.AdminProfileDelete(AdminId, UserId);
        }
    }
}
