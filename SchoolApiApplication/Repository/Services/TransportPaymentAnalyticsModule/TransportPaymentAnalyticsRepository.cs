using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.DTO.TransportPaymentAnalyticsModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TransportPaymentAnalyticsModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TransportPaymentAnalyticsModule
{
    public class TransportPaymentAnalyticsRepository : ITransportPaymentAnalyticsRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TransportPaymentAnalyticsRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsDivision(short GradeId, short AcademicYearId)
        {
            TransportPaymentAnalyticsDto transportPaymentAnalyticsDto = new TransportPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsDivision", parameters, commandType: CommandType.StoredProcedure))
            {
                transportPaymentAnalyticsDto.TransportPaymentAnalyticsDivision = multiResultSet.Read<TransportPaymentAnalyticsDivisionDto>().ToList();
                transportPaymentAnalyticsDto = transportPaymentAnalyticsDto.TransportPaymentAnalyticsDivision == null ? new TransportPaymentAnalyticsDto() : transportPaymentAnalyticsDto;
            }
            return transportPaymentAnalyticsDto;
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsGrade(short AcademicYearId)
        {
            TransportPaymentAnalyticsDto transportPaymentAnalyticsDto = new TransportPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsGrade", parameters, commandType: CommandType.StoredProcedure))
            {
                transportPaymentAnalyticsDto.TransportPaymentAnalyticsGrade = multiResultSet.Read<TransportPaymentAnalyticsGradeDto>().ToList();
                transportPaymentAnalyticsDto = transportPaymentAnalyticsDto.TransportPaymentAnalyticsGrade == null ? new TransportPaymentAnalyticsDto() : transportPaymentAnalyticsDto;
            }
            return transportPaymentAnalyticsDto;
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsSchool(short AcademicYearId)
        {

            var transportPaymentAnalyticsDto = new TransportPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var transportSchoolAnalytics = await db.QueryFirstOrDefaultAsync<TransportPaymentAnalyticsSchoolDto>("uspTransportPaymentAnalyticsSchool", parameters, commandType: CommandType.StoredProcedure);
            transportPaymentAnalyticsDto.TransportPaymentAnalyticsSchool = transportSchoolAnalytics;
            return transportPaymentAnalyticsDto;
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStaff(short AcademicYearId)
        {
            var transportPaymentAnalyticsDto = new TransportPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var transportStaffAnalytics = await db.QueryFirstOrDefaultAsync<TransportPaymentAnalyticsStaffDto>("uspTransportPaymentAnalyticsStaff", parameters, commandType: CommandType.StoredProcedure);
            transportPaymentAnalyticsDto.TransportPaymentAnalyticsStaff = transportStaffAnalytics;
            return transportPaymentAnalyticsDto;
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStaffList(short AcademicYearId)
        {
            TransportPaymentAnalyticsDto transportPaymentAnalyticsDto = new TransportPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsExportStaffList", parameters, commandType: CommandType.StoredProcedure))
            {
                transportPaymentAnalyticsDto.TransportPaymentAnalyticsStaffList  = multiResultSet.Read<TransportPaymentAnalyticsStaffListDto>().ToList();
                transportPaymentAnalyticsDto = transportPaymentAnalyticsDto.TransportPaymentAnalyticsStaffList == null ? new TransportPaymentAnalyticsDto() : transportPaymentAnalyticsDto;
            }
            return transportPaymentAnalyticsDto;
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStudent(short GradeId, short DivisionId, short AcademicYearId)
        {
            TransportPaymentAnalyticsDto transportPaymentAnalyticsDto = new TransportPaymentAnalyticsDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsStudent", parameters, commandType: CommandType.StoredProcedure))
            {
                transportPaymentAnalyticsDto.TransportPaymentAnalyticsStudent = multiResultSet.Read<TransportPaymentAnalyticsStudentDto>().ToList();
                transportPaymentAnalyticsDto = transportPaymentAnalyticsDto.TransportPaymentAnalyticsStudent == null ? new TransportPaymentAnalyticsDto() : transportPaymentAnalyticsDto;
            }
            return transportPaymentAnalyticsDto;
        }

    }
}

