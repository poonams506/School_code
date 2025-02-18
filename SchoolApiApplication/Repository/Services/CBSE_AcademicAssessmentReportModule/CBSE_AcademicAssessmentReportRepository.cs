using Azure;
using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TransportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.CBSE_AcademicAssessmentReportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.CBSE_AcademicAssessmentReportModule
{
    public class CBSE_AcademicAssessmentReportRepository : ICBSE_AcademicAssessmentReportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CBSE_AcademicAssessmentReportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

       

        public async Task<ReportCardTempleteDropdownResponceDto> ReportCardTemplateDropdown(int AcademicYearId,int GradeId, int DivisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            var reportCardTemplateDropdownList = await db.QueryAsync<ReportCardTemplateDropdownDto>("uspReportCardTemplateDropdown", parameters, commandType: CommandType.StoredProcedure);
            ReportCardTempleteDropdownResponceDto responseDto = new ReportCardTempleteDropdownResponceDto();
            if (reportCardTemplateDropdownList != null && reportCardTemplateDropdownList.Any())
            {
                responseDto.ReportCardTemplateDropdownList = reportCardTemplateDropdownList.ToList();
            }
            return responseDto;
        }

        public async Task<CBSE_AcademicAssessmentReportDto> ResultReportSearchSelect(int AcademicYearId, int GradeId, int DivisionId, long StudentId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@StudentId", StudentId);
            return await db.QueryFirstOrDefaultAsync<CBSE_AcademicAssessmentReportDto>("uspResultReportSearchSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<ResultTempleteReportSearchResponseDto> ResultTempleteReportSearchSelect(long StudentId, int AcademicYearId, int GradeId, int DivisionId, int ExamReportCardNameId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@ExamReportCardNameId", ExamReportCardNameId);
            ResultTempleteReportSearchResponseDto responseDto = new ResultTempleteReportSearchResponseDto();
            using (var multiResultSet = await db.QueryMultipleAsync("uspResultTempleteReportSearchSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var term1 = await multiResultSet.ReadAsync<ResultTempleteReportSearchDto>();
                var term2 = await multiResultSet.ReadAsync<ResultTempleteReportSearchDto>();
                return new ResultTempleteReportSearchResponseDto()
                {
                    ExamResultListTerm1 = term1?.ToList() ?? new List<ResultTempleteReportSearchDto>(),
                    ExamResultListTerm2 = term2?.ToList() ?? new List<ResultTempleteReportSearchDto>(),
                };

            }
        }

        public async Task<StudentMonthlyAttendanceResponceDto> StudentMonthlyAttendanceSelect(int StudentId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            //return await db.QueryFirstOrDefaultAsync<StudentMonthlyAttendanceDto>("uspGetStudentMonthlyAttendance", parameters, commandType: CommandType.StoredProcedure);
            StudentMonthlyAttendanceResponceDto response = new StudentMonthlyAttendanceResponceDto();
            using (var multiResultSet = await db.QueryMultipleAsync("uspGetStudentMonthlyAttendance", parameters, commandType: CommandType.StoredProcedure))
            {

                response.StudentMonthlyAttendanceList = multiResultSet.Read<StudentMonthlyAttendanceDto>()?.ToList() ?? new List<StudentMonthlyAttendanceDto>();
                return response;
            }
        }
    }
}