using DocumentFormat.OpenXml.Office2010.Excel;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolModule;
using SchoolApiApplication.DTO.UserModule;
using SchoolApiApplication.Repository.Interfaces.UserModule;

namespace SchoolApiApplication.BusinessLayer.Services.UserModule
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<string> GetTenantConnectionString(string Code)
        {
            return await _userRepository.GetTenantConnectionString(Code);
        }
        public async Task<string> GetPasswordSaltByUsername(string Username)
        {
            return await _userRepository.GetPasswordSaltByUsername(Username);
        }
        public async Task<List<string>> GetAllOneTimePasswordByUsername(string Username)
        {
            return await _userRepository.GetAllOneTimePasswordByUsername(Username);
        }
        public async Task<string> GetPasswordSaltByUserId(int UserId)
        {
            return await _userRepository.GetPasswordSaltByUserId(UserId);
        }
        public async Task<int> IsValidUser(string Username, string HashedPassword, string UnHashedpassword, List<string> allOneTimePassword)
        {
            return await _userRepository.IsValidUser(Username, HashedPassword, UnHashedpassword, allOneTimePassword);
        }
		public async Task<int> IsUsernameValid(string Username)
		{
			return await _userRepository.IsUsernameValid(Username);
		}
		public async Task<UserDto> GetUserById(int Id)
        {
            return await _userRepository.GetUserById(Id);
        }
        public async Task<SchoolDto> GetSchoolDetailsByCode(string schoolCode)
        {
            return await _userRepository.GetSchoolDetailsByCode(schoolCode);
        }
        public async Task<UserRoleModulePermissionDto> GetUserRoleModulePermissionById(int Id, int? roleId)
        {
            return await _userRepository.GetUserRoleModulePermissionById(Id, roleId);
        }

        public async Task<bool> SaveResetPasswordDetails(ResetPasswordSaveDto resetPasswordSaveDto)
        {
			return await _userRepository.SaveResetPasswordDetails(resetPasswordSaveDto);
		}

        public async Task<int> IsResetPasswordTokenValid(string Token, DateTime CurrentDate)
        {
            return await _userRepository.IsResetPasswordTokenValid(Token, CurrentDate);
        }

        public async Task<bool> ResetPassword(ResetPasswordRequestDto resetPasswordRequestDto)
        {
            return await _userRepository.ResetPassword(resetPasswordRequestDto);
        }
        public async Task<string> ResetPasswordByAdmin(string UserName, int RoleId)
        {
            return await _userRepository.ResetPasswordByAdmin(UserName, RoleId);
        }

        public async Task<int> SaveFCMToken(int UserId, string FCMToken)
        {
            return await _userRepository.SaveFCMToken(UserId, FCMToken);
        }

        public async Task<List<FCMUserList>> GetAllFCMTokenUsers(int RoleId, int classId = 0, int gradeId = 0, int divisionId = 0,
           string StudentIds = "", string TeacherIds = "", string ClerkIds ="", string CabDriverIds="")
        {
            return await _userRepository.GetAllFCMTokenUsers(RoleId, classId, gradeId, divisionId,
                StudentIds, TeacherIds, ClerkIds, CabDriverIds);
        }

    }
}
