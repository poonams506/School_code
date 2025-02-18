using SchoolApiApplication.DTO.TransportPaymentAnalyticsModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.TransportPaymentAnalyticsModule
{
    public interface ITransportPaymentAnalyticsService
    {
        public Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsSchool(Int16 AcademicYearId);
        public Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsGrade(Int16 AcademicYearId);
        public Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId);
        public Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStudent(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId);
        public Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStaff(Int16 AcademicYearId);
        public Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStaffList(Int16 AcademicYearId);
    }
}
