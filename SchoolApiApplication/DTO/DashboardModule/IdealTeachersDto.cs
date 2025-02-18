namespace SchoolApiApplication.DTO.DashboardModule
{

    public class IdealTeacherListResponseDto
    {
        public List<IdealTeachersWithHrsAndMinsDto>? SchoolTimeSlotList { get; set; } = new List<IdealTeachersWithHrsAndMinsDto>();
            
     }

    public class IdealTeachersWithHrsAndMinsDto
    {
        public int? StartingHour { get; set; }
        public int? StartingMinute { get; set; }
        public int? EndingHour { get; set; }
        public int? EndingMinute { get; set; }
        public List<IdealTeacher>? IdealTeacherList { get; set; }   = new List<IdealTeacher>();
    }
    public class IdealTeacher
    {
        public int? StartingHour { get; set; }
        public int? StartingMinute { get; set; }
        public int? EndingHour { get; set; }
        public int? EndingMinute { get; set; }
        public int? TeacherId { get; set; }
        public int? GradeId { get; set; }
        public int? DivisionId { get; set; }
        public string TeacherName { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string ProfileImageUrl { get; set; } = string.Empty;
        public string SubjectNames { get; set; } = string.Empty;
    }


}
