using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class MissingAttendanceParentAppDto
    {
        public Int16 AcademicYearId { get; set; } = 0;
        public string Status { get; set; } = string.Empty;
        //public DateTime AttendanceDateTime { get; set; }
        public Int16 StudentId { get; set; } = 0;


    }
    
}
