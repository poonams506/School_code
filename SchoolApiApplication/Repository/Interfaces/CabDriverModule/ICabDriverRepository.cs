using SchoolApiApplication.DTO.CabDriverModule;

namespace SchoolApiApplication.Repository.Interfaces.CabDriverModule
{
    public interface ICabDriverRepository
    {
        public Task<CabDriverDto> GetCabDriverProfile(long? CabDriverId);
        public Task<CabDriverDto> CabDriverProfileUpsert(CabDriverDto CabDriverObj, int UserId);
        public Task<DatatableResponseModel> GetCabDriverList(DatatableRequestWrapper requestObjectWrapper);
        public Task<CabDriverDeleteRespose> CabDriverDelete(long? CabDriverId, int UserId);
    }

}
