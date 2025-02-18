namespace SchoolApiApplication.DTO.SchedularNotificationModule
{
    public class EventSelectDto
    {
        public int? AcademicYearId { get; set; }
        public string EventTitle { get; set; } = string.Empty;
        public string EventDescription { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public int? DivisionId { get; set; }
        public string ClassId { get; set; } = string.Empty;
    }
    public class EventSelectResponseDto
    {
        public List<EventSelectDto>? EventSelectList { get; set; } = new List<EventSelectDto>();
    }
}
