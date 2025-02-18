using SchoolApiApplication.BusinessLayer.Interfaces.TeacherSubjectMappingModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TeacherSubjectMapping;
using SchoolApiApplication.Repository.Interfaces.SubjectMappingModule;
using SchoolApiApplication.Repository.Interfaces.SubjectMasterModule;
using SchoolApiApplication.Repository.Interfaces.TeacherSubjectMappingModule;
using SchoolApiApplication.Repository.Services.SubjectMappingModule;

namespace SchoolApiApplication.BusinessLayer.Services.TeacherSubjectMappingModule
{
    public class TeacherSubjectMappingService : ITeacherSubjectMappingService
    {
        private readonly ITeacherSubjectMappingRepository _teacherSubjectMappingRepository;
        public TeacherSubjectMappingService(ITeacherSubjectMappingRepository teacherSubjectMappingRepository)
        {
            _teacherSubjectMappingRepository = teacherSubjectMappingRepository;
        }
        public async Task<DatatableResponseModel> GetTeacherSubjectMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _teacherSubjectMappingRepository.GetTeacherSubjectMappingList(requestObjectWrapper);
        }

        public async Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingInsert(TeacherSubjectMappingDto TeacherSubjectMappingObj, int UserId, int academicYearId, int teacherId)
        {
            return await _teacherSubjectMappingRepository.TeacherSubjectMappingInsert(TeacherSubjectMappingObj, UserId, academicYearId, teacherId);
        }
        public async Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingDelete(int UserId, int academicYearId, int teacherId, int subjectId)
        {
            return await _teacherSubjectMappingRepository.TeacherSubjectMappingDelete(UserId, academicYearId, teacherId, subjectId);
        }
    }
}
