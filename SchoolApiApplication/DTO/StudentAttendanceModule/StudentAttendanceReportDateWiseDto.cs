using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.StudentAttendanceModule
{
    public class StudentAttendanceReportDateWiseDto
    {
        public Int16 AcademicYearId { get; set; } = 0;
        public Int16 GradeId { get; set; } = 0;
        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public Int16 DivisionId { get; set; } = 0;
        public string Status { get; set; } = string.Empty;
        public string  TakenBy { get; set; } = string.Empty;
        public DateTime? TakenOn { get; set; }

        public int IsSchoolHoliday { get; set; } = 0;


    }
}
