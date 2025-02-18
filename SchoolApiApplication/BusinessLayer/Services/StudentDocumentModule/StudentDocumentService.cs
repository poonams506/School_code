using SchoolApiApplication.BusinessLayer.Interfaces.StudentDocumentModule;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.Repository.Interfaces.StudentDocumentModule;


namespace SchoolApiApplication.BusinessLayer.Services.StudentDocumentModule
{
    public class StudentDocumentService : IStudentDocumentService
    {
        private readonly IStudentDocumentRepository _studentDocumentRepository;
        public StudentDocumentService(IStudentDocumentRepository studentDocumentRepository)
        {
            _studentDocumentRepository = studentDocumentRepository;
        }
        public async Task<StudentDocumentDto> GetStudentDocumentList(long StudentId)
        {
            return await _studentDocumentRepository.GetStudentDocumentList(StudentId);
        }
        public async Task<int> StudentDocumentInsert(StudentDocumentDto studentDocumentDto,int userId)
        {
            return await _studentDocumentRepository.StudentDocumentInsert(studentDocumentDto, userId);
        }
        public async Task<int> StudentDocumentDelete(long DocumentId, int UserId)
        {
            return await _studentDocumentRepository.StudentDocumentDelete(DocumentId, UserId);

        }
        public async Task<StudentDocumentDto> GetStudentDocumentSelect(long DocumentId)
        {
            return await _studentDocumentRepository.GetStudentDocumentSelect(DocumentId);

        }
    }
}

