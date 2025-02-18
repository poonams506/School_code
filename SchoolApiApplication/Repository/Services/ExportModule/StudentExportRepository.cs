using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ExportModule
{
    public class StudentExportRepository : IStudentExportRepository
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentExportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseExportStudentDataDto> ExportStudentData(int AcademicYearId)
        {

            ResponseExportStudentDataDto studentExportDataDto = new ResponseExportStudentDataDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multiResultSet = await connection.QueryMultipleAsync("uspStudentExport",
                    parameters, commandType: CommandType.StoredProcedure))
                {
                    var result = multiResultSet.Read<StudentExportDataDto>()?.ToList();
                    studentExportDataDto.Students = result == null ? new List<StudentExportDataDto>() : result;

                }
            }
            return studentExportDataDto;

        }

    }
}
