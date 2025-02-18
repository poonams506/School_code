using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.Repository.Interfaces.StudentModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentModule
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }
        public async Task<StudentDto> GetStudentProfile(long? StudentId, int AcademicYearId)
        {
            return await _studentRepository.GetStudentProfile(StudentId, AcademicYearId);
        }
        public async Task<StudentIdModelResponse> StudentProfileUpsert(StudentDto StudentObj, int UserId)
        {
            return await _studentRepository.StudentProfileUpsert(StudentObj, UserId);
        }
        public async Task<DatatableResponseModel> GetStudentList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _studentRepository.GetStudentList(requestObjectWrapper);
        }

        public async Task<StudentDeleteRespose> StudentProfileDelete(long? StudentId, int AcademicYearId, int UserId)
        {
            return await _studentRepository.StudentProfileDelete(StudentId, AcademicYearId, UserId);
        }

        public async Task<StudentQRSelectResponse> GetQRCodeDetailByStudentId(long StudentId, int AcademicYearId)
        {
            return await _studentRepository.GetQRCodeDetailByStudentId(StudentId,AcademicYearId);

        }

        public async Task<IEnumerable<StudentQRSelectResponse>> GetQRCodeDetailForAllStudent(int AcademicYearId, int ClassId)
        {
            return await _studentRepository.GetQRCodeDetailForAllStudent( AcademicYearId,  ClassId);

        }

        public async Task<int> GetStudentCountByClass(int AcademicYearId, int ClassId) 
        {
            return await _studentRepository.GetStudentCountByClass(AcademicYearId, ClassId);

        }

       
    }
}
