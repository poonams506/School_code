using SchoolApiApplication.DTO.Certificate_Module;

namespace SchoolApiApplication.DTO.StudentReportModule
{
    public class StudentListDto
    {
        public long? StudentId { get; set; }
        public Int16? GradeId { get; set; }
        public Int16? DivisionId { get; set; }
        public Int16? AcademicYearId { get; set; }
        public string? FullName { get; set; }
    }
    public class StudentNameList
    {
        public List<StudentListDto> StudentNames { get; set; } = new List<StudentListDto>();


    }
}

