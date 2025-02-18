using SchoolApiApplication.DTO.WeeklyDayOffModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.WeeklyDayOffModule
{
    public interface IWeeklyDayOffService
    {
        public Task<WeeklyDayOffDto> WeeklyDayOffSelect(int AcademicYearId);

        public Task<int> WeeklyDayOffInsert(WeeklyDayOffDto obj, int UserId);

    }
}
