using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentAttendanceModuleModule
{
    public class StudentAttendanceRepository : IStudentAttendanceRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentAttendanceRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<StudentAttendanceGridResponseDto> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto)
        {
            // var studentAttendanceGridDto = new List<StudentAttendanceGridDto>();
            StudentAttendanceGridResponseDto studentAttendanceGridDto = new StudentAttendanceGridResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters1 = new DynamicParameters();
            parameters1.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters1.Add("@AttendanceDate", requestDto.AttendanceDate);
            var result1 = await db.QueryFirstOrDefaultAsync<int>("uspAttendanceHolidayExitSelect", parameters1, commandType: CommandType.StoredProcedure);

            
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@GradeId", requestDto.GradeId);
            parameters.Add("@DivisionId", requestDto.DivisionId);
            parameters.Add("@AttendanceDate", requestDto.AttendanceDate);
            //var studentAttendanceGridDto = new List<StudentAttendanceGridDto>();
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentAttendanceGridSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<StudentAttendanceGridDto>()?.ToList();
                studentAttendanceGridDto.StudentAttendancesList= result == null ? new List<StudentAttendanceGridDto>() : result;
                studentAttendanceGridDto.IsSchoolHoliday = result1;
            }
            return studentAttendanceGridDto;
        }

        public async Task<int> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto studentAttendanceObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable projectsDT = new();
            projectsDT.Columns.Add(nameof(StudentAttendanceUpsertListDto.StudentId), typeof(Int64));
            projectsDT.Columns.Add(nameof(StudentAttendanceUpsertListDto.StatusId), typeof(Byte));
            projectsDT.Columns.Add(nameof(StudentAttendanceUpsertListDto.Reason), typeof(string));
            studentAttendanceObj.StudentAttendanceUpsertLists.ForEach(permission =>
            {
                var row = projectsDT.NewRow();
                row[nameof(StudentAttendanceUpsertListDto.StudentId)] = permission.StudentId;
                row[nameof(StudentAttendanceUpsertListDto.StatusId)] = permission.StatusId;
                row[nameof(StudentAttendanceUpsertListDto.Reason)] = permission.Reason;

                projectsDT.Rows.Add(row);
            });
            var parameters = new
            {
                studentAttendanceObj.AcademicYearId,
                studentAttendanceObj.GradeId,
                studentAttendanceObj.DivisionId,
                studentAttendanceObj.AttendanceDate,
                UserId,
                StudentIds = projectsDT.AsTableValuedParameter("[dbo].[StudentAttendanceType]")
            };
            return await db.ExecuteAsync("uspStudentAttendanceUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<TeacherDropdownResponseDto> GetAllTeacherForDropDown()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var teacherList = await db.QueryAsync<TeacherDropDownDto>("uspTeacherDropdownSelect", commandType: CommandType.StoredProcedure);
            TeacherDropdownResponseDto responseDto = new TeacherDropdownResponseDto();
            if(teacherList != null && teacherList.Any())
            {
                responseDto.TeacherDropdownList=teacherList.ToList();   
            }
            return responseDto;
        }

        public async Task<StudentAttendanceMobileResponseDto> GetAttendanceDetailByStudentId(long StudentId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new
            {
                StudentId,
                AcademicYearId
            };
            var attendanceList = await db.QueryAsync<StudentAttendanceMobileDto>("uspStudentAttendanceMobileAppSelect", parameters, commandType: CommandType.StoredProcedure);
            StudentAttendanceMobileResponseDto responseDto = new StudentAttendanceMobileResponseDto();
            if (attendanceList != null && attendanceList.Any())
            {
                responseDto.LstStudentAttendance = attendanceList.ToList();
            }
            return responseDto;
        }

    }
    
}

