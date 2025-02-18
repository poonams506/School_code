using SchoolApiApplication.DTO.SchoolCalendarModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentCalendarModule
{
    public interface ISchoolCalendarRepository
    {
        public Task<SchoolCalendarResponseDto> SchoolCalendarHolidayEventSelect (int AcademicYearId);
        Task<SchoolCalendarAppResponseDto> GetSchoolCalendarEventsForTeacherApp(int AcademicYearId);
    }
}
