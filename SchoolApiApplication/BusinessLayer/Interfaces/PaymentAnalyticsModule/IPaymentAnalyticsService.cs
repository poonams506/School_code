using SchoolApiApplication.DTO.PaymentAnalytics;

namespace SchoolApiApplication.BusinessLayer.Interfaces.PaymentAnalyticsModule
{
    public interface IPaymentAnalyticsService
    {
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsGrade(Int16 AcademicYearId);
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId);
        public Task<PaymentAnalyticsDto> GetPaymentAnalyticsStudent(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId);
    }
}
