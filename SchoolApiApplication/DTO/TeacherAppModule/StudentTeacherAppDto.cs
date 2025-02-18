using SchoolApiApplication.DTO.SchoolMonthEventModule;

namespace SchoolApiApplication.DTO.TeacherAppModule
{
    public class StudentTeacherAppDto
    {
        //public int? AcademicYearId { get; set; }
        //public int? GradeId { get; set; }
        //public int? DivisionId { get; set; }
        public string? StudentName { get; set; }
        public string? RollNumber { get; set; }
        public string? Gender { get; set; }
        public string? EmergencyContactNumber { get; set; }
        public string? ProfileImageURL { get; set; }
     


    }
    public class StudentTeacherAppResponseDto
    {
        public List<StudentTeacherAppDto>? StudentTeacherAppList { get; set; } = new List<StudentTeacherAppDto>();
    }
}
