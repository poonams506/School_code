using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.TransportFeePaymentModule;

namespace SchoolApiApplication.Repository.Interfaces.TransportFeePaymentModule
{
    public interface ITransportFeePaymentRepository
    {
        #region Transport Fee Payment
        public Task<DatatableResponseModel> GetTransportFeePaymentStudentGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<DatatableResponseModel> GetTransportFeePaymentStaffGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<DatatableResponseModel> GetTransportFeePaymentDueListByAY(int consumerId, int roleId, bool currentAcademicYearInclude);
        public Task<TransportFeePaymentSelectDto> GetTransportFeePaymentSelect(Int32 academicYearId, long consumerId, int roleId, int transportConsumerStoppageMappingId);
        public Task<int> TransportFeePaymentUpsert(TransportFeePaymentUpsertDto feeTransportPaymentUpsertDto);
        public Task<TransportFeeMonthMastersDto> GetTransportFeePaymentMonths(Int32 academicYearId, long consumerId, int roleId, int transportConsumerStoppageMappingId);
        public Task<TransportFeePaymentStoppageGridDto> GetTransportFeePaymentStoppageGridLIst(Int32 academicYearId, long consumerId, int roleId);
        #endregion

        #region Transport Fee Payment History
        public Task<DatatableResponseModel> GetTransportFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<TransportFeePaymentHistorySelectDto> GetTransportFeePaymentHistorySelect(int roleId, Int16 academicYearId, long consumerId, long transportFeePaymentId, int transportConsumerStoppageMappingId);
        public Task<bool> TransportClearCheque(long transportFeePaymentId, int userId);
        public Task<int> TransportFeePaymentDelete(long transportFeePaymentId, int userId);
        #endregion
        #region Transport Fee Payment Report
        public Task<TransportPaymentReportDaywiseDto> GetDayWiseTransportPaymentReport(DateTime StartDate, DateTime EndDate);

        #endregion
    }
}
