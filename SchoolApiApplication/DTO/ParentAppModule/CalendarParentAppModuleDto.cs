using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolCalendarModule;

namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class CalendarParentAppModuleDto
    {

        public int SchoolEventId { get; set; } = 0;
        public int Id { get; set; } = 0;


        public string EventType { get; set; } = string.Empty;

        public int? AcademicYearId { get; set; }
        public int? ClassId { get; set; }
        //public int? GradeId { get; set; }
        //public string GradeName { get; set; } = string.Empty;
        //public int? DivisionId { get; set; }
        //public string? DivisionName { get; set; } = string.Empty;
        public string EventTitle { get; set; } = string.Empty;
        public string EventCoordinator { get; set; } = string.Empty;
        public decimal EventFess { get; set; }
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public DateTime? StartTime { get; set; }
        public SchoolNgbTimeModel? ngbStartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public SchoolNgbTimeModel? ngbEndTime { get; set; }
        public bool IsPublished { get; set; }
        public bool IsCompulsory { get; set; }
        public DateTime? CalendarDate { get; set; }
        public SchoolNgbDateModel? ngbCalendarDate { get; set; }
        public string HolidayReason { get; set; } = string.Empty;
        public string EventDescription { get; set; } = string.Empty;
        public string VacationName { get; set; } = string.Empty;
        public string WeeklyOffName { get; set; } = string.Empty;
        public DateTime? VacationStartDate { get; set; }
        public SchoolNgbDateModel? ngbVacationStartDate { get; set; }
        public DateTime? VacationEndDate { get; set; }
        public SchoolNgbDateModel? ngbVacationEndDate { get; set; }
        public DateTime? WeeklyOffDate { get; set; }
        public SchoolNgbDateModel? ngbWeeklyOffDate { get; set; }
        public List<SchoolParentCalendarEventDetailAppDto> LstEventDetail { get; set; } = new List<SchoolParentCalendarEventDetailAppDto>();

    }


    public class SchoolParentCalendarEventDetailAppDto
    {
        public int SchoolEventId { get; set; }
        public int SchoolEventDetailsId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FullPath { get; set; } = string.Empty;
    }

    public class SchoolParentCalendarResponseDto
    {
        public List<CalendarParentAppModuleDto> ParentLstEvents { get; set; } = new List<CalendarParentAppModuleDto>();

    }
}
