using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.BusinessLayer.Services.ExportModule;
using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.Controllers.ExportModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportPaymentAnalyticsExportController : ControllerBase
    {
        private readonly ITransportPaymentAnalyticsExportService _transportPaymentAnalyticsExportService;
        private readonly IHttpContextAccessor _httpcontextAccessor;

        public TransportPaymentAnalyticsExportController(IHttpContextAccessor httpContextAccessor, ITransportPaymentAnalyticsExportService transportPaymentAnalyticsExportService)
        {
            _httpcontextAccessor = httpContextAccessor;
            _transportPaymentAnalyticsExportService = transportPaymentAnalyticsExportService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportExportPaymentAnalyticsSchool")]
        public async Task<ActionResult<TransportPaymentAnalyticsExportDto>> GetTransportExportPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportExportSchoolAnalytics = await _transportPaymentAnalyticsExportService.GetTransportExportPaymentAnalyticsSchool(AcademicYearId);
                return Ok(transportExportSchoolAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsExportDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportExportPaymentAnalyticsGrade")]

        public async Task<ActionResult<TransportPaymentAnalyticsExportDto>> GetTransportExportPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportExportGradeAnalytics = await _transportPaymentAnalyticsExportService.GetTransportExportPaymentAnalyticsGrade(AcademicYearId, GradeId);
                return Ok(transportExportGradeAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsExportDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportExportPaymentAnalyticsDivision")]
        public async Task<ActionResult<TransportPaymentAnalyticsExportDto>> GetTransportExportPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportExportdivisionAnalytics = await _transportPaymentAnalyticsExportService.GetTransportExportPaymentAnalyticsDivision(AcademicYearId, GradeId, DivisionId);
                return Ok(transportExportdivisionAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsExportDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportExportPaymentAnalyticsStaffList")]

        public async Task<ActionResult<TransportPaymentAnalyticsExportDto>> GetTransportExportPaymentAnalyticsStaffList(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportExportStaffAnalytics = await _transportPaymentAnalyticsExportService.GetTransportExportPaymentAnalyticsStaffList(AcademicYearId);
                return Ok(transportExportStaffAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsExportDto()));

        }



    }
}
