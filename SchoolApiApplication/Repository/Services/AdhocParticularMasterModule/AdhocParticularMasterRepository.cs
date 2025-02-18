using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.AdhocParticularMasterModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.AdhocParticularMasterModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.AdhocParticularMasterModule
{
    public class AdhocParticularMasterRepository : IAdhocParticularMasterRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AdhocParticularMasterRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<AdhocParticularMasterDtoInsertRespose> AdhocParticularMasterInsert(AdhocParticularMasterDto Obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AdhocParticularMasterId", Obj.AdhocParticularMasterId);
            parameters.Add("@Particular", Obj.Particular);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<AdhocParticularMasterDtoInsertRespose>("uspAdhocParticularMasterInsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<AdhocParticularMasterDtoListRespose> GetAdhocParticularList(int AcademicYearId)
        {
            AdhocParticularMasterDtoListRespose adhocParticularMasterDtoListRespose = new AdhocParticularMasterDtoListRespose();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);            
            var resultList = await db.QueryAsync<AdhocParticularMasterDto>("uspAdhocParticularMasterListSelect", parameters, commandType: CommandType.StoredProcedure);
            resultList ??= new List<AdhocParticularMasterDto>();
            adhocParticularMasterDtoListRespose.Particulars = resultList.ToList();
            return adhocParticularMasterDtoListRespose;

        }
    }
}
