namespace SchoolApiApplication.DTO.ExportModule
{
    public class TeacherExportDataDto
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
        public string BirthDate { get; set; } = string.Empty;
        public string BloodGroup { get; set; } = string.Empty;
        public string IsAppAccess { get; set; } = string.Empty;
        public string AppAccessMobileNo { get; set; } = string.Empty;

    }
    public class ResponseExportTeacherDataDto
    {
        public List<TeacherExportDataDto>? Teachers { get; set; } = new List<TeacherExportDataDto>();

    }
}
