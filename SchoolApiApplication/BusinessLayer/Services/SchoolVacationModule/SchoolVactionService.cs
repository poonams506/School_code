using SchoolApiApplication.BusinessLayer.Interfaces.SchoolVacationModule;
using SchoolApiApplication.DTO.SchoolVacationModule;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.SchoolVacationModule;

namespace SchoolApiApplication.BusinessLayer.Services.SchoolVacationModule
{
    public class SchoolVactionService : ISchoolVacationService
    {
        private readonly ISchoolVacationRepository _schoolVacationRepository;

        public SchoolVactionService(ISchoolVacationRepository schoolVacationRepository)
        {
            _schoolVacationRepository = schoolVacationRepository;
        }

        public async Task<DatatableResponseModel> SchoolVacationDetails(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _schoolVacationRepository.SchoolVacationDetails(requestObjectWrapper);
        }

        public async Task<SchoolVacationDto> GetSchoolVacationSelect(long? SchoolVacationId)
        {
            return await _schoolVacationRepository.GetSchoolVacationSelect(SchoolVacationId);
        }

        public async Task<int> SchoolVacationDelete(long? SchoolVacationId,int UserId)
        {
            return await _schoolVacationRepository.SchoolVacationDelete(SchoolVacationId, UserId);
        }

        public async Task<int> UpdateSchoolVacation(SchoolVacationDto Obj, int UserId)
        {
            return await _schoolVacationRepository.UpdateSchoolVacation(Obj, UserId);
        }
    }
}
