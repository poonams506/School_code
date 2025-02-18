using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.DTO.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentKitPaymentAnalyticsModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentKitPaymentAnalyticsModule
{
    public class StudentKitPaymentAnalyticsRepository : IStudentKitPaymentAnalyticsRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentKitPaymentAnalyticsRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId)
        {
            StudentKitPaymentAnalyticsDto studentKitPaymentAnalyticsDto = new StudentKitPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitPaymentAnalyticsDivision", parameters, commandType: CommandType.StoredProcedure))
            {
                studentKitPaymentAnalyticsDto.StudentKitPaymentAnalyticsDivision = multiResultSet.Read<StudentKitPaymentAnalyticsDivisionDto>().ToList();
                studentKitPaymentAnalyticsDto = studentKitPaymentAnalyticsDto.StudentKitPaymentAnalyticsDivision == null ? new StudentKitPaymentAnalyticsDto() : studentKitPaymentAnalyticsDto;
            }
            return studentKitPaymentAnalyticsDto;
        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsGrade(Int16 AcademicYearId)
        {
            StudentKitPaymentAnalyticsDto studentKitPaymentAnalyticsDto = new StudentKitPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitPaymentAnalyticsGrade", parameters, commandType: CommandType.StoredProcedure))
            {
                studentKitPaymentAnalyticsDto.StudentKitPaymentAnalyticsGrade = multiResultSet.Read<StudentKitPaymentAnalyticsGradeDto>().ToList();
                studentKitPaymentAnalyticsDto = studentKitPaymentAnalyticsDto.StudentKitPaymentAnalyticsGrade == null ? new StudentKitPaymentAnalyticsDto() : studentKitPaymentAnalyticsDto;
            }
            return studentKitPaymentAnalyticsDto;

        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            var studentKitPaymentAnalyticsDto = new StudentKitPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var schoolStudentKitAnalytics = await db.QueryFirstOrDefaultAsync<StudentKitPaymentAnalyticsSchoolDto>("uspStudentKitPaymentAnalyticsSchool", parameters, commandType: CommandType.StoredProcedure);
            studentKitPaymentAnalyticsDto.StudentKitPaymentAnalyticsSchool = schoolStudentKitAnalytics;
            return studentKitPaymentAnalyticsDto;
        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsStudent(short GradeId, short DivisionId, Int16 AcademicYearId)
        {
            StudentKitPaymentAnalyticsDto studentKitPaymentAnalyticsDto = new StudentKitPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitPaymentAnalyticsStudent", parameters, commandType: CommandType.StoredProcedure))
            {
                studentKitPaymentAnalyticsDto.StudentKitPaymentAnalyticsStudent = multiResultSet.Read<StudentKitPaymentAnalyticsStudentDto>().ToList();
                studentKitPaymentAnalyticsDto = studentKitPaymentAnalyticsDto.StudentKitPaymentAnalyticsStudent == null ? new StudentKitPaymentAnalyticsDto() : studentKitPaymentAnalyticsDto;
            }
            return studentKitPaymentAnalyticsDto;
        }
    }
}
