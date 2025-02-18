using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ExportModule
{
    public class TeacherExportRepository : ITeacherExportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherExportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ResponseExportTeacherDataDto> ExportTeacherData()
        {
            ResponseExportTeacherDataDto teacherExportDataDto = new ResponseExportTeacherDataDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multiResultSet = await connection.QueryMultipleAsync("uspTeacherExport",
                     commandType: CommandType.StoredProcedure))
                {
                    var result = multiResultSet.Read<TeacherExportDataDto>()?.ToList();
                    teacherExportDataDto.Teachers = result == null ? new List<TeacherExportDataDto>() : result;

                }
            }
            return teacherExportDataDto;

        }
    }
    }

