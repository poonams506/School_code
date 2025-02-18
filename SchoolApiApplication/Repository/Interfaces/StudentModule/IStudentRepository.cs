using SchoolApiApplication.DTO.StudentModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentModule
{
    public interface IStudentRepository
    {
        Task<StudentDto> GetStudentProfile(long? StudentId, int AcademicYearId);
        Task<StudentIdModelResponse> StudentProfileUpsert(StudentDto StudentObj, int UserId);
        Task<DatatableResponseModel> GetStudentList(DatatableRequestWrapper requestObjectWrapper);
        Task<StudentDeleteRespose> StudentProfileDelete(long? StudentId, int AcademicYearId,int UserId);
        Task<StudentQRSelectResponse> GetQRCodeDetailByStudentId(long StudentId, int AcademicYearId);

        Task<IEnumerable<StudentQRSelectResponse>> GetQRCodeDetailForAllStudent(int AcademicYearId, int ClassId);
        Task<int> GetStudentCountByClass(int AcademicYearId, int ClassId);
    }

}
