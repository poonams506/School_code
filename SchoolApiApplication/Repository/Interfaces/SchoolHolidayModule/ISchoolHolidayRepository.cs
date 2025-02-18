using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.Repository.Interfaces.SchoolHolidayModule
{
    public interface ISchoolHolidayRepository
    {
        public Task<DatatableResponseModel> GetHolidayDetails(DatatableRequestWrapper requestObjectWrapper);

        public Task<SchoolHolidayResponseDto> SchoolHolidaySelect(int AcademicYearId);

        public Task<string> SchoolHolidayInsert(SchoolHolidayResponseDto shdObj, int UserId);

        public Task<int> SchoolHolidayDelete(long? SchoolHolidayId,int UserId);

        public Task<ExistResposeDto> CheckExistResponse(CalendarDateRequestDto obj);




    }
}
