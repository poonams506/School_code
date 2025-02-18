using SchoolApiApplication.BusinessLayer.Interfaces.SchedularNotificationModule;
using SchoolApiApplication.DTO.SchedularNotificationModule;
using SchoolApiApplication.Repository.Interfaces.SchedularNotificationModule;

namespace SchoolApiApplication.BusinessLayer.Services.SchedularNotificationModule
{
    public class SchedularNotificationService : ISchedularNotificationService
    {
        private readonly ISchedularNotificationRepository _schedularNotificationRepository;
        public SchedularNotificationService(ISchedularNotificationRepository schoolHolidaysRepository)
        {
            _schedularNotificationRepository = schoolHolidaysRepository;
        }
        public async Task<SchoolHolidaysDto> SchoolHolidaysSelect(int AcademicYearId)
        {
           return await _schedularNotificationRepository.SchoolHolidaysSelect(AcademicYearId);
        }
        public async Task<EventSelectResponseDto> EventSelect(int AcademicYearId)
        {
            return await _schedularNotificationRepository.EventSelect(AcademicYearId);
        }
        public async Task<UpcomingTeacherLectureResponseDto> UpcomingTeacherLectureSelect(int AcademicYearId)
        {
            return await _schedularNotificationRepository.UpcomingTeacherLectureSelect(AcademicYearId);
        }
        public async Task<BulkPaymentReminderResponseDto> BulkPaymentReminderSelect(int AcademicYearId)
        {
            return await _schedularNotificationRepository.BulkPaymentReminderSelect(AcademicYearId);
        }
    }
}