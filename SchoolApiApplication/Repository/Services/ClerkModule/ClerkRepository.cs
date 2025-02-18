using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.ClerkModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.ClerkModule;
using Newtonsoft.Json;
using SchoolApiApplication.Helper;

namespace SchoolApiApplication.Repository.Services.ClerkModule
{
    public class ClerkRepository : IClerkRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ClerkRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetClerkList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspClerkGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<ClerkDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<ClerkDto> GetClerkProfile(long? ClerkId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ClerkId", ClerkId);
            return await db.QueryFirstOrDefaultAsync<ClerkDto>("uspClerkSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<ClerkDto> ClerkProfileUpsert(ClerkDto ClerkObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ClerkId", ClerkObj.ClerkId);
            parameters.Add("@FirstName", ClerkObj.FirstName);
            parameters.Add("@MiddleName", ClerkObj.MiddleName);
            parameters.Add("@LastName", ClerkObj.LastName);
            parameters.Add("@Gender", ClerkObj.Gender);
            parameters.Add("@ContactNumber", ClerkObj.ContactNumber);
            parameters.Add("@MobileNumber", ClerkObj.MobileNumber);
            parameters.Add("@EmailId", ClerkObj.EmailId);
            parameters.Add("@AddressLine1", ClerkObj.AddressLine1);
            parameters.Add("@AddressLine2", ClerkObj.AddressLine2);
            parameters.Add("@TalukaId", ClerkObj.TalukaId);
            parameters.Add("@DistrictId", ClerkObj.DistrictId);
            parameters.Add("@StateId", ClerkObj.StateId);
            parameters.Add("@CountryId", ClerkObj.CountryId);
            parameters.Add("@ZipCode", ClerkObj.ZipCode);
            parameters.Add("@TalukaName", ClerkObj.TalukaName);
            parameters.Add("@DistrictName", ClerkObj.DistrictName);
            parameters.Add("@StateName", ClerkObj.StateName);
            parameters.Add("@CountryName", ClerkObj.CountryName);
            parameters.Add("@AdharNumber", ClerkObj.AdharNumber);
            parameters.Add("@Education", ClerkObj.Education);
            parameters.Add("@BirthDate", ClerkObj.BirthDate);
            parameters.Add("@BloodGroup", ClerkObj.BloodGroup);
            parameters.Add("@ProfileImageUrl", ClerkObj.ProfileImageURL);
            parameters.Add("@UserId", UserId);
            parameters.Add("@IsAppAccess", ClerkObj.IsAppAccess ?? false);
            if (ClerkObj.IsAppAccess == true)
            {

                parameters.Add("@AppAccessMobileNo", ClerkObj.AppAccessMobileNo);
                parameters.Add("@AppAccessOneTimePassword", ClerkObj.AppAccessOneTimePassword);
                string salt = PasswordHelper.GenerateSalt(4);
                parameters.Add("@PasswordSalt", salt);
                if (ClerkObj.AppAccessOneTimePassword != null)
                {
                    parameters.Add("@Upassword", PasswordHelper.HashPassword(Convert.ToString(ClerkObj.AppAccessOneTimePassword), salt));
                }
            }

            return await db.QueryFirstOrDefaultAsync<ClerkDto>("uspClerkUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<ClerkDeleteRespose> ClerkProfileDelete(long? ClerkId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ClerkId", ClerkId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<ClerkDeleteRespose>("uspClerkDelete", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
