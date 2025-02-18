using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.TeacherModule
{
    public class TeacherDto
    {
        public long? TeacherId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? TeacherFullName { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string? ContactNumber { get; set; }
        public string? MobileNumber { get; set; }
        public string? EmailId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? TalukaId { get; set; }
        public int? DistrictId { get; set; }
        public int? StateId { get; set; }
        public string? TalukaName { get; set; }
        public string? DistrictName { get; set; }
        public string? StateName { get; set; }
        public string? CountryName { get; set; }
        public string? AdharNumber { get; set; }
        public int? CountryId { get; set; }
        public string? ZipCode { get; set; }
        public string? Education { get; set; }
        public string? BloodGroup { get; set; }
        public string? ProfileImageURL { get; set; }
        public int? UserId { get; set; }
        public SchoolNgbDateModel? ngbBirthDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? ProfileBase64Image { get; set; }
        public string? ProfileImageContentType { get; set; }
        public bool? IsAppAccess { get; set; }
        public string? AppAccessMobileNo { get; set; }
        public string? AppAccessOneTimePassword { get; set; }
    }
    public class TeacherDeleteRespose
    {
        public int AffectedRows { get; set; } = 0;
        public int TeacherGradeDivisionMappingCount { get; set; } = 0;
        public int TeacherSubjectMappingCount { get; set; } = 0;
    }
}
