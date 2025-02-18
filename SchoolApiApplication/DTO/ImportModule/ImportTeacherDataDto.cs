namespace SchoolApiApplication.DTO.ImportModule
{
    public class ImportTeacherDataDto
    {
        
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string EmailId { get; set; } = string.Empty;
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public string CountryName { get; set; } = string.Empty;
        public string StateName { get; set; } = string.Empty;
        public string DistrictName { get; set; } = string.Empty;
        public string TalukaName { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public string AdharNumber { get; set; } = string.Empty;
        public string Education { get; set; } = string.Empty;
        public DateTime? BirthDate { get; set; }
        public string BloodGroup { get; set; } = string.Empty;
        public bool? IsAppAccess { get; set; }
        public string AppAccessMobileNo { get; set; } = string.Empty;
        public string AppAccessOneTimePassword { get; set; } = string.Empty;
        public string PasswordSalt { get; set; } = string.Empty;
        public string Upassword { get; set; } = string.Empty;
        public long CountryId { get; set; } = 0;
        public long StateId { get; set; } = 0;
        public long DistrictId { get; set; } = 0;
        public long TalukaId { get; set; } = 0;


    }
    public class ResponseImportTeacherDataDto
    {
        public List<ImportTeacherDataDto> Teachers { get; set; } = new List<ImportTeacherDataDto>();
        public int Suceess { get; set; } = 0;
        public int InsertedCount { get; set; } = 0;
        public int UpdatedCount { get; set; } = 0;

    }
}
