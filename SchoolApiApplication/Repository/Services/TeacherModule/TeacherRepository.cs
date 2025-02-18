using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.TeacherModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.TeacherModule;
using Newtonsoft.Json;
using SchoolApiApplication.Helper;
using SchoolApiApplication.DTO.SubjectMasterModule;

namespace SchoolApiApplication.Repository.Services.TeacherModule
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetTeacherList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspTeacherGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<TeacherDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<TeacherDto> GetTeacherProfile(long? TeacherId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TeacherId", TeacherId);
            return await db.QueryFirstOrDefaultAsync<TeacherDto>("uspTeacherSelect", parameters, commandType: CommandType.StoredProcedure);
        }

       
        public async Task<TeacherDto> TeacherProfileUpsert(TeacherDto TeacherObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TeacherId", TeacherObj.TeacherId);
            parameters.Add("@FirstName", TeacherObj.FirstName);
            parameters.Add("@MiddleName", TeacherObj.MiddleName);
            parameters.Add("@LastName", TeacherObj.LastName);
            parameters.Add("@Gender", TeacherObj.Gender);
            parameters.Add("@ContactNumber", TeacherObj.ContactNumber);
            parameters.Add("@MobileNumber", TeacherObj.MobileNumber);
            parameters.Add("@EmailId", TeacherObj.EmailId);
            parameters.Add("@AddressLine1", TeacherObj.AddressLine1);
            parameters.Add("@AddressLine2", TeacherObj.AddressLine2);
            parameters.Add("@TalukaId", TeacherObj.TalukaId);
            parameters.Add("@DistrictId", TeacherObj.DistrictId);
            parameters.Add("@StateId", TeacherObj.StateId);
            parameters.Add("@CountryId", TeacherObj.CountryId);
            parameters.Add("@ZipCode", TeacherObj.ZipCode);
            parameters.Add("@TalukaName", TeacherObj.TalukaName);
            parameters.Add("@DistrictName", TeacherObj.DistrictName);
            parameters.Add("@StateName", TeacherObj.StateName);
            parameters.Add("@CountryName", TeacherObj.CountryName);
            parameters.Add("@AdharNumber", TeacherObj.AdharNumber);
            parameters.Add("@Education", TeacherObj.Education);
            parameters.Add("@BirthDate", TeacherObj.BirthDate);
            parameters.Add("@BloodGroup", TeacherObj.BloodGroup);
            parameters.Add("@ProfileImageUrl", TeacherObj.ProfileImageURL);
            parameters.Add("@UserId", UserId);
            parameters.Add("@IsAppAccess", TeacherObj.IsAppAccess ?? false);
            if (TeacherObj.IsAppAccess == true)
            {

                parameters.Add("@AppAccessMobileNo", TeacherObj.AppAccessMobileNo);
                parameters.Add("@AppAccessOneTimePassword", TeacherObj.AppAccessOneTimePassword);
                string salt = PasswordHelper.GenerateSalt(4);
                parameters.Add("@PasswordSalt", salt);
                if (TeacherObj.AppAccessOneTimePassword != null)
                {
                    parameters.Add("@Upassword", PasswordHelper.HashPassword(Convert.ToString(TeacherObj.AppAccessOneTimePassword), salt));
                }
            }

            return await db.QueryFirstOrDefaultAsync<TeacherDto>("uspTeacherUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<TeacherDeleteRespose> TeacherProfileDelete(long? TeacherId,int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TeacherId", TeacherId);
            
            var parameters2 = new DynamicParameters();
            parameters2.Add("@TeacherId", TeacherId);
            parameters2.Add("@UserId", UserId);

            var result = await db.QueryFirstOrDefaultAsync<TeacherDeleteRespose>("uspCheckTeacherExist", parameters, commandType: CommandType.StoredProcedure);

            if (result.TeacherGradeDivisionMappingCount==0 && result.TeacherSubjectMappingCount==0)
            {
                return await db.QueryFirstOrDefaultAsync<TeacherDeleteRespose>("uspTeacherDelete", parameters2, commandType: CommandType.StoredProcedure);
            }

            return result;
        }

    }
}
