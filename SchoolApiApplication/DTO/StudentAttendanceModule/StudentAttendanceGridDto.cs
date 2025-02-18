using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.StudentAttendanceModule
{
    public class StudentAttendanceGridDto
    {
        
        public int StudentId { get; set; }
        public string RollNumber { get; set; } = string.Empty;
        public string FullName { get; set; }= string.Empty;
        public int? StatusId { get; set; }   
        public string Reason { get; set; } = string.Empty;
      

    }  
    public class StudentAttendanceGridResponseDto
    {
        public List<StudentAttendanceGridDto>? StudentAttendancesList { get; set; }
        public int IsSchoolHoliday { get; set; } = 0;
    }

    public class TeacherDropDownDto
    {
        public int TeacherId { get; set; }
        public string FullName { get; set; } = string.Empty;
    }

    public class TeacherDropdownResponseDto
    {
        public List<TeacherDropDownDto> TeacherDropdownList { get; set; }=new List<TeacherDropDownDto>();
    }

    public class StudentAttendanceMobileResponseDto
    {
        public List<StudentAttendanceMobileDto> LstStudentAttendance { get; set; } = new List<StudentAttendanceMobileDto>();
    }
    public class StudentAttendanceMobileDto
    {
        public long StudentId { get; set; }
        public int StudentAttendanceId { get; set; }
        public int TeacherId { get; set; }
        public DateTime? AttendanceDateTime { get; set; }
        public int StatusId { get; set; }

    }
}

