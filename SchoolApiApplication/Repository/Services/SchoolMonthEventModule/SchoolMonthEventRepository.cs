using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SchoolMonthEventModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.SchoolMonthEventModule
{
    public class SchoolMonthEventRepository : ISchoolMonthEventRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SchoolMonthEventRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId); 

            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolEventMonthlyStaffSelect", parameters, commandType: CommandType.StoredProcedure))
            {
               var schoolMonthEventResponseDto = new SchoolMonthEventResponseDto();
                var result = multiResultSet.Read<SchoolMonthEventDto>().ToList();
                schoolMonthEventResponseDto.SchoolMonthEventList = result == null ? new List<SchoolMonthEventDto>(): result;
                return schoolMonthEventResponseDto;
            }
        }



       
    }
}
