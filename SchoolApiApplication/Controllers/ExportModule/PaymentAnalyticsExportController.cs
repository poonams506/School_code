using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.DTO.ExportModule;
using System.Runtime.InteropServices;

namespace SchoolApiApplication.Controllers.ExportModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentAnalyticsExportController : ControllerBase
    {
        private readonly IPaymentAnalyticsExportService _paymentAnalyticsExportService;
        private readonly IHttpContextAccessor _httpcontextAccessor;

        public PaymentAnalyticsExportController(IHttpContextAccessor httpContextAccessor, IPaymentAnalyticsExportService paymentAnalyticsExportService)
        {
            _httpcontextAccessor = httpContextAccessor;
            _paymentAnalyticsExportService = paymentAnalyticsExportService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetExportPaymentAnalyticsSchool")]
        public async Task<ActionResult<PaymentAnalyticsExportDto>> GetExportPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var exportSchoolAnalytics = await _paymentAnalyticsExportService.GetExportPaymentAnalyticsSchool(AcademicYearId);
                return Ok(exportSchoolAnalytics);
            }
            return Ok(await Task.FromResult(new PaymentAnalyticsExportDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetExportPaymentAnalyticsGrade")]

        public async Task<ActionResult<PaymentAnalyticsExportDto>> GetExportPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var exportGradeAnalytics = await _paymentAnalyticsExportService.GetExportPaymentAnalyticsGrade(AcademicYearId, GradeId);
                return Ok(exportGradeAnalytics);
            }
            return Ok(await Task.FromResult(new PaymentAnalyticsExportDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetExportPaymentAnalyticsDivision")]
        public async Task<ActionResult<PaymentAnalyticsExportDto>> GetExportPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var exportdivisionAnalytics = await _paymentAnalyticsExportService.GetExportPaymentAnalyticsDivision(AcademicYearId, GradeId, DivisionId);
                return Ok(exportdivisionAnalytics);
            }
            return Ok(await Task.FromResult(new PaymentAnalyticsExportDto()));

        }
    }
}
