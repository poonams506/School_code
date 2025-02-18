using SchoolApiApplication.BusinessLayer.Interfaces.TransportFeePaymentModule;
using SchoolApiApplication.DTO.TransportFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.TransportFeePaymentModule;

namespace SchoolApiApplication.BusinessLayer.Services.TransportFeePaymentModule
{
    public class TransportFeePaymentService : ITransportFeePaymentService
    {
        private readonly ITransportFeePaymentRepository _feeTransportPaymentRepository;
        public TransportFeePaymentService(ITransportFeePaymentRepository feeTransportPaymentRepository)
        {
            _feeTransportPaymentRepository = feeTransportPaymentRepository;
        }
        public async Task<DatatableResponseModel> GetTransportFeePaymentDueListByAY(int consumerId, int roleId, bool currentAcademicYearInclude)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentDueListByAY(consumerId, roleId, currentAcademicYearInclude);
        }

        public async Task<DatatableResponseModel> GetTransportFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentHistoryGridList(requestObjectWrapper);
        }

        public async Task<TransportFeePaymentHistorySelectDto> GetTransportFeePaymentHistorySelect(int roleId, short academicYearId, long consumerId, long transportFeePaymentId, int transportConsumerStoppageMappingId)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentHistorySelect(roleId, academicYearId, consumerId, transportFeePaymentId, transportConsumerStoppageMappingId);
        }

        public async Task<TransportFeeMonthMastersDto> GetTransportFeePaymentMonths(int academicYearId, long consumerId, int roleId, int transportConsumerStoppageMappingId)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentMonths(academicYearId, consumerId, roleId, transportConsumerStoppageMappingId);
        }

        public async Task<TransportFeePaymentStoppageGridDto> GetTransportFeePaymentStoppageGridLIst(int academicYearId, long consumerId, int roleId)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentStoppageGridLIst(academicYearId, consumerId, roleId);
        }

        public async Task<TransportFeePaymentSelectDto> GetTransportFeePaymentSelect(int academicYearId, long consumerId, int roleId, int transportConsumerStoppageMappingId)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentSelect(academicYearId, consumerId, roleId, transportConsumerStoppageMappingId);
        }

        public async Task<DatatableResponseModel> GetTransportFeePaymentStaffGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentStaffGridList(requestObjectWrapper);
        }

        public async Task<DatatableResponseModel> GetTransportFeePaymentStudentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _feeTransportPaymentRepository.GetTransportFeePaymentStudentGridList(requestObjectWrapper);
        }

        public async Task<bool> TransportClearCheque(long transportFeePaymentId, int userId)
        {
            return await _feeTransportPaymentRepository.TransportClearCheque(transportFeePaymentId, userId);
        }

        public async Task<int> TransportFeePaymentDelete(long transportFeePaymentId, int userId)
        {
            return await _feeTransportPaymentRepository.TransportFeePaymentDelete(transportFeePaymentId, userId);
        }

        public async Task<int> TransportFeePaymentUpsert(TransportFeePaymentUpsertDto feeTransportPaymentUpsertDto)
        {
            return await _feeTransportPaymentRepository.TransportFeePaymentUpsert(feeTransportPaymentUpsertDto);
        }
        #region Transport Fee Payment Report

        public async Task<TransportPaymentReportDaywiseDto> GetDayWiseTranportPaymentReport(DateTime StartDate, DateTime EndDate)
        {
            return await _feeTransportPaymentRepository.GetDayWiseTransportPaymentReport(StartDate, EndDate);
        }
        #endregion

    }
}
