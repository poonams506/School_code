using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.Repository.Services.SchoolEventModule;
using SchoolApiApplication.Repository.Services.SchoolHolidayModule;

namespace SchoolApiApplication.BusinessLayer.Services.SchoolHolidayModule
{
    public class SchoolHolidayService : ISchoolHolidayService
    {
        private readonly ISchoolHolidayRepository _schoolHolidayRepository;

        public SchoolHolidayService(ISchoolHolidayRepository schoolHolidayRepository)
        {

            _schoolHolidayRepository = schoolHolidayRepository;
        }

        public async Task<DatatableResponseModel> GetHolidayDetails(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _schoolHolidayRepository.GetHolidayDetails(requestObjectWrapper);
        }

        public async Task<int> SchoolHolidayDelete(long? SchoolHolidayId, int UserId)
        {
            return await _schoolHolidayRepository.SchoolHolidayDelete(SchoolHolidayId, UserId);
        }

        public async Task<SchoolHolidayResponseDto> SchoolHolidaySelect(int AcademicYearId)
        {
            return await _schoolHolidayRepository.SchoolHolidaySelect(AcademicYearId);
        }

        public async Task<string> SchoolHolidayInsert(SchoolHolidayResponseDto shdObj, int UserId)
        {
            return await _schoolHolidayRepository.SchoolHolidayInsert(shdObj, UserId);

        }

        public async  Task<ExistResposeDto> CheckExistResponse(CalendarDateRequestDto obj)
        {
            return await _schoolHolidayRepository.CheckExistResponse(obj);
        }
    }
}
