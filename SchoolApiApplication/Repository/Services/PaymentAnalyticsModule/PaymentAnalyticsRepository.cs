using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.PaymentAnalytics;
using System.Data;

namespace SchoolApiApplication.Repository.Services.PaymentAnalyticsModule
{
    public class PaymentAnalyticsRepository : IPaymentAnalyticsRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PaymentAnalyticsRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId)
        {
            PaymentAnalyticsDto paymentAnalyticsDto = new PaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspPaymentAnalyticsDivision", parameters, commandType: CommandType.StoredProcedure))
            {
                paymentAnalyticsDto.PaymentAnalyticsDivision = multiResultSet.Read<PaymentAnalyticsDivisionDto>().ToList();
                paymentAnalyticsDto = paymentAnalyticsDto.PaymentAnalyticsDivision == null ? new PaymentAnalyticsDto() : paymentAnalyticsDto;
            }
            return paymentAnalyticsDto;
        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsGrade(Int16 AcademicYearId)
        {
            PaymentAnalyticsDto paymentAnalyticsDto = new PaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspPaymentAnalyticsGrade", parameters, commandType: CommandType.StoredProcedure))
            {
                paymentAnalyticsDto.PaymentAnalyticsGrade = multiResultSet.Read<PaymentAnalyticsGradeDto>().ToList();
                paymentAnalyticsDto = paymentAnalyticsDto.PaymentAnalyticsGrade == null ? new PaymentAnalyticsDto() : paymentAnalyticsDto;
            }           
            return paymentAnalyticsDto;

        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            var paymentAnalyticsDto = new PaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var schoolAnalytics = await db.QueryFirstOrDefaultAsync<PaymentAnalyticsSchoolDto>("uspPaymentAnalyticsSchool", parameters, commandType: CommandType.StoredProcedure);
            paymentAnalyticsDto.PaymentAnalyticsSchool = schoolAnalytics;
            return paymentAnalyticsDto;
        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsStudent(short GradeId, short DivisionId , Int16 AcademicYearId)
        {
            PaymentAnalyticsDto paymentAnalyticsDto = new PaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspPaymentAnalyticsStudent", parameters, commandType: CommandType.StoredProcedure))
            {
                paymentAnalyticsDto.PaymentAnalyticsStudent = multiResultSet.Read<PaymentAnalyticsStudentDto>().ToList();
                paymentAnalyticsDto = paymentAnalyticsDto.PaymentAnalyticsStudent == null ? new PaymentAnalyticsDto() : paymentAnalyticsDto;
            }
            return paymentAnalyticsDto;
        }

    }
}
