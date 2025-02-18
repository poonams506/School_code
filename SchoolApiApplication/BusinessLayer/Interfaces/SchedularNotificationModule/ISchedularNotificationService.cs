using SchoolApiApplication.DTO.SchedularNotificationModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.SchedularNotificationModule
{
    public interface ISchedularNotificationService
    {
        public Task<SchoolHolidaysDto> SchoolHolidaysSelect(int AcademicYearId);
        public Task<EventSelectResponseDto> EventSelect(int AcademicYearId);
        public Task<UpcomingTeacherLectureResponseDto> UpcomingTeacherLectureSelect(int AcademicYearId);
        public Task<BulkPaymentReminderResponseDto> BulkPaymentReminderSelect(int AcademicYearId);

    }
}
