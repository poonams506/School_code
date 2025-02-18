namespace SchoolApiApplication.DTO.MobileAppModule
{
    public class StudentDetailMobileResponseDto
    {
        public List<StudentDetailMobileDto> LstStudents { get; set; }=new List<StudentDetailMobileDto>();
    }
    public class StudentDetailMobileDto
    {
        public int StudentId { get; set; }
        public int ParentId { get; set; }
        public string StudentFullName { get; set; } = string.Empty;
        public int ClassId { get; set; } 
        public string ClassName { get; set; }=string.Empty;
        public string RollNumber { get; set; } = string.Empty;
        public string ProfileImageURL { get; set;} = string.Empty;
    }
}
