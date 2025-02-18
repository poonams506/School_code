using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.DTO.StudentAttendanceModule
{
    public class StudentAttendanceReportDto
    {
        public int? AcademicYearId { get; set; } 
        public int? GradeId { get; set; } 
        public int? DivisionId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public string RollNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public int? TotalDay { get; set; } 
        public int? PresentDay { get; set; } 
        public int? HalfDay { get; set; } 
        public int? AbsentDay { get; set; } 
        public string AttendancePercentage { get; set; } = string.Empty;
        


    }
}
