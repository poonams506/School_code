using SchoolApiApplication.BusinessLayer.Interfaces.TransportPaymentAnalyticsModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TransportPaymentAnalyticsModule;
using SchoolApiApplication.Repository.Interfaces.PaymentAnalytics;
using SchoolApiApplication.Repository.Interfaces.TransportPaymentAnalyticsModule;
using SchoolApiApplication.Repository.Services.PaymentAnalyticsModule;

namespace SchoolApiApplication.BusinessLayer.Services.TransportPaymnetAnalyticsModule
{
    public class TransportPaymentAnalyticsService : ITransportPaymentAnalyticsService
    {
        private readonly ITransportPaymentAnalyticsRepository _transportPaymentAnalyticsRepository;

        public TransportPaymentAnalyticsService(ITransportPaymentAnalyticsRepository transportPaymentAnalyticsRepository)
        {
            _transportPaymentAnalyticsRepository = transportPaymentAnalyticsRepository;
        }
        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsDivision(short GradeId, short AcademicYearId)
        {

            return await _transportPaymentAnalyticsRepository.GetTransportPaymentAnalyticsDivision(GradeId, AcademicYearId);
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsGrade(short AcademicYearId)
        {
            return await _transportPaymentAnalyticsRepository.GetTransportPaymentAnalyticsGrade(AcademicYearId);
        }


        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsSchool(short AcademicYearId)
        {
            return await _transportPaymentAnalyticsRepository.GetTransportPaymentAnalyticsSchool(AcademicYearId);
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStaff(short AcademicYearId)
        {
            return await _transportPaymentAnalyticsRepository.GetTransportPaymentAnalyticsStaff(AcademicYearId);
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStaffList(short AcademicYearId)
        {
            return await _transportPaymentAnalyticsRepository.GetTransportPaymentAnalyticsStaffList(AcademicYearId);
        }

        public async Task<TransportPaymentAnalyticsDto> GetTransportPaymentAnalyticsStudent(short GradeId, short DivisionId, short AcademicYearId)
        {
            return await _transportPaymentAnalyticsRepository.GetTransportPaymentAnalyticsStudent(GradeId, DivisionId, AcademicYearId);

        }
    }
}
