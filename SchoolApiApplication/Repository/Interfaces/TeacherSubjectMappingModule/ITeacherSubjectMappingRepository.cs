using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TeacherSubjectMapping;

namespace SchoolApiApplication.Repository.Interfaces.TeacherSubjectMappingModule
{
    public interface ITeacherSubjectMappingRepository
    {
        public Task<DatatableResponseModel> GetTeacherSubjectMappingList(DatatableRequestWrapper requestObjectWrapper);
        public Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingInsert(TeacherSubjectMappingDto TeacherSubjectMappingObj, int UserId, int academicYearId, int teacherId);
        public Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingDelete( int UserId, int academicYearId, int teacherId, int subjectId);

    }
}
