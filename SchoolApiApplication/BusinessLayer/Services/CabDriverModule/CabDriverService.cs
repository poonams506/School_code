using SchoolApiApplication.BusinessLayer.Interfaces.CabDriverModule;
using SchoolApiApplication.DTO.CabDriverModule;
using SchoolApiApplication.Repository.Interfaces.CabDriverModule;

namespace SchoolApiApplication.BusinessLayer.Services.CabDriverModule
{
    public class CabDriverService : ICabDriverService
    {
        private readonly ICabDriverRepository _CabDriverRepository;
        public CabDriverService(ICabDriverRepository CabDriverRepository)
        {
            _CabDriverRepository = CabDriverRepository;
        }
        public async Task<CabDriverDto> GetCabDriverProfile(long? CabDriverId)
        {
            return await _CabDriverRepository.GetCabDriverProfile(CabDriverId);
        }
        public async Task<CabDriverDto> CabDriverProfileUpsert(CabDriverDto CabDriverObj, int UserId)
        {
            return await _CabDriverRepository.CabDriverProfileUpsert(CabDriverObj, UserId);
        }
        public async Task<DatatableResponseModel> GetCabDriverList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _CabDriverRepository.GetCabDriverList(requestObjectWrapper);
        }

        public async Task<CabDriverDeleteRespose> CabDriverDelete(long? CabDriverId, int UserId)
        {
            return await _CabDriverRepository.CabDriverDelete(CabDriverId, UserId);
        }

       
    }
}
