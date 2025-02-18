using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule
{
    public interface ISchoolHolidayService
    {

        public Task<DatatableResponseModel> GetHolidayDetails(DatatableRequestWrapper requestObjectWrapper);

        public Task<SchoolHolidayResponseDto> SchoolHolidaySelect(int AcademicYearId);

        public Task<string> SchoolHolidayInsert(SchoolHolidayResponseDto shdObj, int UserId);

        public Task<int> SchoolHolidayDelete(long? SchoolHolidayId, int UserId);

        public Task<ExistResposeDto> CheckExistResponse(CalendarDateRequestDto obj);
    }
}
