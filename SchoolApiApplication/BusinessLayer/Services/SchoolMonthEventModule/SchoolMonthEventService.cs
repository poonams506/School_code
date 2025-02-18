using SchoolApiApplication.BusinessLayer.Interfaces.SchoolMonthEventModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.SchoolMonthEventModule;
using SchoolApiApplication.Repository.Services.SchoolEventModule;

namespace SchoolApiApplication.BusinessLayer.Services.SchoolMonthEventModule
{
    public class SchoolMonthEventService : ISchoolMonthEventService
    {
        private readonly ISchoolMonthEventRepository _schoolMonthEventRepository;

        public SchoolMonthEventService(ISchoolMonthEventRepository schoolMonthEventRepository)
        {
            _schoolMonthEventRepository = schoolMonthEventRepository;
        }

   

        public async Task<SchoolMonthEventResponseDto> SchoolMonthEventStaffSelect(int AcademicYearId)
        {
            return await _schoolMonthEventRepository.SchoolMonthEventStaffSelect(AcademicYearId);

        }

       
    }
}
