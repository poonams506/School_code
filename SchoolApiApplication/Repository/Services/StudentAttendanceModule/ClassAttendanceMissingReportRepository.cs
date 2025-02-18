using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentAttendanceModule
{
    public class ClassAttendanceMissingReportRepository : IClassAttendanceMissingReportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ClassAttendanceMissingReportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int RefId, int RoleId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@RefId", RefId);
            parameters.Add("@RoleId", RoleId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspClassAttendanceMissingReportSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var classAttendanceMissingReportResponseDto = new ClassAttendanceMissingReportResponseDto();
                var result = multiResultSet.Read<ClassAttendanceMissingReportDto>().ToList();
                classAttendanceMissingReportResponseDto.ClassAttendanceMissingList = result == null ? new List<ClassAttendanceMissingReportDto>() : result;
                return classAttendanceMissingReportResponseDto;
            }
        }

    }
}
