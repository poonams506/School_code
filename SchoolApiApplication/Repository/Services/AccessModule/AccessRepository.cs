using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.AccessModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.AccessModule;

namespace SchoolApiApplication.Repository.Services.AccessModule
{
    public class AccessRepository : IAccessRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AccessRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        
        public async Task<RoleModuleDto> GetModulesPermissions(int RoleId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RoleId", RoleId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspRolePermissionSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var roleDetail = await multiResultSet.ReadAsync<RoleModuleDto>();
                var modulePermissionDetail = await multiResultSet.ReadAsync<ModulePermissionDto>();
                var permissionsDetail = await multiResultSet.ReadAsync<PermissionDto>();
                var userRoleModulePermissionDto = new RoleModuleDto();
                if (roleDetail != null)
                {
                    userRoleModulePermissionDto.RoleName = roleDetail.Select(x => x.RoleName).First();
                    userRoleModulePermissionDto.RoleNameKey = roleDetail.Select(x => x.RoleNameKey).First();
                    userRoleModulePermissionDto.RoleId = roleDetail.Select(x => x.RoleId).First();
                    userRoleModulePermissionDto.Modules = modulePermissionDetail.Select(
                    x => new ModulePermissionDto
                    {
                        ModuleId = x.ModuleId,
                        ModuleName = x.ModuleName,
                        ModuleNameKey = x.ModuleNameKey,
                        MenuUrl = x.MenuUrl,
                        ModulePermissions = permissionsDetail.Where(y=>y.ModuleId == x.ModuleId && y.RoleId == userRoleModulePermissionDto.RoleId).ToList()
                    }).ToList();
                }
                return userRoleModulePermissionDto;
            }
        }
      

        public async Task<RoleMasterDto> GetRoleList()
        {
            RoleMasterDto resultModel = new RoleMasterDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var rolesList = await connection.QueryAsync<RoleModuleDto>("uspRoleSelect", commandType: CommandType.StoredProcedure);
                if (rolesList != null)
                {
                    resultModel.Roles = rolesList.ToList();
                }
            }
            return resultModel;
        }

        public async Task<ModuleMasterDto> GetModuleList()
        {
            ModuleMasterDto resultModel = new ModuleMasterDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var moduleList = await connection.QueryAsync<ModuleDto>("uspModuleSelect", commandType: CommandType.StoredProcedure);
                if (moduleList != null)
                {
                    resultModel.Modules = moduleList.ToList();
                }
            }
            return resultModel;
        }

        public async Task<PermissionMasterDto> GetPermissionsList()
        {
            PermissionMasterDto resultModel = new PermissionMasterDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                var permissionList = await connection.QueryAsync<PermissionDto>("uspPermissionSelect", commandType: CommandType.StoredProcedure);
               if(permissionList!=null)
                {
                    resultModel.Permissions = permissionList.ToList();
                }
            }
            return resultModel;
        }

        public async Task<long> RolePermissionUpsert(List<PermissionDto> rolePermissionModel, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
           
            DataTable projectsDT = new();
            projectsDT.Columns.Add(nameof(PermissionDto.RoleId), typeof(int));
            projectsDT.Columns.Add(nameof(PermissionDto.ModuleId), typeof(int));
            projectsDT.Columns.Add(nameof(PermissionDto.PermissionId), typeof(int));
            rolePermissionModel.ForEach(permission =>
            {
                var row = projectsDT.NewRow();
                row[nameof(PermissionDto.RoleId)] = permission.RoleId;
                row[nameof(PermissionDto.ModuleId)] = permission.ModuleId;
                row[nameof(PermissionDto.PermissionId)] = permission.PermissionId;
               
                projectsDT.Rows.Add(row);
            });
            var parameters = new
            {
                RolePermission = projectsDT.AsTableValuedParameter("[dbo].[RolePermissionType]"),
                UserId
            };
            return await db.ExecuteAsync("uspRolePermissionUpsert", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
