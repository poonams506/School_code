using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.StudentKitFeePaymentModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentKitFeePaymentModule
{
    public interface IStudentKitFeePaymentRepository
    {
        
        public Task<DatatableResponseModel> GetStudentKitFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<StudentKitFeePaymentDueByAYSelectResponseDto> GetStudentKitFeePaymentDueByAYSelect(int studentId, bool currentAcademicYearInclude);
        public Task<StudentKitFeepaymentSelectDto> GetStudentKitFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId);
        public Task<int> StudentKitFeePaymentUpsert(StudentKitFeepaymentUpsertDto feePaymentUpsertDto);
       
        public Task<DatatableResponseModel> GetStudentKitFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper);
        public Task<StudentKitFeepaymentHistorySelectDto> GetStudentKitFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long StudentKitFeePaymentId);
        public Task<bool> StudentKitClearCheque(long StudentKitFeePaymentId, int userId);
        public Task<int> StudentKitFeePaymentDelete(long StudentKitFeePaymentId, int userId);

        #region StudentKit Payment Daywise Report
        public Task<StudentKitDaywisePaymentReportDto> GetStudentKitDayWisePaymentReport(DateTime StartDate, DateTime EndDate);
        #endregion
    }
} 
