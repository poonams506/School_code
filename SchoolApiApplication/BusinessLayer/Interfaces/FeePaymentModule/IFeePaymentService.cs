using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.FeePaymentModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.FeePaymentModule
{
    public interface IFeePaymentService
    {
        #region Fee Payment
        public Task<DatatableResponseModel> GetFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<DatatableResponseModel> GetFeePaymentDueListByAY(int studentId, bool currentAcademicYearInclude);
        public Task<FeePaymentSelectDto> GetFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId);
        public Task<int> FeePaymentUpsert(FeePaymentUpsertDto feePaymentUpsertDto);
        public Task<int> FeePaymentPreviousAYPedingFeeUpdate(long StudentId, decimal PreviousAcademicYearPendingFeeAmount, int UserId);
        public Task<PaymentFeePageMasterActivityList> GetPaymentFeePageMasterActivityList(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId);
        #endregion

        #region Fee Payment History
        public Task<DatatableResponseModel> GetFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<FeePaymentHistorySelectDto> GetFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long FeePaymentId);
        public Task<bool> ClearCheque(long FeePaymentId, int userId);
        public Task<int> FeePaymentDelete(long FeePaymentId, int userId);
        #endregion

        #region Payment Report
        public Task<DaywisePaymentReportDTO> GetDayWisePaymentReport(DateTime StartDate, DateTime EndDate);
        #endregion

    }
}
