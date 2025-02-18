using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Extensions;
using System.Data;

namespace SchoolApiApplication.Repository.Interfaces.GradeDivisionMatrixModule
{
    public class GradeDivisionMatrixRepository: IGradeDivisionMatrixRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GradeDivisionMatrixRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<GradeDivisionMatrixDto> GetGradeDivisionMatrixData(int? GradeId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            var gradeDivisions=  await db.QueryAsync<GradeDivisionMatrixDBDto>("uspSchoolGradeDivisionMatrixSelect", parameters, commandType: CommandType.StoredProcedure);
            var gradeDivisionMatrix = new GradeDivisionMatrixDto();
            if (gradeDivisions!=null && gradeDivisions.Count() > 0) 
            {
                gradeDivisionMatrix.GradeId = gradeDivisions.First().GradeId;
                gradeDivisionMatrix.GradeName = gradeDivisions.First().GradeName;
                foreach (var gradedivision in gradeDivisions)
                {
                    gradeDivisionMatrix.DivisionId.Add(gradedivision.DivisionId);
                }
            }
            return gradeDivisionMatrix;
        }
        public async Task<int> GradeDivisionMatrixDataUpsert(GradeDivisionMatrixDto GradeDivisionObj, int UserId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable projectsDT = new();
            projectsDT.Columns.Add(nameof(GradeDivisionMatrixDto.DivisionId), typeof(int));
            GradeDivisionObj.DivisionId.ForEach(divisionId =>
            {
                var row = projectsDT.NewRow();
                row[nameof(GradeDivisionMatrixDto.DivisionId)] = divisionId;

                projectsDT.Rows.Add(row);
            });
            var parameters = new
            {
                AcademicYearId,
                GradeDivisionObj.GradeId,
                Divisions = projectsDT.AsTableValuedParameter("[dbo].[DivisionType]"),
                UserId
            };
            return await db.ExecuteAsync("uspSchoolGradeDivisionMatrixUpsert", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<DatatableResponseModel> GetGradeDivisionMatrixList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSchoolGradeDivisionMatrixGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<GradeDivisionMatrixDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<GradeDivisionMatrixDeleteRespose> GradeDivisionMatrixDelete(int? GradeId, string divisionName, int academicYearId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionName", divisionName.Trim());
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<GradeDivisionMatrixDeleteRespose>("uspSchoolGradeDivisionMatrixDelete", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
