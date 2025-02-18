using SchoolApiApplication.DTO.RegistrationFeeModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.RegistrationFeePaymentModule
{
    public interface IRegistrationFeePaymentService
    {
        public Task<DatatableResponseModel> GetRegistrationFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<RegistrationFeePaymentSelectDto> GetRegistrationFeePaymentSelect(int academicYearId, long StudentEnquiryId);
        public Task<int> RegistrationFeePaymentUpsert(RegistrationFeePaymentDto registrationFeePaymentDto);
        public Task<int> RegistrationFeePaymentDelete(int RegistrationFeeId, int UserId);
        public Task<DatatableResponseModel> GetRegistrationFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<RegistrationFeePaymentHistorySelectDto> GetRegistrationFeePaymentHistorySelect(int AcademicYearId, long StudentEnquiryId, int RegistrationFeeId);


    }
}
