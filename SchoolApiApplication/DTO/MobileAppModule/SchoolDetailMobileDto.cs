namespace SchoolApiApplication.DTO.MobileAppModule
{
    public class SchoolDetailMobileDto
    {
        public int SchoolId { get; set; }
        public string LogoUrl { get; set; } = string.Empty;
        public string SchoolName { get; set; } = string.Empty;
        public int AcademicYearId { get; set; }
        public DateTime? AcademicYearStartMonth {get;set;}
    }
}
