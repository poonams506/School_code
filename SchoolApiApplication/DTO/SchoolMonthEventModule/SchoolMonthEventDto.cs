using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.DTO.SchoolMonthEventModule
{
    public class SchoolMonthEventDto
    {
        public int SchoolEventId { get; set; } = 0;
        public int? AcademicYearId { get; set; }
        public string ClassId { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; } = string.Empty;
        public string EventTitle { get; set; } = string.Empty;
        public string EventDescription { get; set; } = string.Empty;
        public string EventFess { get; set; } = string.Empty;
        public string EventVenue { get; set; } = string.Empty;
        public string EventCoordinator { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public DateTime? StartTime { get; set; }
        public SchoolNgbTimeModel? ngbStartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public SchoolNgbTimeModel? ngbEndTime { get; set; }
        public bool IsCompulsory { get; set; }
        public bool IsPublished { get; set; }
        public List<OneMonthEventFileDetailsTeacherAppDto> LstEventDetail { get; set; } = new List<OneMonthEventFileDetailsTeacherAppDto>();
        public List<OneMonthEventDateTeacherAppDto> LstEventDate { get; set; } = new List<OneMonthEventDateTeacherAppDto>();

    }
    public class OneMonthEventFileDetailsTeacherAppDto
    {
        public int SchoolEventId { get; set; }
        public int SchoolEventDetailsId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FullPath { get; set; } = string.Empty;
    }
    public class OneMonthEventDateTeacherAppDto
    {
        public int SchoolEventId { get; set; }

        public DateTime? EventStartDate { get; set; }
        public DateTime? EventEndDate { get; set; }
    }
    public class SchoolMonthEventResponseDto
    {  
        public List<SchoolMonthEventDto>? SchoolMonthEventList { get; set; } = new List<SchoolMonthEventDto>();
    }

    public class TeacherAttendanceHolidayResponseDto
    {
        public List<TeacherAttendanceHolidayDto> LstHoliday { get; set; } = new List<TeacherAttendanceHolidayDto>();
        public List<TeacherAttendanceWeeklyOffDto> LstWeeklyOff { get; set; } = new List<TeacherAttendanceWeeklyOffDto>();
        public List<TeacherAttendanceVacationDto> LstVacation { get; set; } = new List<TeacherAttendanceVacationDto>();
    }

    public class TeacherAttendanceHolidayDto
    {
        public int SchoolHolidayId { get; set; }
        public DateTime CalendarDate { get; set; }
        public string HolidayReason { get; set; } = string.Empty;
      

    }

    public class TeacherAttendanceWeeklyOffDto
    {
        public int WeeklyOffId { get; set; }
        public string DayNo { get; set; } = string.Empty;
    }
    public class TeacherAttendanceVacationDto
    {
        public int? SchoolVacationId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string VacationName { get; set; } = string.Empty;
    }
}
