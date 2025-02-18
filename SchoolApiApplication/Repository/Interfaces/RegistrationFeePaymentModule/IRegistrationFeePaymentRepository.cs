using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.RegistrationFeeModule;

namespace SchoolApiApplication.Repository.Interfaces.RegistrationFeePaymentModule
{
    public interface IRegistrationFeePaymentRepository
    {
        public Task<DatatableResponseModel> GetRegistrationFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<RegistrationFeePaymentSelectDto> GetRegistrationFeePaymentSelect(int academicYearId, long StudentEnquiryId);
        public Task<int> RegistrationFeePaymentUpsert(RegistrationFeePaymentDto registrationFeePaymentDto);
        public Task<int> RegistrationFeePaymentDelete(int RegistrationFeeId, int UserId);
        public Task<DatatableResponseModel> GetRegistrationFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<RegistrationFeePaymentHistorySelectDto> GetRegistrationFeePaymentHistorySelect(int AcademicYearId, long StudentEnquiryId, int RegistrationFeeId);


    }
}
