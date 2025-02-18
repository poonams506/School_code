using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolModule;
using SchoolApiApplication.DTO.UserModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.UserModule
{
    public interface IUserService
    {
        Task<string> GetTenantConnectionString(string Code);
        Task<string> GetPasswordSaltByUsername(string Username);
        Task<List<string>> GetAllOneTimePasswordByUsername(string Username);
        Task<string> GetPasswordSaltByUserId(int UserId);
        Task<int> IsValidUser(string Username, string HashedPassword, string UnHashedpassword, List<string> allOneTimePassword);
		 Task<int> IsUsernameValid(string Username);
        
		 Task<UserDto> GetUserById(int Id);
        Task<UserRoleModulePermissionDto> GetUserRoleModulePermissionById(int Id, int? roleId);
        Task<SchoolDto> GetSchoolDetailsByCode(string schoolCode);
        Task<bool> SaveResetPasswordDetails(ResetPasswordSaveDto resetPasswordSaveDto);
        Task<int> IsResetPasswordTokenValid(string Token,DateTime CurrentDate);
        Task<bool> ResetPassword(ResetPasswordRequestDto resetPasswordRequestDto);
        Task<string> ResetPasswordByAdmin(string UserName, int RoleId);
        Task<int> SaveFCMToken(int UserId, string FCMToken);
        Task<List<FCMUserList>> GetAllFCMTokenUsers(int RoleId, int classId = 0, int gradeId = 0, int divisionId = 0,
            string StudentIds = "", string TeacherIds = "", string ClerkIds = "", string CabDriverIds = "");
    }
}
