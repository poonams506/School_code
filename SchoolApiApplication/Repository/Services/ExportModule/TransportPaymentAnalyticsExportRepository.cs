using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ExportModule
{
    public class TransportPaymentAnalyticsExportRepository : ITransportPaymentAnalyticsExportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TransportPaymentAnalyticsExportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsDivision(short AcademicYearId, short GradeId, short DivisionId)
        {
            {
                var transportPaymentAnalyticsExportDto = new TransportPaymentAnalyticsExportDto();
                using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                var parameters = new DynamicParameters();
                parameters.Add("@AcademicYearId", AcademicYearId);
                parameters.Add("@GradeId", GradeId);
                parameters.Add("@DivisionId", DivisionId);
                using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsExportDivisionwise", parameters, commandType: CommandType.StoredProcedure))
                {
                    transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportDivision = multiResultSet.Read<TransportPaymentAnalyticsDivisionExportDto>().ToList();
                    transportPaymentAnalyticsExportDto = transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportDivision == null ? new TransportPaymentAnalyticsExportDto() : transportPaymentAnalyticsExportDto;
                }
                return transportPaymentAnalyticsExportDto;


            }
        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsGrade(short AcademicYearId, short GradeId)
        {
            {
                var transportPaymentAnalyticsExportDto = new TransportPaymentAnalyticsExportDto();
                using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                var parameters = new DynamicParameters();
                parameters.Add("@AcademicYearId", AcademicYearId);
                parameters.Add("@GradeId", @GradeId);
                using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsExportGradeWise", parameters, commandType: CommandType.StoredProcedure))
                {
                    transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportGrade = multiResultSet.Read<TransportPaymentAnalyticsGradeExportDto>().ToList();
                    transportPaymentAnalyticsExportDto = transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportGrade == null ? new TransportPaymentAnalyticsExportDto() : transportPaymentAnalyticsExportDto;
                }
                return transportPaymentAnalyticsExportDto;
            }
        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsSchool(short AcademicYearId)
        {
            var transportPaymentAnalyticsExportDto = new TransportPaymentAnalyticsExportDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsExportSchoolWise", parameters, commandType: CommandType.StoredProcedure))
            {
                transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportSchool = multiResultSet.Read<TransportPaymentAnalyticsSchoolExportDto>().ToList();
                transportPaymentAnalyticsExportDto = transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportSchool == null ? new TransportPaymentAnalyticsExportDto() : transportPaymentAnalyticsExportDto;
            }
            return transportPaymentAnalyticsExportDto;
        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsStaffList(Int16 AcademicYearId)
        {
            var transportPaymentAnalyticsExportDto = new TransportPaymentAnalyticsExportDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentAnalyticsExportStaffList", parameters, commandType: CommandType.StoredProcedure))
            {
                transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportStaffList  = multiResultSet.Read<TransportPaymentAnalyticsStaffListExportDto>().ToList();
                transportPaymentAnalyticsExportDto = transportPaymentAnalyticsExportDto.TransportPaymentAnalyticsExportStaffList == null ? new TransportPaymentAnalyticsExportDto() : transportPaymentAnalyticsExportDto;
            }
            return transportPaymentAnalyticsExportDto;
        }
    }
}
