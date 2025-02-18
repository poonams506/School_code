using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ClassTeacherDataModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ClassTeacherAttendanceModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ClassTeacherAttendanceModule
{
    public class ClassTeacherDataRepository : IClassTeacherDataRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClassTeacherDataRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ClassTeacherDataDto> GetClassTeacherData(int AcademicYearId, int UserId)
        {
            var classTeacherDataDto = new ClassTeacherDataDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspClassTeacherDataSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                var result = multiResultSet.Read<ClassTeacherListDto>()?.ToList();
                classTeacherDataDto.GetGradeDivisionList = result == null ? new List<ClassTeacherListDto>() : result;
            }
            return classTeacherDataDto;
            
        }
    }
}
