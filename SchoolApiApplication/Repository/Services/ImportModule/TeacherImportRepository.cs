using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ImportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Helper;
using SchoolApiApplication.Repository.Interfaces.ImportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ImportModule
{
    public class TeacherImportRepository : ITeacherImportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherImportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ResponseImportTeacherDataDto> UploadTeacherData(List<ImportTeacherDataDto> TeacherDataList, int UserId, string schoolCode)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable documentDT = new DataTable();
            ImportTeacherDataDto dto = new ImportTeacherDataDto();

           
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.FirstName), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.MiddleName), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.LastName), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.Gender), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.MobileNumber), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.ContactNumber), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.EmailId), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.AddressLine1), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.AddressLine2), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.CountryName), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.StateName), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.DistrictName), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.TalukaName), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.Pincode), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.AdharNumber), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.Education), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.BirthDate), typeof(DateTime));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.BloodGroup), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.IsAppAccess), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.AppAccessMobileNo), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.AppAccessOneTimePassword), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.PasswordSalt), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Upassword), typeof(string));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.CountryId), typeof(int));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.StateId), typeof(int));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.DistrictId), typeof(int));
            documentDT.Columns.Add(nameof(ImportTeacherDataDto.TalukaId), typeof(int));

            TeacherDataList.ForEach(document =>
            {
                var row = documentDT.NewRow();
               
                row[nameof(ImportTeacherDataDto.FirstName)] = document.FirstName;
                row[nameof(ImportTeacherDataDto.MiddleName)] = document.MiddleName;
                row[nameof(ImportTeacherDataDto.LastName)] = document.LastName;
                row[nameof(ImportTeacherDataDto.Gender)] = document.Gender;
                row[nameof(ImportTeacherDataDto.MobileNumber)] = document.MobileNumber;
                row[nameof(ImportTeacherDataDto.ContactNumber)] = document.ContactNumber;
                row[nameof(ImportTeacherDataDto.EmailId)] = document.EmailId;
                row[nameof(ImportTeacherDataDto.AddressLine1)] = document.AddressLine1;
                row[nameof(ImportTeacherDataDto.AddressLine2)] = document.AddressLine2;
                row[nameof(ImportTeacherDataDto.CountryName)] = document.CountryName;
                row[nameof(ImportTeacherDataDto.StateName)] = document.StateName;
                row[nameof(ImportTeacherDataDto.DistrictName)] = document.DistrictName;
                row[nameof(ImportTeacherDataDto.TalukaName)] = document.TalukaName;
                row[nameof(ImportTeacherDataDto.Pincode)] = document.Pincode;
                row[nameof(ImportTeacherDataDto.AdharNumber)] = document.AdharNumber;
                row[nameof(ImportTeacherDataDto.Education)] = document.Education;
                row[nameof(ImportTeacherDataDto.BirthDate)] = document.BirthDate == null ? DBNull.Value : document.BirthDate;
                row[nameof(ImportTeacherDataDto.BloodGroup)] = document.BloodGroup;
                row[nameof(ImportTeacherDataDto.IsAppAccess)] = document.IsAppAccess;
                row[nameof(ImportTeacherDataDto.AppAccessMobileNo)] = document.AppAccessMobileNo;
                if (document.IsAppAccess == true)
                {
                    var AppAccessOneTimePassword = document.FirstName.ToUpper().Trim() + document.BirthDate.Value.Day.ToString("d2") + document.BirthDate.Value.Month.ToString("d2");
                    row[nameof(ImportStudentDataDto.AppAccessOneTimePassword)] = AppAccessOneTimePassword;
                    string salt = PasswordHelper.GenerateSalt(4);
                    row[nameof(ImportStudentDataDto.PasswordSalt)] = salt;
                    if (AppAccessOneTimePassword != null)
                    {
                        row[nameof(ImportStudentDataDto.Upassword)] = PasswordHelper.HashPassword(Convert.ToString(AppAccessOneTimePassword), salt);
                    }
                }
                row[nameof(ImportTeacherDataDto.CountryId)] = document.CountryId;
                row[nameof(ImportTeacherDataDto.StateId)] = document.StateId;
                row[nameof(ImportTeacherDataDto.DistrictId)] = document.DistrictId;
                row[nameof(ImportTeacherDataDto.TalukaId)] = document.TalukaId;


                documentDT.Rows.Add(row);
            });

            var parameters = new
            {
                UserId,
                schoolCode,
                TeacherImportType = documentDT.AsTableValuedParameter("[dbo].[TeacherImportType]")

            };

            return await db.QueryFirstOrDefaultAsync<ResponseImportTeacherDataDto>("uspImportTeacherData", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
