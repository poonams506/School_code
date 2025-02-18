namespace SchoolApiApplication.DTO.AccessModule
{
    public class ModuleMasterDto
    {
        public List<ModuleDto> Modules { get; set; }=new List<ModuleDto>();
    }

    public class ModuleDto
    {
        public int ModuleId { get; set; }
        public string ModuleName { get; set; } = string.Empty;
        public string ModuleKey { get; set; } = string.Empty;
        public string? MenuUrl { get; set; }
    }

    public class RoleMasterDto
    {
        public List<RoleModuleDto>? Roles { get; set; }
    }

    public class RoleModuleDto
    {
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? RoleNameKey { get; set; }
        public List<ModulePermissionDto>? Modules { get; set; }

    }
    public class ModulePermissionDto
    {
        public int ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public string? ModuleNameKey { get; set; }
        public string? MenuUrl { get; set; }
        public List<PermissionDto>? ModulePermissions { get; set; }
    }

    public class PermissionDto
    {
        public int ModuleId { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public string? PermissionName { get; set; }
        public string? PermissionNameKey { get; set; }
        public bool? IsChecked { get; set; }    

    }
    public class PermissionMasterDto
    {
        public List<PermissionDto>? Permissions { get; set; }
    }

}
