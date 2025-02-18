using SchoolApiApplication.BusinessLayer.Interfaces.GradeModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.GradeModule;

namespace SchoolApiApplication.BusinessLayer.Services.GradeModule

{
    public class GradeService : IGradeService
    {
        private readonly IGradeRepository _gradeRepository;
        public GradeService(IGradeRepository gradeRepository)
        {
            _gradeRepository = gradeRepository;
        }
        public async Task<GradeDto> GetGradeData(int? GradeId)
        {
            return await _gradeRepository.GetGradeData(GradeId);
        }
        public async Task<GradeUpdateRespose> GradeDataUpsert(GradeDto GradeObj, int UserId)
        {
            return await _gradeRepository.GradeDataUpsert(GradeObj, UserId);
        }
        public async Task<DatatableResponseModel> GetGradeList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _gradeRepository.GetGradeList(requestObjectWrapper);
        }

        public async Task<GradeDeleteRespose> GradeDataDelete(int GradeId, int AcademicYearId, int UserId)
        {
            return await _gradeRepository.GradeDataDelete(GradeId, AcademicYearId, UserId);
        }
    }
}
