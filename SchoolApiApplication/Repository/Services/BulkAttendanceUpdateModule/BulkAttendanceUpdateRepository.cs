using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.BulkAttendanceUpdateModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.BulkAttendanceUpdateModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.BulkAttendanceUpdateModule
{
    public class BulkAttendanceUpdateRepository : IBulkAttendanceUpdateRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BulkAttendanceUpdateRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<DatatableResponseModel> ClassAttendanceStatusGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspClassAttendanceStatusGridSelect",
                    new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<BulkAttendanceUpdateDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }


        public async Task<BulkSelectResponseDto> GetStudentAttendanceByMonthSelect(StudentAttendanceUpdateRequestDto request)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", request.AcademicYearId);
            parameters.Add("@GradeId", request.GradeId);
            parameters.Add("@DivisionId", request.DivisionId);
            parameters.Add("@MonthId", request.MonthId);
            parameters.Add("@YearId", request.YearId);

            using var multiResultSet = await db.QueryMultipleAsync("uspGetStudentAttendanceByMonthSelect", parameters, commandType: CommandType.StoredProcedure);
            var bulkStudentList = (await multiResultSet.ReadAsync<BulkAttentanceStudentDto>()).ToList();
            var bulkList = (await multiResultSet.ReadAsync<StudentAttendanceStatusUpdateDTO>()).ToList();

            return new BulkSelectResponseDto
            {
                BulkStudentList = bulkStudentList,
                BulkList = bulkList,
                HeaderAttendanceStatusList = bulkList.GroupBy(x => new { x.AttendanceDateTime, x.StudentId, x.StatusId })
                                                     .Select(group => group.First())
                                                     .ToList()
            };
        }

        public async Task<int?> StudentAttendanceByMonthUpsert(BulkAttendanceUpdateDto attendanceUpdate, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable attendanceDT = new();
            attendanceDT.Columns.Add(nameof(BulkAttendanceUpdateUpsertDto.StatusId), typeof(long));
            attendanceDT.Columns.Add(nameof(BulkAttendanceUpdateUpsertDto.AttendanceDateTime), typeof(DateTime));
            attendanceDT.Columns.Add(nameof(BulkAttendanceUpdateUpsertDto.StudentId), typeof(long));

            foreach (var attendance in attendanceUpdate.AttendanceStatusList)
            {
                var row = attendanceDT.NewRow();
                row[nameof(BulkAttendanceUpdateUpsertDto.StatusId)] = attendance.StatusId;
                row[nameof(BulkAttendanceUpdateUpsertDto.AttendanceDateTime)] = attendance.AttendanceDateTime;
                row[nameof(BulkAttendanceUpdateUpsertDto.StudentId)] = attendance.StudentId;

                attendanceDT.Rows.Add(row);
            }

            var parameters = new
            {
                attendanceUpdate.AcademicYearId,
                attendanceUpdate.GradeId,          
                attendanceUpdate.DivisionId,       
                attendanceUpdate.Year,           
                attendanceUpdate.MonthId,    
                UserId,
                AttendanceDataDetails = attendanceDT.AsTableValuedParameter("[dbo].[AttendanceByMonthType]")
            };

            return await db.ExecuteAsync("uspStudentAttandanceByMonthUpsert", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<AttendanceSummaryBulkResponseDto> GetAttendanceSummaryByMonthAsync(StudentAttendanceUpdateRequestDto request)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", request.AcademicYearId);
            parameters.Add("@GradeId", request.GradeId);
            parameters.Add("@DivisionId", request.DivisionId);
            parameters.Add("@MonthId", request.MonthId);
            parameters.Add("@YearId", request.YearId);

            using var multiResultSet = await db.QueryMultipleAsync("uspGetStudentAttendanceSummaryByMonth", parameters, commandType: CommandType.StoredProcedure);
            var attendanceSummaryList = (await multiResultSet.ReadAsync<StudentAttendanceSummaryDto>()).ToList();
            return new AttendanceSummaryBulkResponseDto
            {
                AttendanceSummaryList = attendanceSummaryList
            };
        }

        public async Task<int?> StatusInsert(StudentAttendanceStatusInsertDto obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", obj.AcademicYearId);
            parameters.Add("@GradeId", obj.GradeId);
            parameters.Add("@DivisionId", obj.DivisionId);
            parameters.Add("@YearId", obj.YearId);
            parameters.Add("@MonthId", obj.MonthId);
            parameters.Add("@UserId", UserId);

            return await db.ExecuteAsync("uspStudentAttendanceStatusInsert", parameters, commandType: CommandType.StoredProcedure);
        }



    }

}

