using SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.TeacherGradeDivisionMappingModule
{
    public interface ITeacherGradeDivisionMappingService
    {
        public Task<DatatableResponseModel> GetTeacherGradeDivisionMappingList(DatatableRequestWrapper requestObjectWrapper);
        public Task<int> TeacherGradeDivisionMappingInsert(TeacherGradeDivisionMappingDto teacherGradeDivisionMappingobj, int UserId);
        public Task<int> TeacherMappingDelete(int UserId, int academicYearId, int gradeId, int divisionId, int teacherId);
    }
}
