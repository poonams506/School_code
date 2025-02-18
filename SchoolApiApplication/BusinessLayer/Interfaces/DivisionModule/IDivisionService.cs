using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.DTO.GradeModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.DivisionModule
{
    public interface IDivisionService
    {
		public Task<DivisionDto> GetDivisionData(int? DivisionId);
        public Task<DivisionUpdateleteRespose> DivisionDataUpsert(DivisionDto DivisionObj, int UserId);
        public Task<DatatableResponseModel> GetDivisionList(DatatableRequestWrapper requestObjectWrapper);
        public Task<DivisionDeleteRespose> DivisionDataDelete(int DivisionId, int academicYearId, int UserId);
    }
}
