using SchoolApiApplication.BusinessLayer.Interfaces.PaymentAnalyticsModule;
using SchoolApiApplication.DTO.DashboardModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.Repository.Interfaces.DashBoardModule;
using SchoolApiApplication.Repository.Interfaces.PaymentAnalytics;
using SchoolApiApplication.Repository.Services.DashBoardModule;
using SchoolApiApplication.Repository.Services.PaymentAnalyticsModule;

namespace SchoolApiApplication.BusinessLayer.Services.PaymentAnalyticsModule
{
    public class PaymentAnalyticsService : IPaymentAnalyticsService
    {
        private readonly IPaymentAnalyticsRepository _paymentAnalyticsRepository;

        public PaymentAnalyticsService(IPaymentAnalyticsRepository paymentAnalyticsRepository)
        {
            _paymentAnalyticsRepository = paymentAnalyticsRepository;
        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId)
        {
            return await _paymentAnalyticsRepository.GetPaymentAnalyticsDivision(GradeId,AcademicYearId);
        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsGrade(Int16 AcademicYearId)
        {
            return await _paymentAnalyticsRepository.GetPaymentAnalyticsGrade(AcademicYearId);
        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            return await _paymentAnalyticsRepository.GetPaymentAnalyticsSchool(AcademicYearId);
        }
        public async Task<PaymentAnalyticsDto> GetPaymentAnalyticsStudent(short GradeId, short DivisionId, Int16 AcademicYearId)
        {
            return await _paymentAnalyticsRepository.GetPaymentAnalyticsStudent(GradeId, DivisionId,AcademicYearId);
        }
    }
}
