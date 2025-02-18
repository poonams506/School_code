using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.UserModule;
using SchoolApiApplication.Repository.Interfaces.UserModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Helper;
using NJsonSchema;
using SchoolApiApplication.DTO.SchoolModule;
using DocumentFormat.OpenXml.Office2010.Excel;
using SchoolApiApplication.DTO.MasterModule;
using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.DTO.CommonModule;
namespace SchoolApiApplication.Repository.Services.UserModule
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserRepository(IHttpContextAccessor httpContextAccessor, IConfiguration config)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<string> GetTenantConnectionString(string Code)
        {
            using IDbConnection db = new SqlConnection(_config.GetConnectionString("SchoolDatabase"));
            var parameters = new DynamicParameters();
            parameters.Add("@Code", Code);
            return await db.QueryFirstOrDefaultAsync<string>("uspSchoolConnectionStringSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<string> GetPasswordSaltByUsername(string Username)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Username", Username);
            return await db.QueryFirstOrDefaultAsync<string>("uspUserPasswordSaltSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<List<string>> GetAllOneTimePasswordByUsername(string Username)
        {
            var result = new List<string>();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Username", Username);
            using (var multiResultSet = await db.QueryMultipleAsync("uspAllOneTimePasswordSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var users = await multiResultSet.ReadAsync<string>();
                result = users.ToList();
            }
            
            return result;
         }

        public async Task<int> IsValidUser(string Username, string HashedPassword, string UnHashedpassword, List<string> allOneTimePassword)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Username", Username);
            parameters.Add("@Hashedpassword", HashedPassword);
            parameters.Add("@UnHashedpassword", UnHashedpassword);
            parameters.Add("@AllOneTimePassword", string.Join(",", allOneTimePassword));
            return await db.QueryFirstOrDefaultAsync<int>("uspUserValid", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> IsUsernameValid(string Username)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Username", Username);
            return await db.QueryFirstOrDefaultAsync<int>("uspUsernameValid", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<UserDto> GetUserById(int Id)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Id", Id);
            return await db.QueryFirstOrDefaultAsync<UserDto>("uspUserUnameSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<SchoolDto> GetSchoolDetailsByCode(string schoolCode)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolCode", schoolCode);
            return await db.QueryFirstOrDefaultAsync<SchoolDto>("uspSchoolLanguageSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<UserRoleModulePermissionDto> GetUserRoleModulePermissionById(int Id, int? roleId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Id", Id);
            if(roleId > 0)
            {
                parameters.Add("@RoleId", roleId);
            }
            
            using (var multiResultSet = await db.QueryMultipleAsync("uspUserInfoSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var userRoleDetail = await multiResultSet.ReadAsync<UserRoleDetailDBDto>();
                var userModuleDetail = await multiResultSet.ReadAsync<UserModuleDetailDBDto>();
                var userSchoolDetail = await multiResultSet.ReadAsync<SchoolDetailDBDto>();
                var userIdByRoleList = await multiResultSet.ReadAsync<UserRoleFullNameDBDto>();
                var userRoleModulePermissionDto = new UserRoleModulePermissionDto();
                if (userRoleDetail != null)
                {
                    userRoleModulePermissionDto.UserId = userRoleDetail.Select(x => x.UserId).First();
                    userRoleModulePermissionDto.Uname = userRoleDetail.Select(x => x.Uname).First();
                    userRoleModulePermissionDto.AcademicYearId = userSchoolDetail.Select(x => x.AcademicYearId).FirstOrDefault();
                    userRoleModulePermissionDto.SchoolCode=userSchoolDetail.Select(x => x.SchoolCode).FirstOrDefault();
                    userRoleModulePermissionDto.SchoolName = userSchoolDetail.Select(x => x.SchoolName).FirstOrDefault();
                    userRoleModulePermissionDto.SchoolId = userSchoolDetail.Select(x => x.SchoolId).FirstOrDefault();
                    userRoleModulePermissionDto.LogoUrl = userSchoolDetail.Select(x => x.LogoUrl).FirstOrDefault();
                    userRoleModulePermissionDto.RoleDetails = userRoleDetail.Select(
                    x => new UserRoleDetailDto
                    {
                        RoleId = x.RoleId,
                        RoleName = x.RoleName,
                        RoleKey = x.RoleKey,
                        RefId = x.RefId,
                        AllowedModules = BuildModuleHierarchy(userModuleDetail.Where(x => x.RoleId == x.RoleId)?.ToList() ?? new List<UserModuleDetailDBDto>(), null).ChildModules
                    }).ToList();
                    if(userIdByRoleList!=null && userIdByRoleList.Any())
                    {
                        userRoleModulePermissionDto.UserIdByRole = userIdByRoleList.First().UserIdByRole;
                        userRoleModulePermissionDto.UserFullNameByRole = userIdByRoleList.First().UserFullNameByRole;
                        userRoleModulePermissionDto.ProfileImageURL = userIdByRoleList.First().ProfileImageURL;
                    }
                }
                return userRoleModulePermissionDto;
            }

        }

        public async Task<bool> SaveResetPasswordDetails(ResetPasswordSaveDto resetPasswordSaveDto)
        {
			using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
			var parameters = new DynamicParameters();
			parameters.Add("@UserId", resetPasswordSaveDto.UserId);
			parameters.Add("@Token", resetPasswordSaveDto.Token);
			parameters.Add("@ExpirationDate", resetPasswordSaveDto.ExpirationDate);
			return await db.QuerySingleOrDefaultAsync<bool>("uspUserResetPasswordInsert", parameters, commandType: CommandType.StoredProcedure);
		}

        public async Task<int> IsResetPasswordTokenValid(string Token, DateTime CurrentDate)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Token", Token);
            parameters.Add("@CurrentDate", CurrentDate);
            return await db.QuerySingleOrDefaultAsync<int>("uspUserResetPasswordTokenValid", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<bool> ResetPassword(ResetPasswordRequestDto resetPasswordRequestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@Password", resetPasswordRequestDto.Password);
            parameters.Add("@UserId", resetPasswordRequestDto.UserId);
            parameters.Add("@Token",resetPasswordRequestDto.Token);
            return await db.QuerySingleOrDefaultAsync<bool>("uspUserPasswordUpdate", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<string> ResetPasswordByAdmin(string UserName, int RoleId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();

            string oneTimePassword = "";
            var parametersOneTimePW = new DynamicParameters();
            parametersOneTimePW.Add("@UserName", UserName);
            parametersOneTimePW.Add("@RoleId", RoleId);
            oneTimePassword = await db.QuerySingleOrDefaultAsync<string>("uspUserOneTimePasswordSelect", parametersOneTimePW, commandType: CommandType.StoredProcedure);

            string salt = PasswordHelper.GenerateSalt(4);
            parameters.Add("@PasswordSalt", salt);
            parameters.Add("@UserName", UserName);
            if (oneTimePassword != null)
            {
                parameters.Add("@Upassword", PasswordHelper.HashPassword(Convert.ToString(oneTimePassword), salt));
            }
            await db.QuerySingleOrDefaultAsync<string>("uspOneTimePasswordReset", parameters, commandType: CommandType.StoredProcedure);
            return oneTimePassword;
        }


        public async Task<string> GetPasswordSaltByUserId(int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<string>("uspUserPasswordSaltByUserIdSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> SaveFCMToken(int UserId, string FCMToken)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", UserId);
            parameters.Add("@FCMToken", FCMToken);
            return await db.ExecuteAsync("uspUserFCMTokenUpdate", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<List<FCMUserList>> GetAllFCMTokenUsers(int RoleId, int classId = 0, int gradeId = 0, int divisionId = 0,
            string StudentIds = "", string TeacherIds = "", string ClerkIds = "", string CabDriverIds = "")
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RoleId", RoleId);
            parameters.Add("@ClassId", classId);
            parameters.Add("@GradeId", gradeId);
            parameters.Add("@DivisionId", divisionId);
            parameters.Add("@StudentIds", StudentIds);
            parameters.Add("@TeacherIds", TeacherIds);
            parameters.Add("@ClerkIds", ClerkIds);
            parameters.Add("@CabDriverIds", CabDriverIds);
            var lstFCMUsers= await db.QueryAsync<FCMUserList>("uspUserWithFCMTokenSelect", parameters, commandType: CommandType.StoredProcedure);
            return lstFCMUsers.ToList();
        }

        private  Module BuildModuleHierarchy(List<UserModuleDetailDBDto> modules, int? parentId)
        {
            Module module = new Module();
            module.ChildModules = new List<Module>();
            var groupByResult = modules.GroupBy(x => x.ModuleId);
            foreach (var item in groupByResult.Where(x => x.First().ParentId == parentId))
            {
                Module child = BuildModuleHierarchy(modules, item.First().ModuleId);
                child.ModuleId = item.First().ModuleId;
                child.ModuleName = item.First().ModuleName; 
                child.ModuleKey = item.First().ModuleKey;
                child.MenuUrl = item.First().MenuUrl;   
                child.MenuTypeId = item.First().MenuTypeId; 
                child.MenuSort= item.First().MenuSort;
                child.MenuIcon= item.First().MenuIcon;
                child.AllowedPermissions = modules.Where(x => x.ModuleId == item.First().ModuleId).Select(x => new Permission
                {
                    PermissionId = x.PermissionId,  
                    PermissionName  = x.PermissionName,
                    PermissionKey = x.PermissionKey,
                })?.ToList()??new List<Permission>();
                module.ChildModules.Add(child);
            }
            return module;
        }
    }
}
