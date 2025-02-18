using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.ParentModule;

namespace SchoolApiApplication.Repository.Interfaces.GradeModule
{
    public interface IGradeRepository
    {
        public Task<GradeDto> GetGradeData(int? GradeId);
        public Task<GradeUpdateRespose> GradeDataUpsert(GradeDto GradeObj, int UserId);
        public Task<DatatableResponseModel> GetGradeList(DatatableRequestWrapper requestObjectWrapper);
        public Task<GradeDeleteRespose> GradeDataDelete(int GradeId, int academicYearId, int UserId);

    }

}
