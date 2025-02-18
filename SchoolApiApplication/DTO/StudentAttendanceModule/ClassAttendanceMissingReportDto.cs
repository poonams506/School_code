using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolCalendarModule;

namespace SchoolApiApplication.DTO.StudentAttendanceModule
{
    public class ClassAttendanceMissingReportDto
    {

         public Int16 AcademicYearId { get; set; } = 0;
        public int? GradeId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; } = string.Empty;
        public int ClassId { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime? AttendanceMissingDate { get; set; }
        public SchoolNgbDateModel? ngbAttendanceMissingDate { get; set; }
        public int ClassTeacherId { get; set; } = 0;
        public string ClassTeacherName { get; set; }= string.Empty;
    }
    public class ClassAttendanceMissingReportResponseDto
    {
        public List<ClassAttendanceMissingReportDto> ClassAttendanceMissingList { get; set; } = new List<ClassAttendanceMissingReportDto>();
    }
   
}
