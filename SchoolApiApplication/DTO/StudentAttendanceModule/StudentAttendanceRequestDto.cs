using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.StudentAttendanceModule
{
    public class StudentAttendanceRequestDto
    {
        public Int16 AcademicYearId { get; set; } = 0;
        public Int16 GradeId { get; set; }=0;
        public Int16 DivisionId { get; set; } = 0;
        public int TeacherId { get; set; } = 0;
        public DateTime AttendanceDate { get; set; }
        public SchoolNgbDateModel? ngbAttendanceDate { get; set; }
    }
}
