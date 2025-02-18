using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.FeePaymentModule;

namespace SchoolApiApplication.Repository.Interfaces.AdhocFeePaymentModule
{
    public interface IAdhocFeePaymentRepository
    {
        #region Fee Payment
        public Task<DatatableResponseModel> GetAdhocFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<AdhocFeePaymentSelectDto> GetAdhocFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId);
        public Task<int> AdhocFeePaymentUpsert(AdhocFeePaymentUpsertDto adhocFeePaymentUpsertDto);
        #endregion

        #region Fee Payment History
        public Task<DatatableResponseModel> GetAdhocFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<AdhocFeePaymentHistorySelectDto> GetAdhocFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long adhocFeePaymentId);
        public Task<bool> AdhocClearCheque(long adhocFeePaymentId, int UserId);
        public Task<int> AdhocFeePaymentDelete(long adhocFeePaymentId,int UserId);
        #endregion
        
        #region Adhoc Daywise Payment Report
        public Task<AdhocFeePaymentDaywiseReportDto> GetDayWiseAdhocPaymentReport(DateTime StartDate, DateTime EndDate);
        #endregion
    }
}
