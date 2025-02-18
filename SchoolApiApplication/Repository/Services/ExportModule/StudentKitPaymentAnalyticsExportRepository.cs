using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ExportModule
{
    public class StudentKitPaymentAnalyticsExportRepository : IStudentKitPaymentAnalyticExportsRepository
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentKitPaymentAnalyticsExportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsDivision(short AcademicYearId, short GradeId, short DivisionId)
        {
            var studentKitPaymentAnalyticsExportDto = new StudentKitPaymentAnalyticsExportDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitPaymentAnalyticsExportDivisionwise", parameters, commandType: CommandType.StoredProcedure))
            {
                studentKitPaymentAnalyticsExportDto.StudentKitPaymentAnalyticsExportDivision = multiResultSet.Read<StudentKitPaymentAnalyticsDivisionExportDto>().ToList();
                studentKitPaymentAnalyticsExportDto = studentKitPaymentAnalyticsExportDto.StudentKitPaymentAnalyticsExportDivision == null ? new StudentKitPaymentAnalyticsExportDto() : studentKitPaymentAnalyticsExportDto;
            }
            return studentKitPaymentAnalyticsExportDto;
        }

        public async Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsGrade(short AcademicYearId, short GradeId)
        {
            {
                var studentKitPaymentAnalyticsExportDto = new StudentKitPaymentAnalyticsExportDto();
                using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                var parameters = new DynamicParameters();
                parameters.Add("@AcademicYearId", AcademicYearId);
                parameters.Add("@GradeId", GradeId);
                using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitPaymentAnalyticsExportGradewise", parameters, commandType: CommandType.StoredProcedure))
                {
                    studentKitPaymentAnalyticsExportDto.StudentKitPaymentAnalyticsExportGrade = multiResultSet.Read<StudentKitPaymentAnalyticsGradeExportDto>().ToList();
                    studentKitPaymentAnalyticsExportDto = studentKitPaymentAnalyticsExportDto.StudentKitPaymentAnalyticsExportGrade == null ? new StudentKitPaymentAnalyticsExportDto() : studentKitPaymentAnalyticsExportDto;
                }
                return studentKitPaymentAnalyticsExportDto;
            }
        }

        public async Task<StudentKitPaymentAnalyticsExportDto> GetExportStudentKitPaymentAnalyticsSchool(short AcademicYearId)
        {
            var studentKitPaymentAnalyticsExportDto = new StudentKitPaymentAnalyticsExportDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitPaymentAnalyticsExportSchoolwise", parameters, commandType: CommandType.StoredProcedure))
            {
                studentKitPaymentAnalyticsExportDto.StudentKitPaymentAnalyticsExportSchool = multiResultSet.Read<StudentKitPaymentAnalyticsSchoolExportDto>().ToList();
                studentKitPaymentAnalyticsExportDto = studentKitPaymentAnalyticsExportDto.StudentKitPaymentAnalyticsExportSchool == null ? new StudentKitPaymentAnalyticsExportDto() : studentKitPaymentAnalyticsExportDto;
            }
            return studentKitPaymentAnalyticsExportDto;
        }
    }
    
}
