using SchoolApiApplication.DTO.TeacherSubjectMapping;

namespace SchoolApiApplication.BusinessLayer.Interfaces.TeacherSubjectMappingModule
{
    public interface ITeacherSubjectMappingService
    {
        public Task<DatatableResponseModel> GetTeacherSubjectMappingList(DatatableRequestWrapper requestObjectWrapper);
        public Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingInsert(TeacherSubjectMappingDto TeacherSubjectMappingObj, int UserId, int academicYearId, int teacherId);
        public Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingDelete(int UserId, int academicYearId, int teacherId, int subjectId);
    }
}
