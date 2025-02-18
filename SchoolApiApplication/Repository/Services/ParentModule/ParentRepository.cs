using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.ParentModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.ParentModule;
using Newtonsoft.Json;
using SchoolApiApplication.Helper;
using System.Security.Cryptography.X509Certificates;
using SchoolApiApplication.DTO.GradeModule;

namespace SchoolApiApplication.Repository.Services.ParentModule
{
    public class ParentRepository : IParentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ParentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetParentList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspParentGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<ParentDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<ParentDto> GetParentProfile(long? ParentId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ParentId", ParentId);
            return await db.QueryFirstOrDefaultAsync<ParentDto>("uspParentSelect", parameters, commandType: CommandType.StoredProcedure);
        }

       
        public async Task<int> ParentProfileUpsert(ParentDto ParentObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ParentId", ParentObj.ParentId);
            parameters.Add("@ParentTypeId", ParentObj.ParentTypeId);
            parameters.Add("@FirstName", ParentObj.FirstName);
            parameters.Add("@MiddleName", ParentObj.MiddleName);
            parameters.Add("@LastName", ParentObj.LastName);
            parameters.Add("@Gender", ParentObj.Gender);
            parameters.Add("@ContactNumber", ParentObj.ContactNumber);
            parameters.Add("@MobileNumber", ParentObj.MobileNumber);
            parameters.Add("@EmailId", ParentObj.EmailId);
            parameters.Add("@AddressLine1", ParentObj.AddressLine1);
            parameters.Add("@AddressLine2", ParentObj.AddressLine2);
            parameters.Add("@TalukaId", ParentObj.TalukaId);
            parameters.Add("@DistrictId", ParentObj.DistrictId);
            parameters.Add("@StateId", ParentObj.StateId);
            parameters.Add("@CountryId", ParentObj.CountryId);
            parameters.Add("@TalukaName", ParentObj.TalukaName);
            parameters.Add("@DistrictName", ParentObj.DistrictName);
            parameters.Add("@StateName", ParentObj.StateName);
            parameters.Add("@CountryName", ParentObj.CountryName);
            parameters.Add("@Zipcode", ParentObj.Zipcode);
            parameters.Add("@AdharNumber", ParentObj.AdharNumber);
            parameters.Add("@Education", ParentObj.Education);
            parameters.Add("@BirthDate", ParentObj.BirthDate);
            parameters.Add("@Occupation", ParentObj.Occupation);
            parameters.Add("@AnnualIncome", ParentObj.AnnualIncome);
            parameters.Add("@BloodGroup", ParentObj.BloodGroup);
            parameters.Add("@ProfileImageURL", ParentObj.ProfileImageURL);
            parameters.Add("@StudentId", ParentObj.StudentId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspParentUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<ParentDeleteRespose> ParentProfileDelete(long? ParentId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ParentId", ParentId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<ParentDeleteRespose>("uspParentDelete", parameters, commandType: CommandType.StoredProcedure);

        }
    }

}
