using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;

namespace SchoolApiApplication.Repository.Interfaces.SchoolMonthEventModule
{
    public interface ISchoolMonthEventRepository
    {
        public Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId);



    }
}
