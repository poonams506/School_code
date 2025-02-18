namespace SchoolApiApplication.DTO.SchedularNotificationModule
{
    public class SchoolHolidaysDto
    {
        public int AcademicYearId { get; set; }
        public int DayNo { get;set; }
        public DateTime CalendarDate { get;set; } 
        public string HolidayReason { get; set; }
    }
}