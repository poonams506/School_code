using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.DTO.StudentKitPaymentAnalyticsModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentKitPaymentAnalyticsModule
{
    public interface IStudentKitPaymentAnalyticsRepository
    {
        public Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsGrade(Int16 AcademicYearId);
        public Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId);
        public Task<StudentKitPaymentAnalyticsDto> GetStudentKitPaymentAnalyticsStudent(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId);
    }
}
