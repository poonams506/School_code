using Dapper;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.SchoolVacationModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SchoolVacationModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.SchoolVacationModule
{
    public class SchoolVacationRepository : ISchoolVacationRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SchoolVacationRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DatatableResponseModel> SchoolVacationDetails(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSchoolVacationGridSelect",
                    new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<SchoolVacationDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<SchoolVacationDto> GetSchoolVacationSelect(long? SchoolVacationId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolVacationId", SchoolVacationId);
            return await db.QueryFirstOrDefaultAsync<SchoolVacationDto>("uspSchoolVacationSelect ", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> SchoolVacationDelete(long? SchoolVacationId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolVacationId", SchoolVacationId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspSchoolVacationDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> UpdateSchoolVacation(SchoolVacationDto Obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", Obj.AcademicYearId);
            parameters.Add("@SchoolVacationId", Obj.SchoolVacationId);
            parameters.Add("@VacationName", Obj.VacationName);
            parameters.Add("@StartDate", Obj.StartDate);
            parameters.Add("@EndDate", Obj.EndDate);
            parameters.Add("@UserId", UserId);

            return await db.ExecuteAsync("uspSchoolVacationUpsert", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
