using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.GradeModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.GradeModule;
using Newtonsoft.Json;
using SchoolApiApplication.Helper;
using SchoolApiApplication.DTO.StudentModule;

namespace SchoolApiApplication.Repository.Services.GradeModule
{
    public class GradeRepository : IGradeRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GradeRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetGradeList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspGradeGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<GradeDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<GradeDto> GetGradeData(int? GradeId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            return await db.QueryFirstOrDefaultAsync<GradeDto>("uspGradeSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<GradeUpdateRespose> GradeDataUpsert(GradeDto GradeObj, int UserId)
        {
            
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeObj.GradeId);
            parameters.Add("@GradeName", GradeObj.GradeName);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<GradeUpdateRespose>("uspGradeUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<GradeDeleteRespose> GradeDataDelete(int GradeId, int AcademicYearId, int UserId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<GradeDeleteRespose>("uspGradeDelete", parameters, commandType: CommandType.StoredProcedure);
        }

    }
}
