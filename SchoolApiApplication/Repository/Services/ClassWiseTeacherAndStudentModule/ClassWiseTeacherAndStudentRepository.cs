using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ClassWiseTeacherAndStudentDto;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ClassWiseTeacherAndStudentModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ClassWiseTeacherAndStudentModule
{
    public class ClassWiseTeacherAndStudentRepository : IClassWiseTeacherAndStudentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ClassWiseTeacherAndStudentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ClassTeacherResponseDto> ClassTeacherSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspClassTeacherSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var classTeacherResponseDto = new ClassTeacherResponseDto();
                var result =await multiResultSet.ReadAsync<ClassTeacherDto>();
                classTeacherResponseDto.ClassTeacherList = result.ToList();
                return classTeacherResponseDto;
            }
        }


        public async Task<ClassWiseStudentResponseDto> ClassWiseStudentSelect(int AcademicYearId, int ClassTeacherId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ClassTeacherId", ClassTeacherId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspClassWiseStudentSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var classWiseStudentResponseDto = new ClassWiseStudentResponseDto();
                var result =await multiResultSet.ReadAsync<ClassWiseStudentDto>();
                classWiseStudentResponseDto.ClassWiseStudentList = result.ToList();
                return classWiseStudentResponseDto;
            }
        }
    }
}
