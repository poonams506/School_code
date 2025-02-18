using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentModule;

namespace SchoolApiApplication.DTO.ImportModule
{
    public class ImportStudentDataDto
    {

        public string Gen_Reg_No { get; set; } = string.Empty;
        public string Admission_No { get; set; } = string.Empty;
        public string Roll_No { get; set; } = string.Empty;
        public string Grade { get; set; } = string.Empty;
        public string Division { get; set; } = string.Empty;
        public DateTime? Admission_Date { get; set; }
        public string CBSC_Student_Id { get; set; } = string.Empty;
        public string Student_First_Name { get; set; } = string.Empty;
        public string Student_Middle_Name { get; set; } = string.Empty;
        public string Student_Last_Name { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Adhaar_No { get; set; } = string.Empty;
        public string Religion { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Cast { get; set; } = string.Empty;
        public string Sub_Caste { get; set; } = string.Empty;
        public string Nationality { get; set; } = string.Empty;
        public string Mother_Tongue { get; set; } = string.Empty;
        public string Emergency_Contact_Person_Name { get; set; } = string.Empty;
        public string Emergency_Contact_No { get; set; } = string.Empty;
        public string Family_Doctor_Name { get; set; } = string.Empty;
        public string Family_Doctor_No { get; set; } = string.Empty;
        public string Birth_Place { get; set; } = string.Empty;
        public DateTime? BirthDate { get; set; }
        public string Date_Of_Birth_In_Words { get; set; } = string.Empty;
        public string Birth_Country { get; set; } = string.Empty;
        public string Birth_State { get; set; } = string.Empty;
        public string Birth_District { get; set; } = string.Empty;
        public string Birth_Taluka { get; set; } = string.Empty;
        public string Current_Address_Line_1 { get; set; } = string.Empty;
        public string Current_Address_Line_2 { get; set; } = string.Empty;
        public string Current_Pincode { get; set; } = string.Empty;
        public string Current_Country { get; set; } = string.Empty;
        public string Current_State { get; set; } = string.Empty;
        public string Current_District { get; set; } = string.Empty;
        public string Current_Taluka { get; set; } = string.Empty;
        public string Blood_Group { get; set; } = string.Empty;
        public decimal? Height { get; set; }
        public decimal? Weight { get; set; }
        public string Medical_History_Notes { get; set; } = string.Empty;
        public string Previous_School_Name { get; set; } = string.Empty;
        public string Previous_School_Standard { get; set; } = string.Empty;
        public string Previous_School_Division { get; set; } = string.Empty;
        public string Progress_Note_From_Last_School { get; set; } = string.Empty;
        public string Conduct_Note_From_Last_School { get; set; } = string.Empty;
        public string Reason_of_Leaving_School { get; set; } = string.Empty;
        public DateTime? Date_of_Leaving_of_Previous_School { get; set; }
        public string Remark { get; set; } = string.Empty;
        public bool Is_New_Student { get; set; }
        public bool Is_Deactive { get; set; }
        public bool Is_RTE { get; set; }
        public bool Apply_Concession { get; set; }
        public decimal? Concession_Fee { get; set; }
        public string Academic_Year { get; set; } = string.Empty;
        public decimal? PreviousAcademicYearPendingFeeAmount { get; set; }
        public bool Do_you_required_parent_mobile_app_access { get; set; }
        public string Mobile_Number_for_Application_Access { get; set; } = string.Empty;
        public string AppAccessOneTimePassword { get; set; } = string.Empty;
        public string PasswordSalt { get; set; } = string.Empty;
        public string Upassword { get; set; } = string.Empty;



        public string Father_First_Name { get; set; } = string.Empty;
        public string Father_Middle_Name { get; set; } = string.Empty;
        public string Father_Last_Name { get; set; } = string.Empty;
        public string Father_Gender { get; set; } = string.Empty;
        public string Father_Mobile_No { get; set; } = string.Empty;
        public string Father_Alternate_Contact_No { get; set; } = string.Empty;
        public string Father_Email_Id { get; set; } = string.Empty;
        public string Father_Address_Line_1 { get; set; } = string.Empty;
        public string Father_Address_Line_2 { get; set; } = string.Empty;
        public string Father_Country { get; set; } = string.Empty;
        public string Father_State { get; set; } = string.Empty;
        public string Father_District { get; set; } = string.Empty;
        public string Father_Taluka { get; set; } = string.Empty;
        public string Father_Pincode { get; set; } = string.Empty;
        public string Father_Adhaar_No { get; set; } = string.Empty;
        public string Father_Education { get; set; } = string.Empty;
        public DateTime? Father_Birth_Date { get; set; }
        public string Father_Occupation { get; set; } = string.Empty;
        public decimal? Father_Annual_Income { get; set; }
        public string Father_Blood_Group { get; set; } = string.Empty;


        public string Mother_First_Name { get; set; } = string.Empty;
        public string Mother_Middle_Name { get; set; } = string.Empty;
        public string Mother_Last_Name { get; set; } = string.Empty;
        public string Mother_Gender { get; set; } = string.Empty;
        public string Mother_Mobile_No { get; set; } = string.Empty;
        public string Mother_Alternate_Contact_No { get; set; } = string.Empty;
        public string Mother_Email_Id { get; set; } = string.Empty;
        public string Mother_Address_Line_1 { get; set; } = string.Empty;
        public string Mother_Address_Line_2 { get; set; } = string.Empty;
        public string Mother_Country { get; set; } = string.Empty;
        public string Mother_State { get; set; } = string.Empty;
        public string Mother_District { get; set; } = string.Empty;
        public string Mother_Taluka { get; set; } = string.Empty;
        public string Mother_Pincode { get; set; } = string.Empty;
        public string Mother_Adhaar_No { get; set; } = string.Empty;
        public string Mother_Education { get; set; } = string.Empty;
        public DateTime? Mother_Birth_Date { get; set; }
        public string Mother_Occupation { get; set; } = string.Empty;
        public decimal? Mother_Annual_Income { get; set; }
        public string Mother_Blood_Group { get; set; } = string.Empty;


        public string Guardian_First_Name { get; set; } = string.Empty;
        public string Guardian_Middle_Name { get; set; } = string.Empty;
        public string Guardian_Last_Name { get; set; } = string.Empty;
        public string Guardian_Gender { get; set; } = string.Empty;
        public string Guardian_Mobile_No { get; set; } = string.Empty;
        public string Guardian_Alternate_Contact_No { get; set; } = string.Empty;
        public string Guardian_Email_Id { get; set; } = string.Empty;
        public string Guardian_Address_Line_1 { get; set; } = string.Empty;
        public string Guardian_Address_Line_2 { get; set; } = string.Empty;
        public string Guardian_Country { get; set; } = string.Empty;
        public string Guardian_State { get; set; } = string.Empty;
        public string Guardian_District { get; set; } = string.Empty;
        public string Guardian_Taluka { get; set; } = string.Empty;
        public string Guardian_Pincode { get; set; } = string.Empty;
        public string Guardian_Adhaar_No { get; set; } = string.Empty;
        public string Guardian_Education { get; set; } = string.Empty;
        public DateTime? Guardian_Birth_Date { get; set; }
        public string Guardian_Occupation { get; set; } = string.Empty;
        public decimal? Guardian_Annual_Income { get; set; }
        public string Guardian_Blood_Group { get; set; } = string.Empty;


        public int? Current_CountryId { get; set; }
        public int? Current_StateId { get; set; }
        public int? Current_DistrictId { get; set; }
        public int? Current_TalukaId { get; set; }
        public int? Birth_CountryId { get; set; }
        public int? Birth_StateId { get; set; }
        public int? Birth_DistrictId { get; set; }
        public int? Birth_TalukaId { get; set; }
        public int? Father_CountryId { get; set; }
        public int? Father_StateId { get; set; }
        public int? Father_DistrictId { get; set; }
        public int? Father_TalukaId { get; set; }
        public int? Mother_CountryId { get; set; }
        public int? Mother_StateId { get; set; }
        public int? Mother_DistrictId { get; set; }
        public int? Mother_TalukaId { get; set; }
        public int? Gaurdian_CountryId { get; set; }
        public int? Gaurdian_StateId { get; set; }
        public int? Gaurdian_DistrictId { get; set; }
        public int? Gaurdian_TalukaId { get; set; }


    }
    public class ResponseImportStudentDataDto
    {
        public List<ResposnsePaymentHistory> HasPaymentHistoryList { get; set; } = new List<ResposnsePaymentHistory>();
        public List<ResposnseDublicateGenRegNo> HasDublicateGenRegNoList { get; set; } = new List<ResposnseDublicateGenRegNo>();
        public List<ImportStudentDataDto> Students { get; set; } = new List<ImportStudentDataDto>();

        public int Suceess { get; set; }
        public int InsertedCount { get; set; } = 0;
        public int UpdatedCount { get; set; } = 0;

    }
    public class ResposnsePaymentHistory {
        public string Student_First_Name { get; set; } = string.Empty;
        public string Student_Middle_Name { get; set; } = string.Empty;
        public string Student_Last_Name { get; set; } = string.Empty;
        public int HasPaymentHistory { get; set; } = 0;
       
    }
    public class ResposnseDublicateGenRegNo
    {
        public string Student_First_Name { get; set; } = string.Empty;
        public string Student_Middle_Name { get; set; } = string.Empty;
        public string Student_Last_Name { get; set; } = string.Empty;
        public int StudentId { get; set; } = 0;
        public int GenRegNoExist { get; set; } = 0;

    }
    public class MasterListDto
    {
        public List<SchoolGradeDivisionMatrixDto> SchoolGradeDivisionMatrixCascadeList { get; set; }=new List<SchoolGradeDivisionMatrixDto>();
        public List<Grade> Grades { get; set; } = new List<Grade>();
        public List<Division> Divisions { get; set; } = new List<Division>();
        public List<CountryMasterDto> CountryList { get; set; } = new List<CountryMasterDto>();
        public List<StateMasterDto> StateList { get; set; }=new List<StateMasterDto>();
        public List<DistrictMasterDto> DistrictList { get; set; }=new List<DistrictMasterDto>();
        public List<TalukaMasterDto> TalukaList { get; set; }=new List<TalukaMasterDto>();
        public List<AcademicYear> AcademicYears { get; set; } = new List<AcademicYear>();
    }
}
