using Dapper;
using DocumentFormat.OpenXml.Office2016.Drawing.Command;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.MobileAppModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.MobileAppModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.MobileAppModule
{
    public class CommonAppRepository:ICommonAppRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CommonAppRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<SchoolDetailMobileDto> GetSchoolDetail()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            return await db.QueryFirstOrDefaultAsync<SchoolDetailMobileDto>("uspSchoolAppDetailSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<StudentDetailMobileResponseDto> GetStudentsByUserId(int UserId,int AcademicYearId)
        {
            StudentDetailMobileResponseDto responseDto = new StudentDetailMobileResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", UserId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            var lstStudent= await db.QueryAsync<StudentDetailMobileDto>("uspStudentAppDetailSelectByParentId", parameters, commandType: CommandType.StoredProcedure);
            lstStudent ??= new List<StudentDetailMobileDto>();
            responseDto.LstStudents = lstStudent.GroupBy(x=>x.StudentId).Select(y=> y.First()).ToList();
            return responseDto;
        }
    }
}
