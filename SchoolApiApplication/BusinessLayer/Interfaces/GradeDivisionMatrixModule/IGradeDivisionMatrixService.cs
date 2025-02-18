using SchoolApiApplication.DTO.GradeDivisionMatrixModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.GradeDivisionMatrixModule
{
    public interface IGradeDivisionMatrixService
    {
		public Task<GradeDivisionMatrixDto> GetGradeDivisionMatrixData(int? GradeId, int AcademicYearId);
        public Task<int> GradeDivisionMatrixDataUpsert(GradeDivisionMatrixDto GradeDivisionObj, int UserId, int AcademicYearId);
        public Task<DatatableResponseModel> GetGradeDivisionMatrixList(DatatableRequestWrapper requestObjectWrapper);
        public Task<GradeDivisionMatrixDeleteRespose> GradeDivisionMatrixDelete(int? GradeId, string divisionName, int academicYearId, int UserId);
    }
}
