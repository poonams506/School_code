using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.WeeklyDayOffModule;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.DTO.WeeklyDayOffModule;
using SchoolApiApplication.Repository.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.Repository.Interfaces.WeeklyDayOffModule;

namespace SchoolApiApplication.BusinessLayer.Services.WeeklyDayOffModule
{
    public class WeeklyDayOffService: IWeeklyDayOffService

    {
        private readonly IWeeklyDayOffRepository  _weeklyDayOffRepository;

        public WeeklyDayOffService(IWeeklyDayOffRepository weeklyDayOffRepository)
        {

            _weeklyDayOffRepository = weeklyDayOffRepository;
        }

        public async Task<int> WeeklyDayOffInsert(WeeklyDayOffDto obj, int UserId)
        {
            return await _weeklyDayOffRepository.WeeklyDayOffInsert(obj, UserId);
        }

        public async Task<WeeklyDayOffDto> WeeklyDayOffSelect(int AcademicYearId)
        {
            return await _weeklyDayOffRepository.WeeklyDayOffSelect(AcademicYearId);
        }
    }
}
