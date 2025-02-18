using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TeachingLoadAnalysisModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TeachingLoadAnalysisModule
{
    public class TeachingLoadAnalysisRepository : ITeachingLoadAnalysisRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeachingLoadAnalysisRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<TeachingLoadAnalysisResponseDto> TeacherPercentageSelect(int AcademicYearId)
        {
            TeachingLoadAnalysisResponseDto response = new TeachingLoadAnalysisResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("UspTeachingLoadAnalysisSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.TeacherPercentageList = multiResultSet.Read<TeachingLoadAnalysisDto>()?.ToList() ?? new List<TeachingLoadAnalysisDto>();
                return response;
            }
        }
    }
}
