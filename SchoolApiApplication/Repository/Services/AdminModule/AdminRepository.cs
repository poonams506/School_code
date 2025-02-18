using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.AdminModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.AdminModule;
using Newtonsoft.Json;
using SchoolApiApplication.Helper;

namespace SchoolApiApplication.Repository.Services.AdminModule
{
    public class AdminRepository : IAdminRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AdminRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetAdminList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspAdminGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<AdminDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<AdminDto> GetAdminProfile(long? AdminId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AdminId", AdminId);
            return await db.QueryFirstOrDefaultAsync<AdminDto>("uspAdminSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<AdminDto> AdminProfileUpsert(AdminDto AdminObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AdminId", AdminObj.AdminId);
            parameters.Add("@FirstName", AdminObj.FirstName);
            parameters.Add("@MiddleName", AdminObj.MiddleName);
            parameters.Add("@LastName", AdminObj.LastName);
            parameters.Add("@Gender", AdminObj.Gender);
            parameters.Add("@ContactNumber", AdminObj.ContactNumber);
            parameters.Add("@MobileNumber", AdminObj.MobileNumber);
            parameters.Add("@EmailId", AdminObj.EmailId);
            parameters.Add("@AddressLine1", AdminObj.AddressLine1);
            parameters.Add("@AddressLine2", AdminObj.AddressLine2);
            parameters.Add("@TalukaId", AdminObj.TalukaId);
            parameters.Add("@DistrictId", AdminObj.DistrictId);
            parameters.Add("@StateId", AdminObj.StateId);
            parameters.Add("@CountryId", AdminObj.CountryId);
            parameters.Add("@ZipCode", AdminObj.ZipCode);
            parameters.Add("@TalukaName", AdminObj.TalukaName);
            parameters.Add("@DistrictName", AdminObj.DistrictName);
            parameters.Add("@StateName", AdminObj.StateName);
            parameters.Add("@CountryName", AdminObj.CountryName);
            parameters.Add("@AdharNumber", AdminObj.AdharNumber);
            parameters.Add("@Education", AdminObj.Education);
            parameters.Add("@BirthDate", AdminObj.BirthDate);
            parameters.Add("@BloodGroup", AdminObj.BloodGroup);
            parameters.Add("@ProfileImageUrl", AdminObj.ProfileImageURL);
            parameters.Add("@UserId", UserId);
            parameters.Add("@IsAppAccess", AdminObj.IsAppAccess ?? false);
            if (AdminObj.IsAppAccess == true)
            {
                parameters.Add("@AppAccessMobileNo", AdminObj.AppAccessMobileNo);
                parameters.Add("@AppAccessOneTimePassword", AdminObj.AppAccessOneTimePassword);
                string salt = PasswordHelper.GenerateSalt(4);
                parameters.Add("@PasswordSalt", salt);
                if (AdminObj.AppAccessOneTimePassword != null)
                {
                    parameters.Add("@Upassword", PasswordHelper.HashPassword(Convert.ToString(AdminObj.AppAccessOneTimePassword), salt));
                }
            }

            return await db.QueryFirstOrDefaultAsync<AdminDto>("uspAdminUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<AdminDeleteRespose> AdminProfileDelete(long? AdminId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AdminId", AdminId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<AdminDeleteRespose>("uspAdminDelete", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
