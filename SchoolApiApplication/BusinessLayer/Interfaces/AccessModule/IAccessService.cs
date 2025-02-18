using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.StudentModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.AccessModule
{
    public interface IAccessService
    {
        public Task<long> RolePermissionUpsert(List<PermissionDto> rolePermissionModel, int UserId);
        public Task<RoleModuleDto> GetModulesPermissions(int RoleId);
        public Task<RoleMasterDto> GetRoleList();
        public Task<PermissionMasterDto> GetPermissionsList();
        public Task<ModuleMasterDto> GetModuleList();
    }
}
