using SchoolApiApplication.DTO.CommonModule;
using System.Runtime;
using System.Security.Principal;

namespace SchoolApiApplication.DTO.Certificate_Module
{
    public class CertificateDto
    {
        public BonafiedDto BonafiedDetails { get; set; }
        public LeavingCertificateDto LeavingCertificateDetails { get; set; }
        public CharacterCertificateDto CharacterCertificateDetails { get; set; }
        public IdCardDto IdCardDetails { get; set; }
        public CertificateAuditDto CertificateAuditDetails { get; set; }
        public CertificateIdModelResponse CertificateIdModelResponse { get; set; }
    }
    public class BonafiedDto
    {
        public string SchoolName { get; set; } = string.Empty;
        public string SchoolContactNo1 { get; set; } = string.Empty;
        public string SchoolEmail { get; set; } = string.Empty;
        public string AffiliationNumber { get; set; } = string.Empty;
        public string SchoolPermission { get; set; } = string.Empty;
        public string RegistrationNumber { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public string SchoolType { get; set; } = string.Empty;
        public string LogoUrl { get; set; } = string.Empty;
        public string SchoolLogoUrl { get; set; } = string.Empty;
        public string StudentLogoUrl { get; set; } = string.Empty;
        public Int16 SchoolMediumId { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public string GradeName { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Cast { get; set; } = string.Empty;
        public string SubCast { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public SchoolNgbDateModel? ngbBirthDate { get; set; }
        public string BirthTalukaName { get; set; } = string.Empty;
        public string BirthPlace { get; set; } = string.Empty;
        public string BirthDistrictName { get; set; } = string.Empty;
        public string BirthStateName { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
        public string SchoolProfileImage { get; set; } = string.Empty;
        public string SchoolProfileImageContentType { get; set; } = string.Empty;
        public string ProfileImage { get; set; } = string.Empty;
        public string ProfileImageUrl { get; set; } = string.Empty;
        public string ProfileImageContentType { get; set; } = string.Empty;
        public string AcademicYearKey { get; set; } = string.Empty;
    }
    public class LeavingCertificateDto
    {
        public string SchoolName { get; set; } = string.Empty;
        public string SchoolContactNo1 { get; set; } = string.Empty;
        public string SchoolEmail { get; set; } = string.Empty;
        public string AffiliationNumber { get; set; } = string.Empty;
        public string SchoolPermission { get; set; } = string.Empty;
        public string RegistrationNumber { get; set; } = string.Empty;
        public string CbscStudentId { get; set; } = string.Empty;
        public string UdiseNumber { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public string LogoUrl { get; set; } = string.Empty;
        public string SchoolLogoUrl { get; set; } = string.Empty;
        public string StudentLogoUrl { get; set; } = string.Empty;
        public string AuthorisedBy { get; set; } = string.Empty;
        public string LogoImage { get; set; } = string.Empty;
        public string LogoImageContentType { get; set; } = string.Empty;
        public string Board { get; set; } = string.Empty;   
        public string Cast { get; set; } = string.Empty;
        public string SubCast { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
        public Int16 StudentId { get; set; } = 0;
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string AdharNo { get; set; } = string.Empty;
        public string HSCOrSSCIndexNo { get; set; } = string.Empty;
        public string SchoolMediumTypeName { get; set; } = string.Empty;
        public string MotherName { get; set; } = string.Empty;
        public string Nationality { get; set; } = string.Empty;
        public string Religion { get; set; } = string.Empty;
        public DateTime? BirthDate { get; set; }
        public SchoolNgbDateModel? ngbBirthDate { get; set; }
        public string BirthTalukaName { get; set; } = string.Empty;
        public string BirthPlace { get; set; } = string.Empty;
        public string BirthDistrictName { get; set; } = string.Empty;
        public string BirthStateName { get; set; } = string.Empty;
        public string BirthDateInWords { get; set; } = string.Empty;
        public string birthCountryName { get; set; } = string.Empty;
        public string LastSchoolAttended { get; set; } = string.Empty;
        public string LastSchoolStandard { get; set; } = string.Empty;
        public DateTime? DateOfAdmission { get; set; }
        public SchoolNgbDateModel? ngbDateOfAdmission { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public string GradeNameAdmission { get; set; } = string.Empty;
        public string ReasonOfLeavingLastSchool { get; set; } = string.Empty;
        public string MotherTounge { get; set; } = string.Empty;
        public DateTime? DateOfLeavingLastSchool { get; set; }
        public SchoolNgbDateModel? ngbDateOfLeavingLastSchool { get; set; }
        public int? SerialNumber { get; set; }

        public SchoolNgbDateModel? ngbDateOfLeavingSchoolCurrent { get; set; }
        public DateTime? DateOfLeavingSchoolCurrent { get; set; }
        public SchoolNgbDateModel? ngbDateSignCurrent { get; set; }
        public DateTime? DateSignCurrent { get; set; }
        public string ConductCurrent { get; set; } = string.Empty;
        public string ProgressCurrent { get; set; } = string.Empty;
        public string StandardInWhichStudyingCurrent { get; set; } = string.Empty;
        public string ReasonOfLeavingSchoolCurrent { get; set; } = string.Empty;
        public string RemarkCurrent { get; set; } = string.Empty;
        public int GradeId { get; set; }
        public int DivisionId { get; set; }
        public int? StatusId { get; set; }
        public int? LeavingCertificateAuditsId { get; set; }
    }

    public class CharacterCertificateDto
    {
        public Int16 StudentId { get; set; } = 0;
        public string SchoolName { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string ParentName { get; set; } = string.Empty;
        public string Place { get; set; } = string.Empty;
        public string SchoolLogoUrl { get; set; } = string.Empty;
        public string StudentLogoUrl { get; set; } = string.Empty;
        public string TotalDayCount { get; set; } = string.Empty;
        public string StudentAddress { get; set; } = string.Empty;

    }

    public class IdCardDto
    {
        public string SchoolName { get; set; } = string.Empty;
        public string AcademicYearName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;      
        public DateTime BirthDate { get; set; }
        public SchoolNgbDateModel? ngbBirthDate { get; set; }
        public string BloodGroup { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;       
        public string DivisionName { get; set; } = string.Empty;
        public string GradeName { get; set; } = string.Empty;
        public string EmergencyContactNumber { get; set; } = string.Empty;
        public string ProfileImageUrl { get; set; } = string.Empty;
        public string LogoUrl { get; set; } = string.Empty;
        public string SchoolLogoUrl { get; set; } = string.Empty;
        public string StudentLogoUrl { get; set; } = string.Empty;
        public string ProfileImage { get; set; } = string.Empty;
        public string LogoImage { get; set; } = string.Empty;
        public string ProfileImageContentType { get; set; } = string.Empty;
        public string LogoImageContentType { get; set; } = string.Empty;
    }
    public class CertificateAuditDto
    {

        public long? CertificateAuditsId { get; set; }
        public Int16? CertificateTemplateId { get; set; }
        public long? StudentId { get; set; }
        public Int16? GradeId { get; set; }
        public Int16? DivisionId { get; set; }
        public Int16? AcademicYearId { get; set; }
        public Boolean? IsPublished { get; set; }
        public string? Remark { get; set; }
    }
    public class CertificateIdModelResponse
    {
        public long? CertificateAuditsId { get; set; }
        public long? StudentId { get; set; }
        public Int16? GradeId { get; set; }
        public Int16? DivisionId { get; set; }

    }

    public class LeavingCertificateHistory
    {
        public List<LeavingCertificateGridDto> LeavingCertificateList { get; set; } = new List<LeavingCertificateGridDto>();
    }
    public class LeavingCertificateGridDto
    {
        public int? LeavingCertificateAuditsId { get; set; }
        public int StatusId { get; set; }
        public int SerialNumber { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }
        public string? GeneralRegistrationNo { get; set; }
    }
}
