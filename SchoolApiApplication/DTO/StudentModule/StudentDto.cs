using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.Identity.Client;
using NLog.LayoutRenderers;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolModule;

namespace SchoolApiApplication.DTO.StudentModule
{
    public class StudentDto
    {
        public long? StudentId { get; set; }
        public int? ClassId { get; set; }
        public string? GeneralRegistrationNo { get; set; }
        public string? CbscStudentId { get; set; }
        public string? AdmissionNo { get; set; }
        public int? SchoolId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? AdharNo { get; set; }
        public string? Religion { get; set; }
        public string? Category { get; set; }
        public string? Cast { get; set; }
        public string? SubCast { get; set; }
        public string? Nationality { get; set; }
        public string? MotherTounge { get; set; }
        public string? EmergencyContactPersonName { get; set; }
        public string? EmergencyContactNumber { get; set; }
        public string? FamilyDoctorName { get; set; }
        public string? FamilyDoctorContactNumber { get; set; }
        public string? BirthPlace { get; set; }
        public SchoolNgbDateModel? ngbBirthDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? BirthDateInWords { get; set; }
        public int? BirthCountryId { get; set; }
        public string? BirthCountryName { get; set; }
        public int? BirthStateId { get; set; }
        public string? BirthStateName { get; set; }
        public int? BirthDistrictId { get; set; }
        public string? BirthDistrictName { get; set; }
        public int? BirthTalukaId { get; set; }
        public string? BirthTalukaName { get; set; }
        public string? CurrentAddressLine1 { get; set; }
        public string? CurrentAddressLine2 { get; set; }
        public int? CurrentCountryId { get; set; }
        public string? CurrentCountryName { get; set; }
        public int? CurrentStateId { get; set; }
        public string? CurrentStateName { get; set; }
        public int? CurrentDistrictId { get; set; }
        public string? CurrentDistrictName { get; set; }
        public int? CurrentTalukaId { get; set; }
        public string? CurrentTalukaName { get; set; }
        public string? CurrentZipcode { get; set; }
        public string? BloodGroup { get; set; }
        public string? Height { get; set; }
        public string? Weight { get; set; }
        public string? MedicalHistory { get; set; }
        public string? AdmissionGrade { get; set; }
        public SchoolNgbDateModel? ngbDateOfAdmission { get; set; }
        public DateTime? DateOfAdmission { get; set; }
        public string? LastSchoolAttended { get; set; }
        public string? LastSchoolStandard { get; set; }
        public string? LastSchoolDivision { get; set; }
        public string? ProgressNoteFromLastSchool { get; set; }
        public string? ConductNoteFromLastSchool { get; set; }
        public string? StandardInWhichLastStudyingSection { get; set; }
        public string? SinceWhenStudyingInLastSchool { get; set; }
        public string? ReasonOfLeavingSchoolLastSchool { get; set; }
        public SchoolNgbDateModel? ngbDateOfLeavingLastSchool { get; set; }
        public DateTime? DateOfLeavingLastSchool { get; set; }
        public string? RemarkFromLastSchool { get; set; }
        public string? ProfileImageURL { get; set; }
        public int? AcademicYearId { get; set; }
        public int? GradeId { get; set; }
        public string? GradeName { get; set; }
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; }
        public string? GradeNameAdmission { get; set; }
        public string? FatherFullName { get; set; }
        public string? FatherMobileNo { get; set; }
        public long? FatherId { get; set; }
        public long? MotherId { get; set; }
        public long? GuardianId { get; set; }
        public string? RollNumber { get; set; }
        public Boolean? IsNewStudent { get; set; }
        public Boolean? IsRTEStudent { get; set; }
        public Boolean? IsConsationApplicable { get; set; }
        public decimal? ConsationAmount { get; set; }
        public Boolean? IsArchive { get; set; }
        public string? ProfileBase64Image { get; set; }
        public string? ProfileImageContentType { get; set; }
        public bool? IsAppAccess { get; set; }
        public string? AppAccessMobileNo { get; set; }
        public string? AppAccessOneTimePassword { get; set; }
        public decimal? PreviousAcademicYearPendingFeeAmount { get; set; }

    }

    public class StudentListDto
    {
        public string RollNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
        public string AdharNo { get; set; } = string.Empty;
        public string GradeName { get; set; } = string.Empty;
        public int   StudentId { get; set; }
        public string AppAccessMobileNo { get; set; } = string.Empty;
        public string EmergencyContactNumber { get; set; } = string.Empty;
        public int? FatherId { get; set; }
        public int? MotherId { get; set; }
        public int? GuardianId { get; set; }
    }
    public class StudentIdModelResponse
    {
        public int? StudentId { get; set; }
        public int? FatherId { get; set; }
        public int? MotherId { get; set; }
        public int? GuardianId { get; set; }
        public int? DocumentId { get; set; }
        public int Exist { get; set; } = 0;
        public int GeneralRegistrationNoAvailable { get; set; }=0 ;
        public int UpdateFlag { get; set; } = 0;
        public int StudentPaymentExist { get; set; } = 0;
    }
    public class StudentDeleteRespose
    {
        public int AffectedRows { get; set; } = 0;
    }

    public class StudentQRSelectResponse
    {
       public string SchoolCode { get; set; }= string.Empty;
       public int StudentId { get; set; }
       public string StudentFullName { get; set; } = string.Empty;
       public string Class { get;set; } = string.Empty;
       public string RollNumber { get; set; } = string.Empty;

    }

}
