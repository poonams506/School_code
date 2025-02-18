using SchoolApiApplication.DTO.AccessModule;

namespace SchoolApiApplication.Repository.Interfaces.AccessModule
{
    public interface IAccessRepository
    {
        public Task<long> RolePermissionUpsert(List<PermissionDto> rolePermissionModel, int UserId);
        public Task<RoleModuleDto> GetModulesPermissions(int RoleId);
        public Task<RoleMasterDto> GetRoleList();
        public Task<PermissionMasterDto> GetPermissionsList();
        public Task<ModuleMasterDto> GetModuleList();
    }

}
