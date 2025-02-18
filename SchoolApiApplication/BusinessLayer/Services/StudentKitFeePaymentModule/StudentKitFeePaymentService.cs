using SchoolApiApplication.BusinessLayer.Interfaces.StudentKitFeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentKitFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.StudentKitFeePaymentModule;
using SchoolApiApplication.Repository.Interfaces.StudentModule;
using SchoolApiApplication.Repository.Services.StudentModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentKitFeePaymentModule
{
    public class StudentKitFeePaymentService : IStudentKitFeePaymentService
    {
        private readonly IStudentKitFeePaymentRepository _studentKitFeePaymentRepository;
        public StudentKitFeePaymentService(IStudentKitFeePaymentRepository studentKitFeePaymentRepository)
        {
            _studentKitFeePaymentRepository = studentKitFeePaymentRepository;
        }

       
        public async Task<StudentKitFeePaymentDueByAYSelectResponseDto> GetStudentKitFeePaymentDueByAYSelect(int studentId, bool currentAcademicYearInclude)
        {
            return await _studentKitFeePaymentRepository.GetStudentKitFeePaymentDueByAYSelect(studentId, currentAcademicYearInclude);
        }

        public async Task<DatatableResponseModel> GetStudentKitFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _studentKitFeePaymentRepository.GetStudentKitFeePaymentGridList(requestObjectWrapper);
        }

        public async Task<DatatableResponseModel> GetStudentKitFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _studentKitFeePaymentRepository.GetStudentKitFeePaymentHistoryGridList(requestObjectWrapper);
        }

        public async Task<StudentKitFeepaymentHistorySelectDto> GetStudentKitFeePaymentHistorySelect(short GradeId, short DivisionId, short AcademicYearId, long StudentId, long StudentKitFeePaymentId)
        {
            return await _studentKitFeePaymentRepository.GetStudentKitFeePaymentHistorySelect(GradeId, DivisionId, AcademicYearId, StudentId, StudentKitFeePaymentId);
        }

        public async Task<StudentKitFeepaymentSelectDto> GetStudentKitFeePaymentSelect(int academicYearId, long studentId, int GradeId, int DivisionId)
        {
            return await _studentKitFeePaymentRepository.GetStudentKitFeePaymentSelect(academicYearId, studentId,GradeId, DivisionId);
        }

        public async Task<bool> StudentKitClearCheque(long StudentKitFeePaymentId, int userId)
        {
            return await _studentKitFeePaymentRepository.StudentKitClearCheque(StudentKitFeePaymentId, userId);
        }

        public async Task<int> StudentKitFeePaymentDelete(long StudentKitFeePaymentId, int userId)
        {
            return await _studentKitFeePaymentRepository.StudentKitFeePaymentDelete(StudentKitFeePaymentId, userId);
        }

        public async Task<int>StudentKitFeePaymentUpsert(StudentKitFeepaymentUpsertDto feePaymentUpsertDto)
        {
            return await _studentKitFeePaymentRepository.StudentKitFeePaymentUpsert(feePaymentUpsertDto);
        }
        #region StudentKit Daywise Payment Report

        public async Task<StudentKitDaywisePaymentReportDto> GetStudentKitDayWisePaymentReport(DateTime StartDate, DateTime EndDate)
        {
            return await _studentKitFeePaymentRepository.GetStudentKitDayWisePaymentReport(StartDate, EndDate);
        }
        #endregion

    }
}
