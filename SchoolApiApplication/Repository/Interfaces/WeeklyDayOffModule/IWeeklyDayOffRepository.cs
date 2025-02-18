using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.DTO.WeeklyDayOffModule;

namespace SchoolApiApplication.Repository.Interfaces.WeeklyDayOffModule
{
    public interface IWeeklyDayOffRepository
    {
        public Task<WeeklyDayOffDto> WeeklyDayOffSelect(int AcademicYearId);

        public Task<int> WeeklyDayOffInsert(WeeklyDayOffDto obj, int UserId);


    }
}
