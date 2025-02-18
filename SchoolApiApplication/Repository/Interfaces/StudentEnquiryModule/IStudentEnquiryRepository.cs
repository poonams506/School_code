using SchoolApiApplication.DTO.StudentEnquiryModule;
using SchoolApiApplication.DTO.SubjectMappingModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentEnquiryModule
{
    public interface IStudentEnquiryRepository
    {
        public Task<StudentEnquiryDto> StudentEnquirySelect(int StudentEnquiryId);
        public Task<DatatableResponseModel> StudentEnquiryGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId);
        public Task<StudentEnquiryIdModelResponse> StudentEnquiryUpsert(StudentEnquiryDto obj, int UserId);
        public Task<StudentEnquiryIdModelResponse> StudentEnquirydelete(int? StudentEnquiryId, int UserId);
        public Task<StudentEnquiryDto> GetEnquiryTypeDropDown();
        public Task<StudentEnquiryDto> GetEnquiryStatusDropDown();
    }
}
