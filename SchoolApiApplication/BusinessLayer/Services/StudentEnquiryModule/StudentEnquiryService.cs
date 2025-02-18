using SchoolApiApplication.BusinessLayer.Interfaces.StudentEnquiryModule;
using SchoolApiApplication.DTO.StudentEnquiryModule;
using SchoolApiApplication.Repository.Interfaces.StudentEnquiryModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentEnquiryModule
{
    public class StudentEnquiryService : IStudentEnquiryService
    {
        private readonly IStudentEnquiryRepository _studentEnquiryRepository;

        public StudentEnquiryService(IStudentEnquiryRepository StudentEnquiryRepository)
        {
            _studentEnquiryRepository = StudentEnquiryRepository;
        }

        public async Task<StudentEnquiryDto> GetEnquiryStatusDropDown()
        {
            return await _studentEnquiryRepository.GetEnquiryStatusDropDown();
        }

        public async Task<StudentEnquiryDto> GetEnquiryTypeDropDown()
        {
            return await _studentEnquiryRepository.GetEnquiryTypeDropDown();
        }

        public async Task<StudentEnquiryIdModelResponse> StudentEnquirydelete(int? StudentEnquiryId, int UserId)
        {
            return await _studentEnquiryRepository.StudentEnquirydelete(StudentEnquiryId, UserId);
        }

        public async Task<DatatableResponseModel> StudentEnquiryGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _studentEnquiryRepository.StudentEnquiryGridSelect(requestObjectWrapper, userId);
        }

        public async Task<StudentEnquiryDto> StudentEnquirySelect(int StudentEnquiryId)
        {
            return await _studentEnquiryRepository.StudentEnquirySelect(StudentEnquiryId);
        }

        public async Task<StudentEnquiryIdModelResponse> StudentEnquiryUpsert(StudentEnquiryDto obj, int UserId)
        {
            return await _studentEnquiryRepository.StudentEnquiryUpsert(obj, UserId);
        }
    }
}
