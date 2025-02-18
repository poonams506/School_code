using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using SchoolApiApplication.Repository.Services.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Services.ExportModule
{
    public class TransportPaymentAnalyticsExportService : ITransportPaymentAnalyticsExportService
    {
        private readonly ITransportPaymentAnalyticsExportRepository _transportPaymentAnalyticsExportRepository;

        public TransportPaymentAnalyticsExportService(ITransportPaymentAnalyticsExportRepository transportPaymentAnalyticsExportRepository)
        {
            _transportPaymentAnalyticsExportRepository = transportPaymentAnalyticsExportRepository;
        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsDivision(short AcademicYearId, short GradeId, short DivisionId)
        {
            return await _transportPaymentAnalyticsExportRepository.GetTransportExportPaymentAnalyticsDivision(AcademicYearId, GradeId,DivisionId);

        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsGrade(short AcademicYearId, short GradeId)
        {

            return await _transportPaymentAnalyticsExportRepository.GetTransportExportPaymentAnalyticsGrade(AcademicYearId, GradeId);
        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsSchool(short AcademicYearId)
        {
            return await _transportPaymentAnalyticsExportRepository.GetTransportExportPaymentAnalyticsSchool(AcademicYearId);
        }

        public async Task<TransportPaymentAnalyticsExportDto> GetTransportExportPaymentAnalyticsStaffList(short AcademicYearId)
        {
            return await _transportPaymentAnalyticsExportRepository.GetTransportExportPaymentAnalyticsStaffList(AcademicYearId);
        }
    }
}
