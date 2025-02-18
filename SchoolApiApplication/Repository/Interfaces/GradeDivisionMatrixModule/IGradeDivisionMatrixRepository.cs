using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.Repository.Interfaces.GradeDivisionMatrixModule
{
    public interface IGradeDivisionMatrixRepository
    {
		public Task<GradeDivisionMatrixDto> GetGradeDivisionMatrixData(int? GradeId, int AcademicYearId);
        public Task<int> GradeDivisionMatrixDataUpsert(GradeDivisionMatrixDto GradeDivisionObj, int UserId, int AcademicYearId);
        public Task<DatatableResponseModel> GetGradeDivisionMatrixList(DatatableRequestWrapper requestObjectWrapper);
        public Task<GradeDivisionMatrixDeleteRespose> GradeDivisionMatrixDelete(int? GradeId, string divisionName, int academicYearId,int UserId);
    }
}
