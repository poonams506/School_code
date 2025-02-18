using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.PromoteModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.PromoteModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.PromoteModule
{
    public class PromoteRepository : IPromoteRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PromoteRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<List<PromoteGridDto>> GetPromoteGridList(PromoteGridRequestDto requestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@GradeId", requestDto.GradeId);
            parameters.Add("@DivisionId", requestDto.DivisionId);
            var promoteGridDto = new List<PromoteGridDto>();
            using (var multiResultSet = await db.QueryMultipleAsync("uspPromoteGridSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<PromoteGridDto>()?.ToList();
                promoteGridDto = result == null ? new List<PromoteGridDto>() : result;
            }
            foreach (var item in promoteGridDto)
            {
                if(item.IsPassed == true)
                {
                    item.StatusId = 1;
                }
                else if (item.IsPassed == false)
                {
                    item.StatusId = 2;
                }
                else
                {
                    item.StatusId = 0;
                }
                if(item.PromotedAcademicYearId > 0)
                {
                    item.StatusId = 3;
                }
            }
            return promoteGridDto;
        }

        public async Task<bool> StudentPassOrFailUpdate(List<PromoteGridDto> lstPromoteList, int academicYearId, string action, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@IsPass", action == "Pass" ? true : false);
            parameters.Add("@StudentListString", string.Join(",",lstPromoteList.Select(x=>x.StudentId)));
            parameters.Add("@UserId", UserId);
            var promoteGridDto = new List<PromoteGridDto>();
            await db.ExecuteAsync("uspStudentPassOrFailUpdate", parameters, commandType: CommandType.StoredProcedure);
            return true;
        }

        public async Task<bool> PromoteStudentToNextYear(List<PromoteGridDto> lstPromoteList, int nextAcademicYearId, int academicYearId, int gradeId, int divisionId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@NextAcademicYearId", nextAcademicYearId);
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@GradeId", gradeId);
            parameters.Add("@DivisionId", divisionId);
            parameters.Add("@StudentListString", string.Join(",", lstPromoteList.Select(x => x.StudentId)));
            parameters.Add("@UserId", UserId);
            var promoteGridDto = new List<PromoteGridDto>();
            await db.ExecuteAsync("uspPromoteStudentToNextYearUpdate", parameters, commandType: CommandType.StoredProcedure);
            return true;
        }
    }
}
