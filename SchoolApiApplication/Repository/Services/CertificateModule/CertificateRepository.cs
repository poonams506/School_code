using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.Certificate_Module;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.CertificateModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.CertificateModule
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CertificateRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CertificateDto> BonafiedCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            CertificateDto certificateDto = new CertificateDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@StudentId", StudentId);

            var bonafiedDetails = await db.QueryFirstOrDefaultAsync<BonafiedDto>("uspBonafiedCertificateSelect", parameters, commandType: CommandType.StoredProcedure);

            certificateDto.BonafiedDetails = bonafiedDetails;  
            return certificateDto;
        }

        public async Task<CertificateDto> CharacterCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            CertificateDto certificateDto = new CertificateDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@StudentId", StudentId);
            var characterCertificateDetails = await db.QueryFirstOrDefaultAsync<CharacterCertificateDto>("uspCharcterCertificateSelect", parameters, commandType: CommandType.StoredProcedure);

            certificateDto.CharacterCertificateDetails = characterCertificateDetails;
            return certificateDto;
        }

        public async Task<CertificateDto> IdCardSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            CertificateDto certificateDto = new CertificateDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@StudentId", StudentId);
            var idCardDetails = await db.QueryFirstOrDefaultAsync<IdCardDto>("uspIdCardSelect", parameters, commandType: CommandType.StoredProcedure);

            certificateDto.IdCardDetails = idCardDetails;
            return certificateDto;
        }

        public async Task<CertificateDto> LeavingCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            CertificateDto certificateDto = new CertificateDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@StudentId", StudentId);
            var leavingCertificateDetails = await db.QueryFirstOrDefaultAsync<LeavingCertificateDto>("uspLeavingCertificateSelect", parameters, commandType: CommandType.StoredProcedure);

            certificateDto.LeavingCertificateDetails = leavingCertificateDetails;
            return certificateDto;
        }

        public async Task<DatatableResponseModel> GetCertificateList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspCertificateGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<CertificateDto>()?.ToList();

                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<CertificateAuditDto> GetCertificate(long? CertificateAuditsId, Int16 AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CertificateAuditsId", CertificateAuditsId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<CertificateAuditDto>("uspCertificateSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<CertificateIdModelResponse> CertificateUpsert(CertificateAuditDto CertificateObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CertificateAuditsId", CertificateObj.CertificateAuditsId);
            parameters.Add("@CertificateTemplateId", CertificateObj.CertificateTemplateId);
            parameters.Add("@StudentId", CertificateObj.StudentId);
            parameters.Add("@GradeId", CertificateObj.GradeId);
            parameters.Add("@DivisionId", CertificateObj.DivisionId);
            parameters.Add("@AcademicYearId", CertificateObj.AcademicYearId);
            parameters.Add("@IsPublished", CertificateObj.IsPublished ?? false);
            parameters.Add("@Remark", CertificateObj.Remark);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<CertificateIdModelResponse>("uspCertificateUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<CertificateIdModelResponse> LeavingCertificateUpsert(LeavingCertificateDto CertificateObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", CertificateObj.StudentId);
            parameters.Add("@GradeId", CertificateObj.GradeId);
            parameters.Add("@DivisionId", CertificateObj.DivisionId);
            parameters.Add("@StatusId", CertificateObj.StatusId);
            parameters.Add("@Remark", CertificateObj.RemarkCurrent);
            parameters.Add("@Progress", CertificateObj.ProgressCurrent);
            parameters.Add("@Conduct", CertificateObj.ConductCurrent);
            parameters.Add("@DateOfLeavingTheSchool", CertificateObj.DateOfLeavingSchoolCurrent);
            parameters.Add("@StdInWhichStudyingAndSinceWhenInWordsAndFigures", CertificateObj.StandardInWhichStudyingCurrent);
            parameters.Add("@ReasonOfLeavingSchool", CertificateObj.ReasonOfLeavingSchoolCurrent);
            parameters.Add("@DateSignCurrent", CertificateObj.DateSignCurrent);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<CertificateIdModelResponse>("uspLeavingCertificateUpsert", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<StudentNameModelResponse> GetStudentNames(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, bool WithArchive)
        {
            StudentNameModelResponse studentNameModelResponse = new StudentNameModelResponse();


            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            if(WithArchive == true)
            {
                using (var multiResultSet = await db.QueryMultipleAsync("uspStudentNameIsArchiveIncludedSelect", parameters, commandType: CommandType.StoredProcedure))
                {
                    var result = multiResultSet.Read<StudentNameDto>()?.ToList();
                    studentNameModelResponse.StudentNames = result == null ? new List<StudentNameDto>() : result;

                }
            }
            else
            {
                using (var multiResultSet = await db.QueryMultipleAsync("uspStudentNameSelect", parameters, commandType: CommandType.StoredProcedure))
                {
                    var result = multiResultSet.Read<StudentNameDto>()?.ToList();
                    studentNameModelResponse.StudentNames = result == null ? new List<StudentNameDto>() : result;

                }
            }
            
            return studentNameModelResponse;
        }

        public async Task<LeavingCertificateHistory> GetLeavingCertificateHistory(int StudentId)
        {
            LeavingCertificateHistory list = new LeavingCertificateHistory();


            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspLeavingCertificateHistory", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<LeavingCertificateGridDto>()?.ToList();
                list.LeavingCertificateList = result == null ? new List<LeavingCertificateGridDto>() : result;

            }
            return list;
        }

        public async Task<CertificateDto> LeavingCertificatePrintSelect(int LeavingCertificateAuditsId, int StudentId)
        {
            CertificateDto certificateDto = new CertificateDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@LeavingCertificateAuditsId", LeavingCertificateAuditsId);
            parameters.Add("@StudentId", StudentId);
            var leavingCertificateDetails = await db.QueryFirstOrDefaultAsync<LeavingCertificateDto>("uspLeavingCertificatePrintSelect", parameters, commandType: CommandType.StoredProcedure);
            certificateDto.LeavingCertificateDetails = leavingCertificateDetails;
            return certificateDto;
        }

        public async Task<CertificateIdModelResponse> LeavingCertificateStatusUpdate(int LeavingCertificateAuditsId, int StudentId, int StatusId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@LeavingCertificateAuditsId", LeavingCertificateAuditsId);
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@StatusId", StatusId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<CertificateIdModelResponse>("uspLeavingCertificateStatusUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<CertificateIdModelResponse> LeavingCertificateGenerateAsDuplicate(int LeavingCertificateAuditsId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@@LeavingCertificateAuditsIdOld", LeavingCertificateAuditsId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<CertificateIdModelResponse>("uspLeavingCertificateGenerateAsDuplicate", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<DatatableResponseModel> GetListLeavingCertificateSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspViewLeavingCertificateGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<ViewLeavingCertificateDto>()?.ToList();

                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
    }
}

