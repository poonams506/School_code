using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.CabDriverModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.CabDriverModule;
using Newtonsoft.Json;
using SchoolApiApplication.Helper;

namespace SchoolApiApplication.Repository.Services.CabDriverModule
{
    public class CabDriverRepository : ICabDriverRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CabDriverRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetCabDriverList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspCabDriverGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<CabDriverDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<CabDriverDto> GetCabDriverProfile(long? CabDriverId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CabDriverId", CabDriverId);
            return await db.QueryFirstOrDefaultAsync<CabDriverDto>("uspCabDriverSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<CabDriverDto> CabDriverProfileUpsert(CabDriverDto CabDriverObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CabDriverId", CabDriverObj.CabDriverId);
            parameters.Add("@SchoolId", CabDriverObj.SchoolId);
            parameters.Add("@FirstName", CabDriverObj.FirstName);
            parameters.Add("@MiddleName", CabDriverObj.MiddleName);
            parameters.Add("@LastName", CabDriverObj.LastName);
            parameters.Add("@Gender", CabDriverObj.Gender);
            parameters.Add("@ContactNumber", CabDriverObj.ContactNumber);
            parameters.Add("@MobileNumber", CabDriverObj.MobileNumber);
            parameters.Add("@EmailId", CabDriverObj.EmailId);
            parameters.Add("@AddressLine1", CabDriverObj.AddressLine1);
            parameters.Add("@AddressLine2", CabDriverObj.AddressLine2);
            parameters.Add("@TalukaId", CabDriverObj.TalukaId);
            parameters.Add("@DistrictId", CabDriverObj.DistrictId);
            parameters.Add("@StateId", CabDriverObj.StateId);
            parameters.Add("@CountryId", CabDriverObj.CountryId);
            parameters.Add("@ZipCode", CabDriverObj.ZipCode);
            parameters.Add("@TalukaName", CabDriverObj.TalukaName);
            parameters.Add("@DistrictName", CabDriverObj.DistrictName);
            parameters.Add("@StateName", CabDriverObj.StateName);
            parameters.Add("@CountryName", CabDriverObj.CountryName);
            parameters.Add("@AdharNumber", CabDriverObj.AdharNumber);
            parameters.Add("@Education", CabDriverObj.Education);
            parameters.Add("@BirthDate", CabDriverObj.BirthDate);
            parameters.Add("@BloodGroup", CabDriverObj.BloodGroup);
            parameters.Add("@ProfileImageUrl", CabDriverObj.ProfileImageURL);
            parameters.Add("@DrivingLicenceNumber", CabDriverObj.DrivingLicenceNumber);
            parameters.Add("@ValidTill", CabDriverObj.ValidTill);
            parameters.Add("@UserId", UserId);
            parameters.Add("@IsAppAccess", CabDriverObj.IsAppAccess ?? false);
            if (CabDriverObj.IsAppAccess == true)
            {

                parameters.Add("@AppAccessMobileNo", CabDriverObj.AppAccessMobileNo);
                parameters.Add("@AppAccessOneTimePassword", CabDriverObj.AppAccessOneTimePassword);
                string salt = PasswordHelper.GenerateSalt(4);
                parameters.Add("@PasswordSalt", salt);
                if (CabDriverObj.AppAccessOneTimePassword != null)
                {
                    parameters.Add("@Upassword", PasswordHelper.HashPassword(Convert.ToString(CabDriverObj.AppAccessOneTimePassword), salt));
                }
            }

            return await db.QueryFirstOrDefaultAsync<CabDriverDto>("uspCabDriverUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<CabDriverDeleteRespose> CabDriverDelete(long? CabDriverId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CabDriverId",CabDriverId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<CabDriverDeleteRespose>("uspCabDriverDelete", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
