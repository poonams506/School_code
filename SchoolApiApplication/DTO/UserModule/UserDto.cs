using Microsoft.Identity.Client;

namespace SchoolApiApplication.DTO.UserModule
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string? Uname { get; set; }
        public bool? IsFirstTimeLogin { get; set; }
    }
    public class UserRoleModulePermissionDto
    {
        public string? LogoUrl { get; set; }
        public int UserId { get; set; }
        public string? Uname { get; set; }
        public int? AcademicYearId { get; set; }
        public string? SchoolCode { get; set; }
        public string? SchoolName { get; set; }
        public int? SchoolId { get; set; }
        public int? RefId { get; set; }
        public int? UserIdByRole { get; set; }
        public string UserFullNameByRole { get; set; } = string.Empty;
        public string ProfileImageURL { get; set; } = string.Empty;
        public List<UserRoleDetailDto>? RoleDetails { get; set; }
    }
    public class Permission
    {
        public int PermissionId { get; set; }
        public string? PermissionName{ get; set; }
        public string? PermissionKey { get; set; }
    }
    public class Module
    {
        public int ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public string? ModuleKey { get; set; }
        public int? MenuTypeId { get; set; }
        public string? MenuUrl { get; set; }
        public string? MenuIcon { get; set; }
        public int MenuSort { get; set; }
        public List<Permission>? AllowedPermissions{ get; set; }
        public List<Module>? ChildModules { get; set; }
    }
    public class UserRoleDetailDto
    {
        public int? RefId { get; set; }
        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? RoleKey { get; set; }
        public List<Module>? AllowedModules { get; set; }
    }

    public class UserRoleDetailDBDto
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string? Uname { get; set; }
        public string? RoleName { get; set; }
        public string? RoleKey { get; set; }
        public int? RefId { get; set; }
    }

    public class SchoolDetailDBDto
    {
        public string LogoUrl { get; set; } = string.Empty;
        public int? AcademicYearId { get; set; }
        public string? SchoolCode { get; set; }
        public string? SchoolName { get; set; }
        public int? SchoolId { get; set; }
    }

    public class UserRoleFullNameDBDto
    {
        public int UserIdByRole { get; set; }
        public string UserFullNameByRole { get; set; }= string.Empty;
        public string ProfileImageURL { get; set; } = string.Empty;
    }

    public class UserModuleDetailDBDto
    {
        public int? RefId { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public string? PermissionName { get; set; }
        public string? PermissionKey { get; set; }
        public int ModuleId { get; set; }
        public string? ModuleName { get; set; }
        public string? ModuleKey { get; set; }
        public int? MenuTypeId { get; set; }
        public string? MenuUrl { get; set; }
        public string? MenuIcon { get; set; }
        public int MenuSort { get; set; }
        public int? ParentId { get; set; }

    }

    public class UserRolesDto
    {
        public int? RoleId { get; set; }
        public string? RoleName { get; set; }
        public string? RoleKey { get; set; }
        public int? RefId { get; set; }
    }

    public class UserLoginResponse
    {
        public int? AcademicYearId { get; set; }
        public string? SchoolName { get; set; }
        public string? LangaugeCode { get; set; }
        public string Token { get; set; } = "";
        public bool IsFirstTimeLogin { get; set; } = false;
        public List<UserRolesDto> Roles { get; set; } = new List<UserRolesDto>();
        public ResetPasswordRequestDto resetPasswordObj { get; set; }= new ResetPasswordRequestDto();
       
    }
}
