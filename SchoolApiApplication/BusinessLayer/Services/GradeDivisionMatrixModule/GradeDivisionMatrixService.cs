using SchoolApiApplication.BusinessLayer.Interfaces.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.GradeDivisionMatrixModule;

namespace SchoolApiApplication.BusinessLayer.Services.GradeDivisionMatrixModule
{
    public class GradeDivisionMatrixService : IGradeDivisionMatrixService
    {
        private readonly IGradeDivisionMatrixRepository _gradeDivisionMatrixRepository;
        public GradeDivisionMatrixService(IGradeDivisionMatrixRepository gradeDivisionMatrixRepository)
        {
            _gradeDivisionMatrixRepository = gradeDivisionMatrixRepository;
        }
        public async Task<GradeDivisionMatrixDto> GetGradeDivisionMatrixData(int? GradeId, int AcademicYearId)
        {
           return await _gradeDivisionMatrixRepository.GetGradeDivisionMatrixData(GradeId, AcademicYearId);
        }
        public async Task<int> GradeDivisionMatrixDataUpsert(GradeDivisionMatrixDto GradeDivisionObj, int UserId, int AcademicYearId)
        {
            return await _gradeDivisionMatrixRepository.GradeDivisionMatrixDataUpsert(GradeDivisionObj, UserId, AcademicYearId);
        }
        public async Task<DatatableResponseModel> GetGradeDivisionMatrixList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _gradeDivisionMatrixRepository.GetGradeDivisionMatrixList(requestObjectWrapper);
        }

        public async Task<GradeDivisionMatrixDeleteRespose> GradeDivisionMatrixDelete(int? GradeId, string divisionName, int academicYearId, int UserId)
        {
            return await _gradeDivisionMatrixRepository.GradeDivisionMatrixDelete(GradeId, divisionName, academicYearId, UserId);
        }
    }
}
