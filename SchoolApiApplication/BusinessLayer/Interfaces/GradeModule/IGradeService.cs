using SchoolApiApplication.DTO.GradeModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.GradeModule
{
    public interface IGradeService
    {
		public Task<GradeDto> GetGradeData(int? GradeId);
        public Task<GradeUpdateRespose> GradeDataUpsert(GradeDto GradeObj, int UserId);
        public Task<DatatableResponseModel> GetGradeList(DatatableRequestWrapper requestObjectWrapper);
        public Task<GradeDeleteRespose> GradeDataDelete(int GradeId, int AcademicYearId, int UserId);
    }
}
