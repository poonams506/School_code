using SchoolApiApplication.BusinessLayer.Interfaces.RegistrationFeePaymentModule;
using SchoolApiApplication.DTO.RegistrationFeeModule;
using SchoolApiApplication.Repository.Interfaces.AdhocFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.RegistrationFeePaymentModule;
using SchoolApiApplication.Repository.Services.AdhocFeePaymentModule;

namespace SchoolApiApplication.BusinessLayer.Services.RegistrationFeePaymentModule
{
    public class RegistrationFeePaymentService : IRegistrationFeePaymentService
    {
        private readonly IRegistrationFeePaymentRepository _registrationFeePaymentRepository;
        public RegistrationFeePaymentService(IRegistrationFeePaymentRepository registrationFeePaymentRepository)
        {
            _registrationFeePaymentRepository = registrationFeePaymentRepository;
        }

        public async Task<DatatableResponseModel> GetRegistrationFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _registrationFeePaymentRepository.GetRegistrationFeePaymentGridList(requestObjectWrapper);

        }

    

        public async Task<RegistrationFeePaymentSelectDto> GetRegistrationFeePaymentSelect(int academicYearId, long StudentEnquiryId)
        {
            return await _registrationFeePaymentRepository.GetRegistrationFeePaymentSelect(academicYearId, StudentEnquiryId);

        }

        public async Task<int> RegistrationFeePaymentDelete(int RegistrationFeeId, int UserId)
        {
            return await _registrationFeePaymentRepository.RegistrationFeePaymentDelete(RegistrationFeeId, UserId);

        }

        public async Task<int> RegistrationFeePaymentUpsert(RegistrationFeePaymentDto registrationFeePaymentDto)
        {
            return await _registrationFeePaymentRepository.RegistrationFeePaymentUpsert(registrationFeePaymentDto);

        }
        public async Task<DatatableResponseModel> GetRegistrationFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _registrationFeePaymentRepository.GetRegistrationFeePaymentHistoryGridList(requestObjectWrapper);
        }

        public async Task<RegistrationFeePaymentHistorySelectDto> GetRegistrationFeePaymentHistorySelect(int AcademicYearId, long StudentEnquiryId, int RegistrationFeeId)
        {
            return await _registrationFeePaymentRepository.GetRegistrationFeePaymentHistorySelect(AcademicYearId, StudentEnquiryId, RegistrationFeeId);
        }
    }
}
