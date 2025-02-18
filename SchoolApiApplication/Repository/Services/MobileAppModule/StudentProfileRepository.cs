using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ParentAppModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ParentAppModule
{
    public class StudentProfileRepository: IStudentProfileRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentProfileRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<StudentProfileMobileDto> GetStudentProfile(long StudentId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            return await db.QueryFirstOrDefaultAsync<StudentProfileMobileDto>("uspStudentProfileSelect", parameters, commandType: CommandType.StoredProcedure);



        }
        public async Task<int> StudentProfileUpdate(StudentProfileMobileDto StudentProfileObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentProfileObj.StudentId);
            parameters.Add("@FirstName", StudentProfileObj.FirstName);
            parameters.Add("@MiddleName", StudentProfileObj.MiddleName);
            parameters.Add("@LastName", StudentProfileObj.LastName);
            parameters.Add("@CurrentAddressLine1", StudentProfileObj.CurrentAddressLine1);
            parameters.Add("@CurrentAddressLine2", StudentProfileObj.CurrentAddressLine2);
            parameters.Add("@CurrentCountryId", StudentProfileObj.CurrentCountryId);
            parameters.Add("@CurrentStateId", StudentProfileObj.CurrentStateId);
            parameters.Add("@CurrentDistrictId", StudentProfileObj.CurrentDistrictId);
            parameters.Add("@CurrentTalukaId", StudentProfileObj.CurrentTalukaId);
            parameters.Add("@CurrentZipcode", StudentProfileObj.CurrentZipcode);
            parameters.Add("@ProfileImageURL", StudentProfileObj.ProfileImageURL);
            parameters.Add("@UserId", UserId);


            return await db.QueryFirstOrDefaultAsync<int>("uspStudentProfileUpdate", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<ParentProfileMobileResponseDto> GetParentProfile(long StudentId)
        {
            ParentProfileMobileResponseDto responseDto = new ParentProfileMobileResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            

            using (var multiResultSet = await db.QueryMultipleAsync("uspMobileAppParentSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                responseDto.FatherDetail = (await multiResultSet.ReadFirstOrDefaultAsync<ParentProfileMobileDto>()) ?? new ParentProfileMobileDto();
                responseDto.MotherDetail = (await multiResultSet.ReadFirstOrDefaultAsync<ParentProfileMobileDto>()) ?? new ParentProfileMobileDto(); ;
                responseDto.GuardianDetail = (await multiResultSet.ReadFirstOrDefaultAsync<ParentProfileMobileDto>()) ?? new ParentProfileMobileDto();
               return responseDto;
            }


        }
        public async Task<int> ParentProfileUpdate(ParentProfileMobileDto ParentProfileObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", ParentProfileObj.StudentId);
            parameters.Add("@ParentId", ParentProfileObj.ParentId);
            parameters.Add("@ParentTypeId", ParentProfileObj.ParentTypeId);
            parameters.Add("@FirstName", ParentProfileObj.FirstName);
            parameters.Add("@MiddleName", ParentProfileObj.MiddleName);
            parameters.Add("@LastName", ParentProfileObj.LastName);
            parameters.Add("@AddressLine1", ParentProfileObj.AddressLine1);
            parameters.Add("@AddressLine2", ParentProfileObj.AddressLine2);
            parameters.Add("@CountryId", ParentProfileObj.CountryId);
            parameters.Add("@StateId", ParentProfileObj.StateId);
            parameters.Add("@DistrictId", ParentProfileObj.DistrictId);
            parameters.Add("@TalukaId", ParentProfileObj.TalukaId);
            parameters.Add("@Zipcode", ParentProfileObj.Zipcode);
            parameters.Add("@ProfileImageURL", ParentProfileObj.ProfileImageURL);
            parameters.Add("@UserId", UserId);


            return await db.QueryFirstOrDefaultAsync<int>("uspMobileAppParentProfileUpdate", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
    

