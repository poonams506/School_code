using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using SchoolApiApplication.Repository.Interfaces.PaymentAnalytics;
using SchoolApiApplication.Repository.Services.PaymentAnalyticsModule;

namespace SchoolApiApplication.BusinessLayer.Services.ExportModule
{
    public class PaymentAnalyticsExportService : IPaymentAnalyticsExportService
    {
        private readonly IPaymentAnalyticsExportRepository _paymentAnalyticsExportRepository;

        public PaymentAnalyticsExportService(IPaymentAnalyticsExportRepository paymentAnalyticsExportRepository)
        {
            _paymentAnalyticsExportRepository = paymentAnalyticsExportRepository;
        }

        public async Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            return await _paymentAnalyticsExportRepository.GetExportPaymentAnalyticsSchool(AcademicYearId);
        }

        public async Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId)
        {
            return await _paymentAnalyticsExportRepository.GetExportPaymentAnalyticsGrade(AcademicYearId,GradeId);
        }

        public async Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            return await _paymentAnalyticsExportRepository.GetExportPaymentAnalyticsDivision(AcademicYearId, GradeId, DivisionId);
        }



    }
}
