using SchoolApiApplication.DTO.DashboardModule;
using SchoolApiApplication.DTO.PaymentAnalytics;

namespace SchoolApiApplication.Repository.Interfaces.PaymentAnalytics
{
    public interface IPaymentAnalyticsRepository
    {
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsGrade(Int16 AcademicYearId);
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId);
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsStudent(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId);
    }
}
