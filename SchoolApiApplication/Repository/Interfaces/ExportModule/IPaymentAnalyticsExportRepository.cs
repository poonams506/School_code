using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.DTO.PaymentAnalytics;

namespace SchoolApiApplication.Repository.Interfaces.ExportModule
{
    public interface IPaymentAnalyticsExportRepository
    {
        public Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsGrade(Int16 AcademicYearId,Int16 GradeId);
        public Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId ,Int16 DivisionId);
    }
}
