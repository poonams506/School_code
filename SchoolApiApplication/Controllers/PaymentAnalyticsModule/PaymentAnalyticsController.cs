 using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.DashBoardModule;
using SchoolApiApplication.BusinessLayer.Interfaces.PaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Services.DashBoardModule;
using SchoolApiApplication.DTO.DashboardModule;
using SchoolApiApplication.DTO.PaymentAnalytics;

namespace SchoolApiApplication.Controllers.PaymentAnalyticsModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentAnalyticsController : ControllerBase
    {
        private readonly IPaymentAnalyticsService _paymentAnalyticsService;
        private readonly IHttpContextAccessor _httpcontextAccessor;

        public PaymentAnalyticsController(IHttpContextAccessor httpContextAccessor, IPaymentAnalyticsService paymentAnalyticsService)
        {
            _httpcontextAccessor = httpContextAccessor;
            _paymentAnalyticsService = paymentAnalyticsService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetPaymentAnalyticsSchool")]
        public async Task<ActionResult<PaymentAnalyticsDto>> GetPaymentAnalyticsSchool(Int16 AcademicYearId)
       {
           if (_httpcontextAccessor.HttpContext != null)
          {
               var schoolAnalytics = await _paymentAnalyticsService.GetPaymentAnalyticsSchool(AcademicYearId);
               return Ok(schoolAnalytics);
           }
           return Ok(await Task.FromResult(new PaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetPaymentAnalyticsGrade")]

        public async Task<ActionResult<PaymentAnalyticsDto>> GetPaymentAnalyticsGrade(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var gradeAnalytics = await _paymentAnalyticsService.GetPaymentAnalyticsGrade(AcademicYearId);
                return Ok(gradeAnalytics);
            }
            return Ok(await Task.FromResult(new PaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetPaymentAnalyticsDivision")]
        public async Task<ActionResult<PaymentAnalyticsDto>> GetPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var divisionAnalytics = await _paymentAnalyticsService.GetPaymentAnalyticsDivision(GradeId, AcademicYearId);
                return Ok(divisionAnalytics);
            }
            return Ok(await Task.FromResult(new PaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetPaymentAnalyticsStudent")]
        public async Task<ActionResult<PaymentAnalyticsDto>> GetPaymentAnalyticsStudent(Int16 GradeId, Int16 DivisionId,Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var studentAnalytics = await _paymentAnalyticsService.GetPaymentAnalyticsStudent(GradeId, DivisionId, AcademicYearId);
                return Ok(studentAnalytics);
            }
            return Ok(await Task.FromResult(new PaymentAnalyticsDto()));

        }

    }
}
