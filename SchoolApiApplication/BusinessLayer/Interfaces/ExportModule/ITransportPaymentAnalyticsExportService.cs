using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ExportModule
{
    public interface ITransportPaymentAnalyticsExportService
    {
        public Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId);
        public Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId);
        public Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsStaffList(Int16 AcademicYearId);
    }
}
