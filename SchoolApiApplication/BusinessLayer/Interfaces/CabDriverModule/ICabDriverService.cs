using SchoolApiApplication.DTO.CabDriverModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.CabDriverModule
{
    public interface ICabDriverService
    {
        public Task<CabDriverDto> GetCabDriverProfile(long? CabDriverId);
        public Task<CabDriverDto> CabDriverProfileUpsert(CabDriverDto CabDriverObj, int UserId);
        public Task<DatatableResponseModel> GetCabDriverList(DatatableRequestWrapper requestObjectWrapper);
        public Task<CabDriverDeleteRespose> CabDriverDelete(long? CabDriverId, int UserId);
    }
}
