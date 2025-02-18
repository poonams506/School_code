using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.FeePaymentModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.AdhocFeePaymentModule
{
    public interface IAdhocFeePaymentService
    {
        #region Fee Payment
        public Task<DatatableResponseModel> GetAdhocFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<AdhocFeePaymentSelectDto> GetAdhocFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId);
        public Task<int> AdhocFeePaymentUpsert(AdhocFeePaymentUpsertDto adhocFeePaymentUpsertDto);
        #endregion

        #region Fee Payment History
        public Task<DatatableResponseModel> GetAdhocFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<AdhocFeePaymentHistorySelectDto> GetAdhocFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long AdhocFeePaymentId);
        public Task<bool> AdhocClearCheque(long AdhocFeePaymentId, int UserId);
        public Task<int> AdhocFeePaymentDelete(long AdhocFeePaymentId,int USerId);
        #endregion


        #region Adhoc Payemnt Daywise Report
        public Task<AdhocFeePaymentDaywiseReportDto> GetDayWiseAdhocPaymentReport(DateTime StartDate, DateTime EndDate);
        #endregion

    }
}
