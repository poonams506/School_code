using SchoolApiApplication.DTO.SchoolCalendarModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.SchoolCalendarModule
{
    public interface ISchoolCalendarService
    {
        public Task<SchoolCalendarResponseDto> SchoolCalendarHolidayEventSelect(int AcademicYearId);

        Task<SchoolCalendarAppResponseDto> GetSchoolCalendarEventsForTeacherApp(int AcademicYearId);
    }
}
