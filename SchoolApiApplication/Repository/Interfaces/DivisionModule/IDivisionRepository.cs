using SchoolApiApplication.DTO.DivisionModule;

namespace SchoolApiApplication.Repository.Interfaces.DivisionModule
{
    public interface IDivisionRepository
    {
        public Task<DivisionDto> GetDivisionData(int? DivisionId);
        public Task<DivisionUpdateleteRespose> DivisionDataUpsert(DivisionDto DivisionObj, int UserId);
        public Task<DatatableResponseModel> GetDivisionList(DatatableRequestWrapper requestObjectWrapper);
        public Task<DivisionDeleteRespose> DivisionDataDelete(int DivisionId, int academicYearId,int UserId);
    }

}
