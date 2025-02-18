using SchoolApiApplication.BusinessLayer.Interfaces.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.Repository.Interfaces.GradeDivisionMatrixModule;
using SchoolApiApplication.Repository.Interfaces.TeacherGradeDivisionMappingModule;

namespace SchoolApiApplication.BusinessLayer.Services.TeacherGradeDivisionMappingModule
{
    public class TeacherGradeDivisionMappingService : ITeacherGradeDivisionMappingService
    {
        private readonly ITeacherGradeDivisionMappingRepository _teacherGradeDivisionMappingRepository;
        public TeacherGradeDivisionMappingService(ITeacherGradeDivisionMappingRepository teacherGradeDivisionMappingRepository)
        {
            _teacherGradeDivisionMappingRepository = teacherGradeDivisionMappingRepository;
        }
        public async Task<DatatableResponseModel> GetTeacherGradeDivisionMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _teacherGradeDivisionMappingRepository.GetTeacherGradeDivisionMappingList(requestObjectWrapper);
        }

        public async Task<int> TeacherGradeDivisionMappingInsert(TeacherGradeDivisionMappingDto teacherGradeDivisionMappingobj, int UserId)
        {

            return await _teacherGradeDivisionMappingRepository.TeacherGradeDivisionMappingInsert(teacherGradeDivisionMappingobj, UserId);
        }

        public async Task<int> TeacherMappingDelete(int UserId, int academicYearId, int gradeId, int divisionId, int teacherId)
        {
            return await _teacherGradeDivisionMappingRepository.TeacherMappingDelete(UserId, academicYearId, gradeId, divisionId, teacherId);
        }
    }
}
