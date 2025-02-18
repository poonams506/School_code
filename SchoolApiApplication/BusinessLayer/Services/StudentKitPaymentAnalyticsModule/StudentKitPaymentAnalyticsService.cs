using SchoolApiApplication.BusinessLayer.Interfaces.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.Repository.Interfaces.PaymentAnalytics;
using SchoolApiApplication.Repository.Interfaces.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.Repository.Services.PaymentAnalyticsModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentKitPaymentAnalyticsModule
{
    public class StudentKitPaymentAnalyticsService : IStudentKitPaymentAnalyticsService
    {

        private readonly IStudentKitPaymentAnalyticsRepository _studentKitPAymentAnalyticsRepository;

        public StudentKitPaymentAnalyticsService(IStudentKitPaymentAnalyticsRepository studentKitPAymentAnalyticsRepository)
        {
            _studentKitPAymentAnalyticsRepository = studentKitPAymentAnalyticsRepository;
        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsDivision(short GradeId, short AcademicYearId)
        {
            return await _studentKitPAymentAnalyticsRepository.GetStudentKitPaymentAnalyticsDivision(GradeId, AcademicYearId);
        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsGrade(short AcademicYearId)
        {
            return await _studentKitPAymentAnalyticsRepository.GetStudentKitPaymentAnalyticsGrade(AcademicYearId);
        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsSchool(short AcademicYearId)
        {
            return await _studentKitPAymentAnalyticsRepository.GetStudentKitPaymentAnalyticsSchool(AcademicYearId);
        }

        public async Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsStudent(short GradeId, short DivisionId, short AcademicYearId)
        {
            return await _studentKitPAymentAnalyticsRepository.GetStudentKitPaymentAnalyticsStudent(GradeId, DivisionId, AcademicYearId);

        }
    }
}
