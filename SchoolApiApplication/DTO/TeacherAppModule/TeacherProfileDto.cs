namespace SchoolApiApplication.DTO.TeacherAppModule
{
    public class TeacherProfileDto
    {
        public long? TeacherId { get; set; }
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
        public int? CountryId { get; set; }
        public string? ZipCode { get; set; }
        public string? Education { get; set; }
        public string? BloodGroup { get; set; }
        public int? UserId { get; set; }
        public string? ProfileImageURL { get; set;}

    }
}
