using SchoolApiApplication.DTO.SchoolMonthEventModule;

namespace SchoolApiApplication.DTO.SchedularNotificationModule
{
    public class BulkPaymentReminderDto
    {
        public int? AcademicYearId { get; set; }
        public long StudentId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public bool IsPublished { get; set; }


    }

    public class BulkPaymentReminderResponseDto
    {
        public List<BulkPaymentReminderDto>? BulkPaymentReminderList { get; set; } = new List<BulkPaymentReminderDto>();
    }

}
