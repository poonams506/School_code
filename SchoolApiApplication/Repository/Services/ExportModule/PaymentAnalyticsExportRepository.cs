using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using System.Data;


namespace SchoolApiApplication.Repository.Services.ExportModule
{
    public class PaymentAnalyticsExportRepository : IPaymentAnalyticsExportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PaymentAnalyticsExportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsSchool(short AcademicYearId)
        {
            var paymentAnalyticsExportDto = new PaymentAnalyticsExportDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspPaymentAnalyticsExportSchoolwise", parameters, commandType: CommandType.StoredProcedure))
            {
                paymentAnalyticsExportDto.PaymentAnalyticsExportSchool = multiResultSet.Read<PaymentAnalyticsSchoolExportDto>().ToList();
                paymentAnalyticsExportDto = paymentAnalyticsExportDto.PaymentAnalyticsExportSchool == null ? new PaymentAnalyticsExportDto() : paymentAnalyticsExportDto;
            }
            return paymentAnalyticsExportDto;
        }
        public async Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsGrade(short AcademicYearId,short GradeId)
        {
            {
                var paymentAnalyticsExportDto = new PaymentAnalyticsExportDto();
                using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                var parameters = new DynamicParameters();
                parameters.Add("@AcademicYearId", AcademicYearId);
                parameters.Add("@GradeId", @GradeId);
                using (var multiResultSet = await db.QueryMultipleAsync("uspPaymentAnalyticsExportGradewise", parameters, commandType: CommandType.StoredProcedure))
                {
                    paymentAnalyticsExportDto.PaymentAnalyticsExportGrade = multiResultSet.Read<PaymentAnalyticsGradeExportDto>().ToList();
                    paymentAnalyticsExportDto = paymentAnalyticsExportDto.PaymentAnalyticsExportGrade == null ? new PaymentAnalyticsExportDto() : paymentAnalyticsExportDto;
                }
                return paymentAnalyticsExportDto;
            }
        }
        public async  Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsDivision(short AcademicYearId, short GradeId, short DivisionId)
        {
            {
                var paymentAnalyticsExportDto = new PaymentAnalyticsExportDto();
                using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                var parameters = new DynamicParameters();
                parameters.Add("@AcademicYearId", AcademicYearId);
                parameters.Add("@GradeId", GradeId);
                parameters.Add("@DivisionId", DivisionId);
                using (var multiResultSet = await db.QueryMultipleAsync("uspPaymentAnalyticsExportDivisionwise", parameters, commandType: CommandType.StoredProcedure))
                {
                    paymentAnalyticsExportDto.PaymentAnalyticsExportDivision = multiResultSet.Read<PaymentAnalyticsDivisionExportDto>().ToList();
                    paymentAnalyticsExportDto = paymentAnalyticsExportDto.PaymentAnalyticsExportDivision == null ? new PaymentAnalyticsExportDto() : paymentAnalyticsExportDto;
                }
                return paymentAnalyticsExportDto;
            }
        }

    }
}
