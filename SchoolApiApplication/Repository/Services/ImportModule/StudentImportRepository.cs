using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.Certificate_Module;
using SchoolApiApplication.DTO.ImportModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Helper;
using SchoolApiApplication.Repository.Interfaces.ImportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ImportModule
{
    public class StudentImportRepository : IStudentImportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentImportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ResponseImportStudentDataDto> UploadStudentData(List<ImportStudentDataDto> studentDataListDto, int UserId,string schoolCode)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable documentDT = new DataTable();
           ResponseImportStudentDataDto responseImportStudentDataDto = new ResponseImportStudentDataDto();
            ResposnseDublicateGenRegNo responseDblicateGenRegNo = new ResposnseDublicateGenRegNo();



            documentDT.Columns.Add(nameof(ImportStudentDataDto.CBSC_Student_Id), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Gen_Reg_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Admission_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Roll_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Grade), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Division), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Admission_Date), typeof(DateTime));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Student_First_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Student_Middle_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Student_Last_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Gender), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Adhaar_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Religion), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Category), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Cast), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Sub_Caste), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Nationality), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Tongue), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Emergency_Contact_Person_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Emergency_Contact_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Family_Doctor_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Family_Doctor_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_Place), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.BirthDate), typeof(DateTime));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Date_Of_Birth_In_Words), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_Country), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_State), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_District), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_Taluka), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_Address_Line_1), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_Address_Line_2), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_Pincode), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_Country), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_State), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_District), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_Taluka), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Blood_Group), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Height), typeof(decimal));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Weight), typeof(decimal));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Medical_History_Notes), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Previous_School_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Previous_School_Standard), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Previous_School_Division), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Progress_Note_From_Last_School), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Conduct_Note_From_Last_School), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Reason_of_Leaving_School), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Date_of_Leaving_of_Previous_School), typeof(DateTime));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Remark), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Is_New_Student), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Is_Deactive), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Is_RTE), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Apply_Concession), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Concession_Fee), typeof(decimal)); 
            documentDT.Columns.Add(nameof(ImportStudentDataDto.PreviousAcademicYearPendingFeeAmount), typeof(decimal));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Academic_Year), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Do_you_required_parent_mobile_app_access), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mobile_Number_for_Application_Access), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.AppAccessOneTimePassword), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.PasswordSalt), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Upassword), typeof(string));


            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_First_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Middle_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Last_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Gender), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Mobile_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Alternate_Contact_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Email_Id), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Address_Line_1), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Address_Line_2), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Country), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_State), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_District), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Taluka), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Pincode), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Adhaar_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Education), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Birth_Date), typeof(DateTime));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Occupation), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Annual_Income), typeof(decimal));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_Blood_Group), typeof(string));

            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_First_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Middle_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Last_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Gender), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Mobile_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Alternate_Contact_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Email_Id), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Address_Line_1), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Address_Line_2), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Country), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_State), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_District), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Taluka), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Pincode), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Adhaar_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Education), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Birth_Date), typeof(DateTime));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Occupation), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Annual_Income), typeof(decimal));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_Blood_Group), typeof(string));

            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_First_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Middle_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Last_Name), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Gender), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Mobile_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Alternate_Contact_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Email_Id), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Address_Line_1), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Address_Line_2), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Country), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_State), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_District), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Taluka), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Pincode), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Adhaar_No), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Education), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Birth_Date), typeof(DateTime));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Occupation), typeof(string));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Annual_Income), typeof(decimal));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Guardian_Blood_Group), typeof(string));

            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_CountryId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_StateId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_DistrictId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Current_TalukaId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_CountryId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_StateId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_DistrictId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Birth_TalukaId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_CountryId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_StateId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_DistrictId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Father_TalukaId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_CountryId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_StateId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_DistrictId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Mother_TalukaId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Gaurdian_CountryId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Gaurdian_StateId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Gaurdian_DistrictId), typeof(int));
            documentDT.Columns.Add(nameof(ImportStudentDataDto.Gaurdian_TalukaId), typeof(int));


            studentDataListDto.ForEach(document =>
            {
                var row = documentDT.NewRow();
                
                row[nameof(ImportStudentDataDto.Gen_Reg_No)] = document.Gen_Reg_No;
                row[nameof(ImportStudentDataDto.Admission_No)] = document.Admission_No == null ? DBNull.Value : document.Admission_No;
                row[nameof(ImportStudentDataDto.Roll_No)] = document.Roll_No;
                row[nameof(ImportStudentDataDto.Grade)] = document.Grade;
                row[nameof(ImportStudentDataDto.Division)] = document.Division;
                row[nameof(ImportStudentDataDto.Admission_Date)] = document.Admission_Date;
                row[nameof(ImportStudentDataDto.CBSC_Student_Id)] = document.CBSC_Student_Id;
                row[nameof(ImportStudentDataDto.Student_First_Name)] = document.Student_First_Name;
                row[nameof(ImportStudentDataDto.Student_Middle_Name)] = document.Student_Middle_Name;
                row[nameof(ImportStudentDataDto.Student_Last_Name)] = document.Student_Last_Name;
                row[nameof(ImportStudentDataDto.Gender)] = document.Gender;
                row[nameof(ImportStudentDataDto.Adhaar_No)] = document.Adhaar_No;
                row[nameof(ImportStudentDataDto.Religion)] = document.Religion;
                row[nameof(ImportStudentDataDto.Category)] = document.Category;
                row[nameof(ImportStudentDataDto.Cast)] = document.Cast;
                row[nameof(ImportStudentDataDto.Sub_Caste)] = document.Sub_Caste;
                row[nameof(ImportStudentDataDto.Nationality)] = document.Nationality;
                row[nameof(ImportStudentDataDto.Mother_Tongue)] = document.Mother_Tongue;
                row[nameof(ImportStudentDataDto.Emergency_Contact_Person_Name)] = document.Emergency_Contact_Person_Name;
                row[nameof(ImportStudentDataDto.Emergency_Contact_No)] = document.Emergency_Contact_No;
                row[nameof(ImportStudentDataDto.Family_Doctor_Name)] = document.Family_Doctor_Name;
                row[nameof(ImportStudentDataDto.Family_Doctor_No)] = document.Family_Doctor_No;
                row[nameof(ImportStudentDataDto.Birth_Place)] = document.Birth_Place;
                row[nameof(ImportStudentDataDto.BirthDate)] = document.BirthDate == null ? DBNull.Value : document.BirthDate; 
                row[nameof(ImportStudentDataDto.Date_Of_Birth_In_Words)] = document.Date_Of_Birth_In_Words;
                row[nameof(ImportStudentDataDto.Birth_Country)] = document.Birth_Country;
                row[nameof(ImportStudentDataDto.Birth_State)] = document.Birth_State;
                row[nameof(ImportStudentDataDto.Birth_District)] = document.Birth_District;
                row[nameof(ImportStudentDataDto.Birth_Taluka)] = document.Birth_Taluka;
                row[nameof(ImportStudentDataDto.Current_Address_Line_1)] = document.Current_Address_Line_1;
                row[nameof(ImportStudentDataDto.Current_Address_Line_2)] = document.Current_Address_Line_2;
                row[nameof(ImportStudentDataDto.Current_Pincode)] = document.Current_Pincode;
                row[nameof(ImportStudentDataDto.Current_Country)] = document.Current_Country;
                row[nameof(ImportStudentDataDto.Current_State)] = document.Current_State;
                row[nameof(ImportStudentDataDto.Current_District)] = document.Current_District;
                row[nameof(ImportStudentDataDto.Current_Taluka)] = document.Current_Taluka;
                row[nameof(ImportStudentDataDto.Blood_Group)] = document.Blood_Group;
                row[nameof(ImportStudentDataDto.Height)] = document.Height == null ? DBNull.Value : document.Height;
                row[nameof(ImportStudentDataDto.Weight)] = document.Weight == null ? DBNull.Value : document.Weight;
                row[nameof(ImportStudentDataDto.Medical_History_Notes)] = document.Medical_History_Notes;
                row[nameof(ImportStudentDataDto.Previous_School_Name)] = document.Previous_School_Name;
                row[nameof(ImportStudentDataDto.Previous_School_Standard)] = document.Previous_School_Standard;
                row[nameof(ImportStudentDataDto.Previous_School_Division)] = document.Previous_School_Division;
                row[nameof(ImportStudentDataDto.Progress_Note_From_Last_School)] = document.Progress_Note_From_Last_School;
                row[nameof(ImportStudentDataDto.Conduct_Note_From_Last_School)] = document.Conduct_Note_From_Last_School;
                row[nameof(ImportStudentDataDto.Reason_of_Leaving_School)] = document.Reason_of_Leaving_School;
                row[nameof(ImportStudentDataDto.Date_of_Leaving_of_Previous_School)] = document.Date_of_Leaving_of_Previous_School == null ? DBNull.Value : document.Date_of_Leaving_of_Previous_School;
                row[nameof(ImportStudentDataDto.Remark)] = document.Remark;
                row[nameof(ImportStudentDataDto.Is_New_Student)] = document.Is_New_Student;
                row[nameof(ImportStudentDataDto.Is_Deactive)] = document.Is_Deactive;
                row[nameof(ImportStudentDataDto.Is_RTE)] = document.Is_RTE;
                row[nameof(ImportStudentDataDto.Apply_Concession)] = document.Apply_Concession;
                row[nameof(ImportStudentDataDto.Concession_Fee)] = document.Concession_Fee == null ? DBNull.Value : document.Concession_Fee;
                row[nameof(ImportStudentDataDto.PreviousAcademicYearPendingFeeAmount)] = document.PreviousAcademicYearPendingFeeAmount == null ? DBNull.Value : document.PreviousAcademicYearPendingFeeAmount;
                row[nameof(ImportStudentDataDto.Academic_Year)] = document.Academic_Year;
                row[nameof(ImportStudentDataDto.Do_you_required_parent_mobile_app_access)] = document.Do_you_required_parent_mobile_app_access;
                row[nameof(ImportStudentDataDto.Mobile_Number_for_Application_Access)] = document.Mobile_Number_for_Application_Access;


                if (document.Do_you_required_parent_mobile_app_access)
                {
                    var AppAccessOneTimePassword = document.Student_First_Name.ToUpper().Trim() + document.BirthDate.Value.Day.ToString("d2") + document.BirthDate.Value.Month.ToString("d2");
                    row[nameof(ImportStudentDataDto.AppAccessOneTimePassword)] = AppAccessOneTimePassword;
                    string salt = PasswordHelper.GenerateSalt(4);
                    row[nameof(ImportStudentDataDto.PasswordSalt)] = salt;
                    if (AppAccessOneTimePassword != null)
                    {
                        row[nameof(ImportStudentDataDto.Upassword)] = PasswordHelper.HashPassword(Convert.ToString(AppAccessOneTimePassword), salt);
                    }
                }


                row[nameof(ImportStudentDataDto.Father_First_Name)] = document.Father_First_Name;
                row[nameof(ImportStudentDataDto.Father_Middle_Name)] = document.Father_Middle_Name;
                row[nameof(ImportStudentDataDto.Father_Last_Name)] = document.Father_Last_Name;
                row[nameof(ImportStudentDataDto.Father_Gender)] = document.Father_Gender;
                row[nameof(ImportStudentDataDto.Father_Mobile_No)] = document.Father_Mobile_No;
                row[nameof(ImportStudentDataDto.Father_Alternate_Contact_No)] = document.Father_Alternate_Contact_No;
                row[nameof(ImportStudentDataDto.Father_Email_Id)] = document.Father_Email_Id;
                row[nameof(ImportStudentDataDto.Father_Address_Line_1)] = document.Father_Address_Line_1;
                row[nameof(ImportStudentDataDto.Father_Address_Line_2)] = document.Father_Address_Line_2;
                row[nameof(ImportStudentDataDto.Father_Country)] = document.Father_Country;
                row[nameof(ImportStudentDataDto.Father_State)] = document.Father_State;
                row[nameof(ImportStudentDataDto.Father_District)] = document.Father_District;
                row[nameof(ImportStudentDataDto.Father_Taluka)] = document.Father_Taluka;
                row[nameof(ImportStudentDataDto.Father_Pincode)] = document.Father_Pincode;
                row[nameof(ImportStudentDataDto.Father_Adhaar_No)] = document.Father_Adhaar_No;
                row[nameof(ImportStudentDataDto.Father_Education)] = document.Father_Education;
                row[nameof(ImportStudentDataDto.Father_Birth_Date)] = document.Father_Birth_Date == null ? DBNull.Value : document.Father_Birth_Date; 
                row[nameof(ImportStudentDataDto.Father_Occupation)] = document.Father_Occupation;
                row[nameof(ImportStudentDataDto.Father_Annual_Income)] = document.Father_Annual_Income == null ? DBNull.Value : document.Father_Annual_Income;
                row[nameof(ImportStudentDataDto.Father_Blood_Group)] = document.Father_Blood_Group;

                row[nameof(ImportStudentDataDto.Mother_First_Name)] = document.Mother_First_Name;
                row[nameof(ImportStudentDataDto.Mother_Middle_Name)] = document.Mother_Middle_Name;
                row[nameof(ImportStudentDataDto.Mother_Last_Name)] = document.Mother_Last_Name;
                row[nameof(ImportStudentDataDto.Mother_Gender)] = document.Mother_Gender;
                row[nameof(ImportStudentDataDto.Mother_Mobile_No)] = document.Mother_Mobile_No;
                row[nameof(ImportStudentDataDto.Mother_Alternate_Contact_No)] = document.Mother_Alternate_Contact_No;
                row[nameof(ImportStudentDataDto.Mother_Email_Id)] = document.Mother_Email_Id;
                row[nameof(ImportStudentDataDto.Mother_Address_Line_1)] = document.Mother_Address_Line_1;
                row[nameof(ImportStudentDataDto.Mother_Address_Line_2)] = document.Mother_Address_Line_2;
                row[nameof(ImportStudentDataDto.Mother_Country)] = document.Mother_Country;
                row[nameof(ImportStudentDataDto.Mother_State)] = document.Mother_State;
                row[nameof(ImportStudentDataDto.Mother_District)] = document.Mother_District;
                row[nameof(ImportStudentDataDto.Mother_Taluka)] = document.Mother_Taluka;
                row[nameof(ImportStudentDataDto.Mother_Pincode)] = document.Mother_Pincode;
                row[nameof(ImportStudentDataDto.Mother_Adhaar_No)] = document.Mother_Adhaar_No;
                row[nameof(ImportStudentDataDto.Mother_Education)] = document.Mother_Education;
                row[nameof(ImportStudentDataDto.Mother_Birth_Date)] = document.Mother_Birth_Date == null ? DBNull.Value : document.Mother_Birth_Date;
                row[nameof(ImportStudentDataDto.Mother_Occupation)] = document.Mother_Occupation;
                row[nameof(ImportStudentDataDto.Mother_Annual_Income)] = document.Mother_Annual_Income == null ? DBNull.Value : document.Mother_Annual_Income; ;
                row[nameof(ImportStudentDataDto.Mother_Blood_Group)] = document.Mother_Blood_Group;

                row[nameof(ImportStudentDataDto.Guardian_First_Name)] = document.Guardian_First_Name;
                row[nameof(ImportStudentDataDto.Guardian_Middle_Name)] = document.Guardian_Middle_Name;
                row[nameof(ImportStudentDataDto.Guardian_Last_Name)] = document.Guardian_Last_Name;
                row[nameof(ImportStudentDataDto.Guardian_Gender)] = document.Guardian_Gender;
                row[nameof(ImportStudentDataDto.Guardian_Mobile_No)] = document.Guardian_Mobile_No;
                row[nameof(ImportStudentDataDto.Guardian_Alternate_Contact_No)] = document.Guardian_Alternate_Contact_No;
                row[nameof(ImportStudentDataDto.Guardian_Email_Id)] = document.Guardian_Email_Id;
                row[nameof(ImportStudentDataDto.Guardian_Address_Line_1)] = document.Guardian_Address_Line_1;
                row[nameof(ImportStudentDataDto.Guardian_Address_Line_2)] = document.Guardian_Address_Line_2;
                row[nameof(ImportStudentDataDto.Guardian_Country)] = document.Guardian_Country;
                row[nameof(ImportStudentDataDto.Guardian_State)] = document.Guardian_State;
                row[nameof(ImportStudentDataDto.Guardian_District)] = document.Guardian_District;
                row[nameof(ImportStudentDataDto.Guardian_Taluka)] = document.Guardian_Taluka;
                row[nameof(ImportStudentDataDto.Guardian_Pincode)] = document.Guardian_Pincode;
                row[nameof(ImportStudentDataDto.Guardian_Adhaar_No)] = document.Guardian_Adhaar_No;
                row[nameof(ImportStudentDataDto.Guardian_Education)] = document.Guardian_Education;
                row[nameof(ImportStudentDataDto.Guardian_Birth_Date)] = document.Guardian_Birth_Date == null ? DBNull.Value : document.Guardian_Birth_Date;
                row[nameof(ImportStudentDataDto.Guardian_Occupation)] = document.Guardian_Occupation;
                row[nameof(ImportStudentDataDto.Guardian_Annual_Income)] = document.Guardian_Annual_Income ==null ? DBNull.Value: document.Guardian_Annual_Income;
                row[nameof(ImportStudentDataDto.Guardian_Blood_Group)] = document.Guardian_Blood_Group;

                row[nameof(ImportStudentDataDto.Current_CountryId)] = document.Current_CountryId;
                row[nameof(ImportStudentDataDto.Current_StateId)] = document.Current_StateId;
                row[nameof(ImportStudentDataDto.Current_DistrictId)] = document.Current_DistrictId;
                row[nameof(ImportStudentDataDto.Current_TalukaId)] = document.Current_TalukaId;
                row[nameof(ImportStudentDataDto.Birth_CountryId)] = document.Birth_CountryId;
                row[nameof(ImportStudentDataDto.Birth_StateId)] = document.Birth_StateId;
                row[nameof(ImportStudentDataDto.Birth_DistrictId)] = document.Birth_DistrictId;
                row[nameof(ImportStudentDataDto.Birth_TalukaId)] = document.Birth_TalukaId;
                row[nameof(ImportStudentDataDto.Father_CountryId)] = document.Father_CountryId == 0 ? DBNull.Value : document.Father_CountryId; ;
                row[nameof(ImportStudentDataDto.Father_StateId)] = document.Father_StateId == 0 ? DBNull.Value : document.Father_StateId; ;
                row[nameof(ImportStudentDataDto.Father_DistrictId)] = document.Father_DistrictId== 0  ? DBNull.Value : document.Father_DistrictId; ;
                row[nameof(ImportStudentDataDto.Father_TalukaId)] = document.Father_TalukaId == 0 ? DBNull.Value : document.Father_TalukaId; ;
                row[nameof(ImportStudentDataDto.Mother_CountryId)] = document.Mother_CountryId == 0 ? DBNull.Value : document.Mother_CountryId; ;
                row[nameof(ImportStudentDataDto.Mother_StateId)] = document.Mother_StateId == 0 ? DBNull.Value : document.Mother_StateId; ;
                row[nameof(ImportStudentDataDto.Mother_DistrictId)] = document.Mother_DistrictId == 0 ? DBNull.Value : document.Mother_DistrictId; ;
                row[nameof(ImportStudentDataDto.Mother_TalukaId)] = document.Mother_TalukaId == 0 ? DBNull.Value : document.Mother_TalukaId; ;
                row[nameof(ImportStudentDataDto.Gaurdian_CountryId)] = document.Gaurdian_CountryId == 0 ? DBNull.Value : document.Gaurdian_CountryId; ;
                row[nameof(ImportStudentDataDto.Gaurdian_StateId)] = document.Gaurdian_StateId == 0 ? DBNull.Value : document.Gaurdian_StateId; ;
                row[nameof(ImportStudentDataDto.Gaurdian_DistrictId)] = document.Gaurdian_DistrictId == 0 ? DBNull.Value : document.Gaurdian_DistrictId; ;
                row[nameof(ImportStudentDataDto.Gaurdian_TalukaId)] = document.Gaurdian_TalukaId == 0 ? DBNull.Value : document.Gaurdian_TalukaId; ;

                documentDT.Rows.Add(row);
            });

            var parameters = new
            {
                UserId,
                schoolCode,
                StudentImportType = documentDT.AsTableValuedParameter("[dbo].[StudentImportType]")

            };
            var parameters2 = new
            {
                StudentImportType = documentDT.AsTableValuedParameter("[dbo].[StudentImportType]")

            };
            using (var multiResultSet = await db.QueryMultipleAsync("uspCheckGeneralRegNoExist", parameters2, commandType: CommandType.StoredProcedure))
            {
                responseImportStudentDataDto.HasDublicateGenRegNoList = multiResultSet.Read<ResposnseDublicateGenRegNo>().ToList();

            }
            using (var multiResultSet = await db.QueryMultipleAsync("uspCheckPaymentHistoryForStudent", parameters2, commandType: CommandType.StoredProcedure))
            {
                responseImportStudentDataDto.HasPaymentHistoryList = multiResultSet.Read<ResposnsePaymentHistory>().ToList();
                
            }
            var hasPaymentHistoryCount = responseImportStudentDataDto.HasPaymentHistoryList.Count(x => x.HasPaymentHistory == 1);
            var hasDublicateGenRegNoCount = responseImportStudentDataDto.HasDublicateGenRegNoList.Count(x => x.GenRegNoExist == 1);
            if (hasPaymentHistoryCount <= 0 && hasDublicateGenRegNoCount <=0)
            { 
                    return await db.QueryFirstOrDefaultAsync<ResponseImportStudentDataDto>("uspImportStudentData", parameters, commandType: CommandType.StoredProcedure);
            }
            return responseImportStudentDataDto;
        }


       
    }
}
