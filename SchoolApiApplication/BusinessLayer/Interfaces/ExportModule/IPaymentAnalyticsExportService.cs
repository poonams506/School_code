using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ExportModule
{
    public interface IPaymentAnalyticsExportService
    {
        public Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId);
        public Task<PaymentAnalyticsExportDto> GetExportPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId,Int16 DivisionId);
    }
}
