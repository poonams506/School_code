using SchoolApiApplication.DTO.SchedularNotificationModule;
using SchoolApiApplication.DTO.SurveyModule;

namespace SchoolApiApplication.Repository.Interfaces.SchedularNotificationModule
{
    public interface ISchedularNotificationRepository
    {
        public Task<SchoolHolidaysDto> SchoolHolidaysSelect(int AcademicYearId);
        public Task<EventSelectResponseDto> EventSelect(int AcademicYearId);
        public Task<UpcomingTeacherLectureResponseDto> UpcomingTeacherLectureSelect(int AcademicYearId);
        public Task<BulkPaymentReminderResponseDto> BulkPaymentReminderSelect(int AcademicYearId);

    }
}
