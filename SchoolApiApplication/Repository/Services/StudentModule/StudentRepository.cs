using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.StudentModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.StudentModule;
using Newtonsoft.Json;
using SchoolApiApplication.Helper;
using Microsoft.AspNetCore.Mvc;
using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.Repository.Services.StudentModule
{
    public class StudentRepository : IStudentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetStudentList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspStudentGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<StudentListDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<StudentDto> GetStudentProfile(long? StudentId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<StudentDto>("uspStudentSelect", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<StudentIdModelResponse> StudentProfileUpsert(StudentDto StudentObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            var parameters2 = new DynamicParameters();
            var parameters3 = new DynamicParameters();
            var parameters4 = new DynamicParameters();

            parameters.Add("@StudentId", StudentObj.StudentId);
            parameters.Add("@GeneralRegistrationNo", StudentObj.GeneralRegistrationNo);
            parameters.Add("@CbscStudentId", StudentObj.CbscStudentId);
            parameters.Add("@AdmissionNo", StudentObj.AdmissionNo);
            parameters.Add("@SchoolId", StudentObj.SchoolId);
            parameters.Add("@FirstName", StudentObj.FirstName?.Trim());
            parameters.Add("@MiddleName", StudentObj.MiddleName?.Trim());
            parameters.Add("@LastName", StudentObj.LastName?.Trim());
            parameters.Add("@Gender", StudentObj.Gender);
            parameters.Add("@AdharNo", StudentObj.AdharNo);
            parameters.Add("@Religion", StudentObj.Religion);
            parameters.Add("@Category", StudentObj.Category);
            parameters.Add("@Cast", StudentObj.Cast);
            parameters.Add("@SubCast", StudentObj.SubCast);
            parameters.Add("@Nationality", StudentObj.Nationality);
            parameters.Add("@MotherTounge", StudentObj.MotherTounge);
            parameters.Add("@EmergencyContactPersonName", StudentObj.EmergencyContactPersonName);
            parameters.Add("@EmergencyContactNumber", StudentObj.EmergencyContactNumber);
            parameters.Add("@FamilyDoctorName", StudentObj.FamilyDoctorName);
            parameters.Add("@FamilyDoctorContactNumber", StudentObj.FamilyDoctorContactNumber);
            parameters.Add("@BirthPlace", StudentObj.BirthPlace);
            parameters.Add("@BirthDate", StudentObj.BirthDate);
            parameters.Add("@BirthDateInWords", StudentObj.BirthDateInWords);
            parameters.Add("@BirthCountryId", StudentObj.BirthCountryId);
            parameters.Add("@BirthStateId", StudentObj.BirthStateId);
            parameters.Add("@BirthDistrictId", StudentObj.BirthDistrictId);
            parameters.Add("@BirthTalukaId", StudentObj.BirthTalukaId);
            parameters.Add("@BirthCountryName", StudentObj.BirthCountryName);
            parameters.Add("@BirthStateName", StudentObj.BirthStateName);
            parameters.Add("@BirthDistrictName", StudentObj.BirthDistrictName);
            parameters.Add("@BirthTalukaName", StudentObj.BirthTalukaName);
            parameters.Add("@CurrentAddressLine1", StudentObj.CurrentAddressLine1);
            parameters.Add("@CurrentAddressLine2", StudentObj.CurrentAddressLine2);
            parameters.Add("@CurrentCountryId", StudentObj.CurrentCountryId);
            parameters.Add("@CurrentStateId", StudentObj.CurrentStateId);
            parameters.Add("@CurrentDistrictId", StudentObj.CurrentDistrictId);
            parameters.Add("@CurrentTalukaId", StudentObj.CurrentTalukaId);
            parameters.Add("@CurrentCountryName", StudentObj.CurrentCountryName);
            parameters.Add("@CurrentStateName", StudentObj.CurrentStateName);
            parameters.Add("@CurrentDistrictName", StudentObj.CurrentDistrictName);
            parameters.Add("@CurrentTalukaName", StudentObj.CurrentTalukaName);
            parameters.Add("@CurrentZipcode", StudentObj.CurrentZipcode);
            parameters.Add("@BloodGroup", StudentObj.BloodGroup);
            parameters.Add("@Height", StudentObj.Height);
            parameters.Add("@Weight", StudentObj.Weight);
            parameters.Add("@MedicalHistory", StudentObj.MedicalHistory);
            parameters.Add("@AdmissionGrade", StudentObj.AdmissionGrade);
            parameters.Add("@DateOfAdmission", StudentObj.DateOfAdmission);
            parameters.Add("@LastSchoolAttended", StudentObj.LastSchoolAttended);
            parameters.Add("@LastSchoolStandard", StudentObj.LastSchoolStandard);
            parameters.Add("@LastSchoolDivision", StudentObj.LastSchoolDivision);
            parameters.Add("@ProgressNoteFromLastSchool", StudentObj.ProgressNoteFromLastSchool);
            parameters.Add("@ConductNoteFromLastSchool", StudentObj.ConductNoteFromLastSchool);
            parameters.Add("@StandardInWhichLastStudyingSection", StudentObj.StandardInWhichLastStudyingSection);
            parameters.Add("@SinceWhenStudyingInLastSchool", StudentObj.SinceWhenStudyingInLastSchool);
            parameters.Add("@ReasonOfLeavingSchoolLastSchool", StudentObj.ReasonOfLeavingSchoolLastSchool);
            parameters.Add("@DateOfLeavingLastSchool", StudentObj.DateOfLeavingLastSchool);
            parameters.Add("@RemarkFromLastSchool", StudentObj.RemarkFromLastSchool);
            parameters.Add("@ProfileImageURL", StudentObj.ProfileImageURL);
            parameters.Add("@AcademicYearId", StudentObj.AcademicYearId);
            parameters.Add("@ClassId", StudentObj.ClassId);
            parameters.Add("@GradeNameAdmission", StudentObj.GradeNameAdmission);
            parameters.Add("@RollNumber", StudentObj.RollNumber);
            parameters.Add("@IsNewStudent", StudentObj.IsNewStudent ?? false);
            parameters.Add("@IsRTEStudent", StudentObj.IsRTEStudent ?? false);
            parameters.Add("@IsConsationApplicable", StudentObj.IsConsationApplicable ?? false);
            parameters.Add("@ConsationAmount", StudentObj.ConsationAmount);
            parameters.Add("@isArchive", StudentObj.IsArchive ?? false);
            parameters.Add("@PreviousAcademicYearPendingFeeAmount", StudentObj.PreviousAcademicYearPendingFeeAmount);
            parameters.Add("@UserId", UserId);
            parameters.Add("@IsAppAccess", StudentObj.IsAppAccess ?? false);
            if (StudentObj.IsAppAccess == true)
            {
                parameters.Add("@AppAccessMobileNo", StudentObj.AppAccessMobileNo);
                parameters.Add("@AppAccessOneTimePassword", StudentObj.AppAccessOneTimePassword);
                string salt = PasswordHelper.GenerateSalt(4);
                parameters.Add("@PasswordSalt", salt);
                if (StudentObj.AppAccessOneTimePassword != null)
                {
                    parameters.Add("@Upassword", PasswordHelper.HashPassword(StudentObj.AppAccessOneTimePassword, salt));
                }
            }
            parameters2.Add("@FirstName", StudentObj.FirstName?.Trim());
            parameters2.Add("@MiddleName", StudentObj.MiddleName?.Trim());
            parameters2.Add("@LastName", StudentObj.LastName?.Trim());
            parameters2.Add("@BirthDate", StudentObj.BirthDate);
            parameters2.Add("@StudentId", StudentObj.StudentId);
            parameters2.Add("@AcademicYearId", StudentObj.AcademicYearId);

            parameters3.Add("@StudentId", StudentObj.StudentId);
            parameters3.Add("@GeneralRegistrationNo", StudentObj.GeneralRegistrationNo);

            parameters4.Add("@StudentId", StudentObj.StudentId);
            parameters4.Add("@AcademicYearId", StudentObj.AcademicYearId);
            parameters4.Add("@IsRTEStudent", StudentObj.IsRTEStudent ?? false);
            parameters4.Add("@UserId", UserId);

            var result = await db.QueryFirstOrDefaultAsync<StudentIdModelResponse>("uspCheckStudentExist", parameters2, commandType: CommandType.StoredProcedure);
            var genExist = await db.QueryFirstOrDefaultAsync<StudentIdModelResponse>("uspCheckGenRegNoExist", parameters3, commandType: CommandType.StoredProcedure);
            var paymentExist = await db.QueryFirstOrDefaultAsync<StudentIdModelResponse>("uspStudentPaymentExists", parameters4, commandType: CommandType.StoredProcedure);

            if (result.Exist == 0 && genExist.GeneralRegistrationNoAvailable==0 && paymentExist.StudentPaymentExist==0)
            {
                var result2=await db.QueryFirstOrDefaultAsync<StudentIdModelResponse>("uspStudentUpsert", parameters, commandType: CommandType.StoredProcedure);
                result2.Exist = result.Exist;
                result2.GeneralRegistrationNoAvailable = genExist.GeneralRegistrationNoAvailable;
                result2.StudentPaymentExist = paymentExist.StudentPaymentExist;
                return result2;
            }
            result.GeneralRegistrationNoAvailable = genExist.GeneralRegistrationNoAvailable;
            result.StudentPaymentExist = paymentExist.StudentPaymentExist;
            return result;
        }
        public async Task<StudentDeleteRespose> StudentProfileDelete(long? StudentId, int AcademicYearId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<StudentDeleteRespose>("uspStudentDelete", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<StudentQRSelectResponse> GetQRCodeDetailByStudentId(long StudentId,int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<StudentQRSelectResponse>("uspStudentQRDetailSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<IEnumerable<StudentQRSelectResponse>> GetQRCodeDetailForAllStudent(int AcademicYearId, int ClassId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ClassId", ClassId);
            return await db.QueryAsync<StudentQRSelectResponse>("uspAllStudentQRDetailSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> GetStudentCountByClass(int AcademicYearId, int ClassId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ClassId", ClassId);
            return await db.ExecuteScalarAsync<int>("uspStudentCountSelect", parameters, commandType: CommandType.StoredProcedure);

        }



    }
}
