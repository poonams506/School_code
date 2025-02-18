namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class StudentProfileMobileDto
    {
        public long StudentId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string StudentFullName { get; set; } = string.Empty;
        public string CurrentAddressLine1 { get; set; } = string.Empty;
        public string CurrentAddressLine2 { get; set; } = string.Empty;
        public int? CurrentCountryId { get; set; }
        public int? CurrentStateId { get; set; }
        public int? CurrentDistrictId { get; set; }
        public int? CurrentTalukaId { get; set; }
        public string CurrentZipcode { get; set; } = string.Empty;
        public string ProfileImageURL { get; set; } = string.Empty; 
        public string ProfileImageContentType { get; set; } = string.Empty;
        public string ProfileBase64Image { get; set; } = string.Empty;  
        public int? UserId { get; set; }
    }

    public class ParentProfileMobileResponseDto
    {
        public ParentProfileMobileDto FatherDetail { get; set; } = new ParentProfileMobileDto();
        public ParentProfileMobileDto MotherDetail { get; set; } = new ParentProfileMobileDto();
        public ParentProfileMobileDto GuardianDetail { get; set; } = new ParentProfileMobileDto();
    }
    public class ParentProfileMobileDto
    {
        public long StudentId { get; set; }
        public int ParentId { get; set; }
        public int ParentTypeId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? DistrictId { get; set; }
        public int? TalukaId { get; set; }
        public string Zipcode { get; set; } = string.Empty;
        public string ProfileImageURL { get; set; } = string.Empty;
        public string ProfileImageContentType { get; set; } = string.Empty;
        public string ProfileBase64Image { get; set; } = string.Empty;
        public int? UserId { get; set; }
    }
}
