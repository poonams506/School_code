using SchoolApiApplication.BusinessLayer.Interfaces.DivisionModule;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.Repository.Interfaces.DivisionModule;

namespace SchoolApiApplication.BusinessLayer.Services.DivisionModule

{
    public class DivisionService : IDivisionService
    {
        private readonly IDivisionRepository _divisionRepository;
        public DivisionService(IDivisionRepository divisionRepository)
        {
            _divisionRepository = divisionRepository;
        }
        public async Task<DivisionDto> GetDivisionData(int? DivisionId)
        {
            return await _divisionRepository.GetDivisionData(DivisionId);
        }
        public async Task<DivisionUpdateleteRespose> DivisionDataUpsert(DivisionDto DivisionObj, int UserId)
        {
            return await _divisionRepository.DivisionDataUpsert(DivisionObj, UserId);
        }
        public async Task<DatatableResponseModel> GetDivisionList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _divisionRepository.GetDivisionList(requestObjectWrapper);
        }

        public async Task<DivisionDeleteRespose> DivisionDataDelete(int DivisionId, int academicYearId, int UserId)
        {
            return await _divisionRepository.DivisionDataDelete(DivisionId, academicYearId, UserId);
        }
    }
}
