using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule;

namespace SchoolApiApplication.Repository.Interfaces.TeacherGradeDivisionMappingModule
{
    public interface ITeacherGradeDivisionMappingRepository
    {
        public Task<DatatableResponseModel> GetTeacherGradeDivisionMappingList(DatatableRequestWrapper requestObjectWrapper);
        public Task<int> TeacherGradeDivisionMappingInsert(TeacherGradeDivisionMappingDto teacherGradeDivisionMappingobj, int UserId);
        public Task<int> TeacherMappingDelete(int UserId, int academicYearId, int gradeId, int divisionId, int teacherId);

    }
}
