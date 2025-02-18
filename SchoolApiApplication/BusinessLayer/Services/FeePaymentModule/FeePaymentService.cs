using SchoolApiApplication.BusinessLayer.Interfaces.FeePaymentModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.FeePaymentModule;

namespace SchoolApiApplication.BusinessLayer.Services.FeePaymentModule
{
    public class FeePaymentService : IFeePaymentService
    {
        private readonly IFeePaymentRepository _feePaymentRepository;
        public FeePaymentService(IFeePaymentRepository feePaymentRepository)
        {
            _feePaymentRepository = feePaymentRepository;
        }
        #region Fee Payment
        public async Task<DatatableResponseModel> GetFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _feePaymentRepository.GetFeePaymentGridList(requestObjectWrapper);
        }
        public async Task<DatatableResponseModel> GetFeePaymentDueListByAY(int studentId, bool currentAcademicYearInclude)
        {
            return await _feePaymentRepository.GetFeePaymentDueListByAY(studentId, currentAcademicYearInclude);
        }
        public async Task<FeePaymentSelectDto> GetFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId)
        {
            return await _feePaymentRepository.GetFeePaymentSelect(academicYearId, studentId, GradeId, DivisionId);
        }
        public async Task<int> FeePaymentUpsert(FeePaymentUpsertDto feePaymentUpsertDto)
        {
            return await _feePaymentRepository.FeePaymentUpsert(feePaymentUpsertDto);
        }
        public async Task<int> FeePaymentPreviousAYPedingFeeUpdate(long StudentId, decimal PreviousAcademicYearPendingFeeAmount, int UserId)
        {
            return await _feePaymentRepository.FeePaymentPreviousAYPedingFeeUpdate(StudentId, PreviousAcademicYearPendingFeeAmount, UserId);
        }
        public async Task<PaymentFeePageMasterActivityList> GetPaymentFeePageMasterActivityList(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId)
        {
            return await _feePaymentRepository.GetPaymentFeePageMasterActivityList(GradeId, DivisionId, AcademicYearId, StudentId);
        }
        #endregion

        #region Fee Payment History
        public async Task<DatatableResponseModel> GetFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _feePaymentRepository.GetFeePaymentHistoryGridList(requestObjectWrapper);
        }
        public async Task<FeePaymentHistorySelectDto> GetFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long FeePaymentId)
        {
            return await _feePaymentRepository.GetFeePaymentHistorySelect(GradeId, DivisionId, AcademicYearId, StudentId, FeePaymentId);
        }
        public async Task<bool> ClearCheque(long FeePaymentId, int userId)
        {
            return await _feePaymentRepository.ClearCheque(FeePaymentId, userId);
        }
        public async Task<int> FeePaymentDelete(long FeePaymentId, int userId)
        {
            return await _feePaymentRepository.FeePaymentDelete(FeePaymentId, userId);
        }

        #endregion

        #region Payment Report

        public async Task<DaywisePaymentReportDTO> GetDayWisePaymentReport(DateTime StartDate, DateTime EndDate)
        {
            return await _feePaymentRepository.GetDayWisePaymentReport(StartDate, EndDate);
        }
        #endregion

    }
}
