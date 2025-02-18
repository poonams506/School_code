using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.Repository.Interfaces.SchoolModule;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.DTO.SchoolModule;
using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.Repository.Services.SchoolModule
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _config;
        public SchoolRepository(IHttpContextAccessor httpContextAccessor,
            IConfiguration config)
        {
            _httpContextAccessor = httpContextAccessor;
            _config = config;
        }

        public async Task<SchoolDto> GetSchoolProfile(Int16 SchoolId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolId", SchoolId);
            return await db.QueryFirstOrDefaultAsync<SchoolDto>("uspSchoolSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<int> SchoolProfileUpsert(SchoolDto SchoolObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolId", SchoolObj.SchoolId);
            parameters.Add("@SchoolName", SchoolObj.SchoolName);
            parameters.Add("@SchoolCode", SchoolObj.SchoolCode);
            parameters.Add("@SchoolCodeNo", SchoolObj.SchoolCodeNo);
            parameters.Add("@SchoolEmail", SchoolObj.SchoolEmail);
            parameters.Add("@SchoolContactNo1", SchoolObj.SchoolContactNo1);
            parameters.Add("@SchoolContactNo2", SchoolObj.SchoolContactNo2);
            parameters.Add("@SchoolAddressLine1", SchoolObj.SchoolAddressLine1);
            parameters.Add("@SchoolAddressLine2", SchoolObj.SchoolAddressLine2);
            parameters.Add("@TalukaId", SchoolObj.TalukaId);
            parameters.Add("@DistrictId", SchoolObj.DistrictId);
            parameters.Add("@StateId", SchoolObj.StateId);
            parameters.Add("@CountryId", SchoolObj.CountryId);
            parameters.Add("@TalukaName", SchoolObj.TalukaName);
            parameters.Add("@DistrictName", SchoolObj.DistrictName);
            parameters.Add("@StateName", SchoolObj.StateName);
            parameters.Add("@CountryName", SchoolObj.CountryName);
            parameters.Add("@Pincode", SchoolObj.Pincode);
            parameters.Add("@EstablishmentDate", SchoolObj.EstablishmentDate);
            parameters.Add("@SchoolRank", SchoolObj.SchoolRank);
            parameters.Add("@SchoolWebsiteUrl", SchoolObj.SchoolWebsiteUrl);
            parameters.Add("@LogoUrl", SchoolObj.LogoUrl);
            parameters.Add("@BannerUrl", SchoolObj.BannerUrl);
            parameters.Add("@SchoolDescription", SchoolObj.SchoolDescription);
            parameters.Add("@ContactPersonName", SchoolObj.ContactPersonName);
            parameters.Add("@ContactPersonRole", SchoolObj.ContactPersonRole);
            parameters.Add("@ContactPersonEmail", SchoolObj.ContactPersonEmail);
            parameters.Add("@ContactPersonMobileNo", SchoolObj.ContactPersonMobileNo);
            parameters.Add("@AcademicYearId", SchoolObj.AcademicYearId);
            parameters.Add("@AuthorisedBy", SchoolObj.AuthorisedBy);
            parameters.Add("@Section", SchoolObj.Section);
            parameters.Add("@SchoolMediumId", SchoolObj.SchoolMediumId);
            parameters.Add("@SchoolType", SchoolObj.SchoolType);
            parameters.Add("@UdiseNumber", SchoolObj.UdiseNumber);
            parameters.Add("@Board", SchoolObj.Board);
            parameters.Add("@AffiliationNumber", SchoolObj.AffiliationNumber);
            parameters.Add("@HscOrSscIndexNo", SchoolObj.HscOrSscIndexNo);
            parameters.Add("@SchoolPermission", SchoolObj.SchoolPermission);
            parameters.Add("@RegistrationNumber", SchoolObj.RegistrationNumber);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspSchoolUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<SchoolSettingDto> GetSchoolSettingProfile(short SchoolId,int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolId", SchoolId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolSettingSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                SchoolSettingDto schoolSettingDto = multiResultSet.Read<SchoolSettingDto>().First();
                schoolSettingDto.MonthList = multiResultSet.Read<int>().ToList();
                return schoolSettingDto;
            }
           
        }
        public async Task<int> SchoolSettingUpsert(SchoolSettingDto SchoolObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string));

            SchoolObj.MonthList.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });


            var parameters = new
            {
                SchoolObj.SchoolId,
                SchoolObj.AcademicYearId,
                SchoolObj.AccountNumber,
                SchoolObj.AccountTypeId,
                SchoolObj.IFSCCode,
                SchoolObj.AccountName,
                SchoolObj.AcademicYearStartMonth,
                SchoolObj.InvoiceNoPrefix,
                SchoolObj.InvoiceNoStartNumber,
                SchoolObj.TransportInvoiceNoPrefix,
                SchoolObj.TransportInvoiceNoStartNumber,
                SchoolObj.AdditionalFeeInvoiceNoPrefix,
                SchoolObj.AdditionalFeeInvoiceNoStartNumber,
                SchoolObj.SchoolKitInvoiceNoPrefix,
                SchoolObj.SchoolKitInvoiceNoStartNumber,
                SchoolObj.RegistrationFeeInvoiceNoPrefix,
                SchoolObj.RegistrationFeeInvoiceNoStartNumber,
                SchoolObj.SerialNoStartNumber,
                SchoolObj.LangaugeCode,
                SchoolObj.IsSharedTransport,
                SchoolObj.IsFeeApplicableToStaff,
                UserId,
                MonthList = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };
            return await db.QueryFirstOrDefaultAsync<int>("uspSchoolSettingUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<AppVersionDto> GetCurrentSchoolAppVersion()
        {
            using IDbConnection db = new SqlConnection(_config.GetConnectionString("SchoolDatabase"));
            return await db.QueryFirstOrDefaultAsync<AppVersionDto>("uspSchoolAppversionSelect", commandType: CommandType.StoredProcedure);

        }

    }
}
