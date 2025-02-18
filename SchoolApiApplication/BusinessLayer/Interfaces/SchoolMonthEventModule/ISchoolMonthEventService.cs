using SchoolApiApplication.DTO.SchoolMonthEventModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.SchoolMonthEventModule
{
    public interface ISchoolMonthEventService
    {
        public Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId);

    

    }
}
