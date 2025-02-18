using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.DivisionModule;
using Newtonsoft.Json;
using SchoolApiApplication.Repository.Interfaces.DivisionModule;

namespace SchoolApiApplication.Repository.Services.DivisionModule
{
    public class DivisionRepository : IDivisionRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DivisionRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetDivisionList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspDivisionGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<DivisionDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<DivisionDto> GetDivisionData(int? DivisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@DivisionId", DivisionId);
            return await db.QueryFirstOrDefaultAsync<DivisionDto>("uspDivisionSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<DivisionUpdateleteRespose> DivisionDataUpsert(DivisionDto DivisionObj, int UserId)
        {
            
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@DivisionId", DivisionObj.DivisionId);
            parameters.Add("@DivisionName", DivisionObj.DivisionName);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<DivisionUpdateleteRespose>("uspDivisionUpsert", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<DivisionDeleteRespose> DivisionDataDelete(int DivisionId, int academicYearId, int UserId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<DivisionDeleteRespose>("uspDivisionDelete", parameters, commandType: CommandType.StoredProcedure);
        }

    }
}
