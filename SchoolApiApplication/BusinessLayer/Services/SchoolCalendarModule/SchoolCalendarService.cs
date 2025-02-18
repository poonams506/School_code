using SchoolApiApplication.BusinessLayer.Interfaces.SchoolCalendarModule;
using SchoolApiApplication.DTO.SchoolCalendarModule;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.StudentCalendarModule;

namespace SchoolApiApplication.BusinessLayer.Services.SchoolCalendarModule
{
    public class SchoolCalendarService : ISchoolCalendarService
    {
        private readonly ISchoolCalendarRepository _schoolCalendarRepository;

        public SchoolCalendarService(ISchoolCalendarRepository schoolCalendarRepository)
        {
            _schoolCalendarRepository = schoolCalendarRepository;
        }

        public Task<SchoolCalendarResponseDto> SchoolCalendarHolidayEventSelect(int AcademicYearId)
        {
            return _schoolCalendarRepository.SchoolCalendarHolidayEventSelect(AcademicYearId);
        }

      public async  Task<SchoolCalendarAppResponseDto> GetSchoolCalendarEventsForTeacherApp(int AcademicYearId)
        {
            return await _schoolCalendarRepository.GetSchoolCalendarEventsForTeacherApp(AcademicYearId);
        }
    }
}
