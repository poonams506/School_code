using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TeacherOneDayLectureModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TeacherOneDayLectureModule
{
    public class TeacherOneDayLectureRepository : ITeacherOneDayLectureRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherOneDayLectureRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<TeacherOneDayLectureResponseDto> TeacherOneDayLectureSelect(int AcademicYearId, int TeacherId, int DayNo)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@TeacherId", TeacherId);
            parameters.Add("@DayNo", DayNo);


            using (var multiResultSet = await db.QueryMultipleAsync("uspTeacherOneDayLectureSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var teacherOneDayLectureResponseDto = new TeacherOneDayLectureResponseDto();
                var result = multiResultSet.Read<TeacherOneDayLectureDto>()?.ToList();
                teacherOneDayLectureResponseDto.TeacherOneDayLectureList = result == null ? new List<TeacherOneDayLectureDto>() : result;
                return teacherOneDayLectureResponseDto;
            }
        }
    }
}
