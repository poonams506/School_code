using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.PaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TransportPaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Services.PaymentAnalyticsModule;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.DTO.TransportPaymentAnalyticsModule;

namespace SchoolApiApplication.Controllers.TransportPaymentAnalytics
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportPaymentAnalyticsController : ControllerBase
    {
        private readonly ITransportPaymentAnalyticsService _transportPaymentAnalyticsService;
        private readonly IHttpContextAccessor _httpcontextAccessor;

        public TransportPaymentAnalyticsController(IHttpContextAccessor httpContextAccessor, ITransportPaymentAnalyticsService transportPaymentAnalyticsService)
        {
            _httpcontextAccessor = httpContextAccessor;
            _transportPaymentAnalyticsService = transportPaymentAnalyticsService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportPaymentAnalyticsSchool")]
        public async Task<ActionResult<TransportPaymentAnalyticsDto>> GetTransportPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportSchoolAnalytics = await _transportPaymentAnalyticsService.GetTransportPaymentAnalyticsSchool(AcademicYearId);
                return Ok(transportSchoolAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportPaymentAnalyticsGrade")]

        public async Task<ActionResult<TransportPaymentAnalyticsDto>> GetTransportPaymentAnalyticsGrade(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportGradeAnalytics = await _transportPaymentAnalyticsService.GetTransportPaymentAnalyticsGrade(AcademicYearId);
                return Ok(transportGradeAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportPaymentAnalyticsDivision")]
        public async Task<ActionResult<TransportPaymentAnalyticsDto>> GetTransportPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportDivisionAnalytics = await _transportPaymentAnalyticsService.GetTransportPaymentAnalyticsDivision(GradeId, AcademicYearId);
                return Ok(transportDivisionAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportPaymentAnalyticsStudent")]
        public async Task<ActionResult<TransportPaymentAnalyticsDto>> GetTransportPaymentAnalyticsStudent(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportStudentAnalytics = await _transportPaymentAnalyticsService.GetTransportPaymentAnalyticsStudent(GradeId, DivisionId, AcademicYearId);
                return Ok(transportStudentAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportPaymentAnalyticsStaff")]
        public async Task<ActionResult<TransportPaymentAnalyticsDto>> GetTransportPaymentAnalyticsStaff(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportStudentAnalytics = await _transportPaymentAnalyticsService.GetTransportPaymentAnalyticsStaff(AcademicYearId);
                return Ok(transportStudentAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsDto()));

        }


        [Authorize]
        [HttpGet]
        [Route("GetTransportPaymentAnalyticsStaffList")]
        public async Task<ActionResult<TransportPaymentAnalyticsDto>> GetTransportPaymentAnalyticsStaffList(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var transportStudentAnalytics = await _transportPaymentAnalyticsService.GetTransportPaymentAnalyticsStaffList(AcademicYearId);
                return Ok(transportStudentAnalytics);
            }
            return Ok(await Task.FromResult(new TransportPaymentAnalyticsDto()));

        }






    }
}
