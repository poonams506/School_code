using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.AdhocFeePaymentModule;

namespace SchoolApiApplication.BusinessLayer.Services.AdhocFeePaymentModule
{
    public class AdhocFeePaymentService : IAdhocFeePaymentService
    {
        private readonly IAdhocFeePaymentRepository _adhocFeePaymentRepository;
        public AdhocFeePaymentService(IAdhocFeePaymentRepository adhocFeePaymentRepository)
        {
            _adhocFeePaymentRepository = adhocFeePaymentRepository;
        }
        #region Fee Payment
        public async Task<DatatableResponseModel> GetAdhocFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _adhocFeePaymentRepository.GetAdhocFeePaymentGridList(requestObjectWrapper);
        }
        public async Task<AdhocFeePaymentSelectDto> GetAdhocFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId)
        {
            return await _adhocFeePaymentRepository.GetAdhocFeePaymentSelect(academicYearId, studentId, GradeId, DivisionId);
        }
        public async Task<int> AdhocFeePaymentUpsert(AdhocFeePaymentUpsertDto feePaymentUpsertDto)
        {
            return await _adhocFeePaymentRepository.AdhocFeePaymentUpsert(feePaymentUpsertDto);
        }
        #endregion

        #region Fee Payment History
        public async Task<DatatableResponseModel> GetAdhocFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _adhocFeePaymentRepository.GetAdhocFeePaymentHistoryGridList(requestObjectWrapper);
        }
        public async Task<AdhocFeePaymentHistorySelectDto> GetAdhocFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long FeePaymentId)
        {
            return await _adhocFeePaymentRepository.GetAdhocFeePaymentHistorySelect(GradeId, DivisionId, AcademicYearId, StudentId, FeePaymentId);
        }
        public async Task<bool> AdhocClearCheque(long FeePaymentId,int UserId)
        {
            return await _adhocFeePaymentRepository.AdhocClearCheque(FeePaymentId,UserId);
        }
        public async Task<int> AdhocFeePaymentDelete(long FeePaymentId,int UserId)
        {
            return await _adhocFeePaymentRepository.AdhocFeePaymentDelete(FeePaymentId, UserId);
        }
        #endregion

        #region Adhoc Fee Payement Daywise Report

        public async Task<AdhocFeePaymentDaywiseReportDto> GetDayWiseAdhocPaymentReport(DateTime StartDate, DateTime EndDate)
        {
            return await _adhocFeePaymentRepository.GetDayWiseAdhocPaymentReport(StartDate, EndDate);
        }
        #endregion

    }
}
