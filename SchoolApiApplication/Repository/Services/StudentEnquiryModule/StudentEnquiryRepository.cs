using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.StudentEnquiryModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentEnquiryModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentEnquiryModule
{
    public class StudentEnquiryRepository : IStudentEnquiryRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public StudentEnquiryRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<StudentEnquiryDto> GetEnquiryStatusDropDown()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var enquiryStatusDropdownList = await db.QueryAsync<EnquiryStatusDropdownDto>("uspEnquiryStatusDropdown", commandType: CommandType.StoredProcedure);
            StudentEnquiryDto responseDto = new StudentEnquiryDto();
            if (enquiryStatusDropdownList != null && enquiryStatusDropdownList.Any())
            {
                responseDto.EnquiryStatusDropdownList=enquiryStatusDropdownList.ToList();
            }
            return responseDto;
        }

        public async Task<StudentEnquiryDto> GetEnquiryTypeDropDown()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var enquiryTypeDropdownList = await db.QueryAsync<EnquiryTypeDropdownDto>("uspEnquiryTypeDropdown", commandType: CommandType.StoredProcedure);
            StudentEnquiryDto responseDto = new StudentEnquiryDto();
            if (enquiryTypeDropdownList != null && enquiryTypeDropdownList.Any())
            {
                responseDto.EnquiryTypeDropdownList=enquiryTypeDropdownList.ToList();
            }
            return responseDto;
        }

        public async Task<StudentEnquiryIdModelResponse> StudentEnquirydelete(int? StudentEnquiryId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentEnquiryId", StudentEnquiryId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<StudentEnquiryIdModelResponse>("uspStudentEnquiryDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<DatatableResponseModel> StudentEnquiryGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspStudentEnquiryGridSelect",
                    new { RequestModel = strRequestModel}, commandType: CommandType.StoredProcedure))
                {

                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<StudentEnquiryDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }

            return datatableResponseModel;
        }

        public async Task<StudentEnquiryDto> StudentEnquirySelect(int StudentEnquiryId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentEnquiryId", StudentEnquiryId);
            return await db.QueryFirstOrDefaultAsync<StudentEnquiryDto>("uspStudentEnquirySelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<StudentEnquiryIdModelResponse> StudentEnquiryUpsert(StudentEnquiryDto obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            var parameters2 = new DynamicParameters();

            parameters.Add("@StudentEnquiryId", obj.StudentEnquiryId);
            parameters.Add("@EnquiryDate", obj.EnquiryDate);
            parameters.Add("@StudentFirstName", obj.StudentFirstName?.Trim());
            parameters.Add("@StudentMiddleName", obj.StudentMiddleName?.Trim());
            parameters.Add("@StudentLastName", obj.StudentLastName?.Trim());
            parameters.Add("@Gender", obj.Gender);
            parameters.Add("@BirthDate", obj.BirthDate);
            parameters.Add("@AdharNo", obj.AdharNo);
            parameters.Add("@Religion", obj.Religion);
            parameters.Add("@Cast", obj.Cast);
            parameters.Add("@Category", obj.Category);
            parameters.Add("@Nationality", obj.Nationality);
            parameters.Add("@MobileNumber", obj.MobileNumber);
            parameters.Add("@InterestedClassId", obj.InterestedClassId);
            parameters.Add("@AcademicYearId", obj.AcademicYearId);
            parameters.Add("@CurrentSchool", obj.CurrentSchool);
            parameters.Add("@CurrentClass", obj.CurrentClass);
            parameters.Add("@NameOfSiblingInCurrentSchool", obj.NameOfSiblingInCurrentSchool);
            parameters.Add("@FatherFirstName", obj.FatherFirstName);
            parameters.Add("@FatherMiddleName", obj.FatherMiddleName);
            parameters.Add("@FatherLastName", obj.FatherLastName);
            parameters.Add("@MotherFirstName", obj.MotherFirstName);
            parameters.Add("@MotherMiddleName", obj.MotherMiddleName);
            parameters.Add("@MotherLastName", obj.MotherLastName);
            parameters.Add("@AddressLine1", obj.AddressLine1);
            parameters.Add("@AddressLine2", obj.AddressLine2);
            parameters.Add("@CountryId", obj.CountryId);
            parameters.Add("@CountryName", obj.CountryName);
            parameters.Add("@StateId", obj.StateId);
            parameters.Add("@StateName", obj.StateName);
            parameters.Add("@TalukaId", obj.TalukaId);
            parameters.Add("@TalukaName", obj.TalukaName);
            parameters.Add("@DistrictId", obj.DistrictId);
            parameters.Add("@DistrictName", obj.DistrictName);
            parameters.Add("@EnquiryTypeId", obj.EnquiryTypeId);
            parameters.Add("@ReferenceBy", obj.ReferenceBy);
            parameters.Add("@EnquiryStatusId", obj.EnquiryStatusId);
            parameters.Add("@EmailId", obj.EmailId);
            parameters.Add("@UserId", UserId);


            parameters2.Add("@StudentFirstName", obj.StudentFirstName?.Trim());
            parameters2.Add("@StudentMiddleName", obj.StudentMiddleName?.Trim());
            parameters2.Add("@StudentLastName", obj.StudentLastName?.Trim());
            parameters2.Add("@BirthDate", obj.BirthDate);
            parameters2.Add("@StudentEnquiryId", obj.StudentEnquiryId);

            var result = await db.QueryFirstOrDefaultAsync<StudentEnquiryIdModelResponse>("uspCheckStudentEnquiryExist", parameters2, commandType: CommandType.StoredProcedure);

            if (result != null && result.Exist == 0)
            {
                var result2 = await db.QueryFirstOrDefaultAsync<StudentEnquiryIdModelResponse>("uspStudentEnquiryUpsert", parameters, commandType: CommandType.StoredProcedure);
                if (result2 != null)
                {
                    result2.Exist = result.Exist; 
                    return result2;
                }
            }
                return result;
            
        }
    }
}
