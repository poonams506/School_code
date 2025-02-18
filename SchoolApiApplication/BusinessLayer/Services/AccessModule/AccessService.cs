using SchoolApiApplication.BusinessLayer.Interfaces.AccessModule;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.Repository.Interfaces.AccessModule;

namespace SchoolApiApplication.BusinessLayer.Services.AccessModule
{
    public class AccessService : IAccessService
    {
        private readonly IAccessRepository _AccessRepository;
        public AccessService(IAccessRepository AccessRepository)
        {
            _AccessRepository = AccessRepository;
        }
        public async Task<RoleModuleDto> GetModulesPermissions(int RoleId)
        {
            return await _AccessRepository.GetModulesPermissions(RoleId);
        }
        public async Task<long> RolePermissionUpsert(List<PermissionDto> rolePermissionModel, int UserId)
        {
            return await _AccessRepository.RolePermissionUpsert(rolePermissionModel, UserId);
        }
        public async Task<RoleMasterDto> GetRoleList()
        {
            return await _AccessRepository.GetRoleList();
        }
        public async Task<PermissionMasterDto> GetPermissionsList()
        {
            return await _AccessRepository.GetPermissionsList();
        }

        public async Task<ModuleMasterDto> GetModuleList()
        {

            return await _AccessRepository.GetModuleList();
        }

    }
}
