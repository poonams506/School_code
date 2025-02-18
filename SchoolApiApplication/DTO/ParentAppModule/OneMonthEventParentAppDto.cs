using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;

namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class OneMonthEventParentAppDto
    {
        public int SchoolEventId { get; set; } = 0;
        public int? AcademicYearId { get; set; }
        public int? ClassId { get; set; } 
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
        public List<OneMonthEventFileDetailsParentAppDto> LstEventDetail { get; set; } = new List<OneMonthEventFileDetailsParentAppDto>();
        public List<OneMonthEventDateParentAppDto> LstEventDate { get; set; } = new List<OneMonthEventDateParentAppDto>();

    }

    public class OneMonthEventFileDetailsParentAppDto
    {
        public int SchoolEventId { get; set; }
        public int SchoolEventDetailsId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FullPath { get; set; } = string.Empty;
    }
    public class OneMonthEventDateParentAppDto
    {
        public int SchoolEventId { get; set; }

        public DateTime? EventStartDate { get; set; }
        public DateTime? EventEndDate { get; set; }
    }

    public class OneMonthEventParentAppResponseDto
    {
        public List<OneMonthEventParentAppDto> OneMonthEventList { get; set; } = new List<OneMonthEventParentAppDto>();
    }
}
