using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TeacherCountPerSubjectAnalyzerModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TeacherCountPerSubjectAnalyzerModule
{
    public class TeacherCountPerSubjectAnalyzerRepository: ITeacherCountPerSubjectAnalyzerRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherCountPerSubjectAnalyzerRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<TeacherCountPerSubjectAnalyzerResponseDto> TeacherCountPerSubjectSelect(int AcademicYearId)
        {
            TeacherCountPerSubjectAnalyzerResponseDto response = new TeacherCountPerSubjectAnalyzerResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTeacherCountPerSubjectSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.GetTeacherCountPerSubjects = multiResultSet.Read<TeacherCountPerSubjectAnalyzerDto>()?.ToList() ?? new List<TeacherCountPerSubjectAnalyzerDto>();
                return response;
            }
        }
    }
}
