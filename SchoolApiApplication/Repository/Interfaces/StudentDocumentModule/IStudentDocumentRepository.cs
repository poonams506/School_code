
using SchoolApiApplication.DTO.StudentDocumentModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentDocumentModule
{
    public interface IStudentDocumentRepository
    {
        public Task<StudentDocumentDto> GetStudentDocumentList(long StudentId);
        public Task<int> StudentDocumentInsert(StudentDocumentDto studentDocumentDto, int UserId);
        public Task<int> StudentDocumentDelete(long DocumentId, int UserId);
        public Task<StudentDocumentDto>GetStudentDocumentSelect(long DocumentId);

    }
}
