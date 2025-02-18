using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.PaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentKitPaymentAnalyticsModule;
using SchoolApiApplication.BusinessLayer.Services.PaymentAnalyticsModule;
using SchoolApiApplication.DTO.PaymentAnalytics;
using SchoolApiApplication.DTO.StudentKitPaymentAnalyticsModule;

namespace SchoolApiApplication.Controllers.StudentKitPaymentAnalyticsModule
{

    [Route("api/[controller]")]
    [ApiController]

    public class StudentKitAnalyticsPaymentAnalyticsController : ControllerBase
    {
        private readonly IStudentKitPaymentAnalyticsService _studentKitPaymentAnalyticsService;
        private readonly IHttpContextAccessor _httpcontextAccessor;
        public StudentKitAnalyticsPaymentAnalyticsController(IHttpContextAccessor httpContextAccessor, IStudentKitPaymentAnalyticsService studentKitPaymentAnalyticsService)
        {
            _httpcontextAccessor = httpContextAccessor;
            _studentKitPaymentAnalyticsService = studentKitPaymentAnalyticsService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitPaymentAnalyticsSchool")]
        public async Task<ActionResult<StudentKitPaymentAnalyticsDto>> GetStudentKitPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var schoolStudentKitAnalytics = await _studentKitPaymentAnalyticsService.GetStudentKitPaymentAnalyticsSchool(AcademicYearId);
                return Ok(schoolStudentKitAnalytics);
            }
            return Ok(await Task.FromResult(new StudentKitPaymentAnalyticsDto()));


        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitPaymentAnalyticsGrade")]

        public async Task<ActionResult<StudentKitPaymentAnalyticsDto>> GetStudentKitPaymentAnalyticsGrade(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var gradeStudentKitAnalytics = await _studentKitPaymentAnalyticsService.GetStudentKitPaymentAnalyticsGrade(AcademicYearId);
                return Ok(gradeStudentKitAnalytics);
            }
            return Ok(await Task.FromResult(new StudentKitPaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitPaymentAnalyticsDivision")]
        public async Task<ActionResult<StudentKitPaymentAnalyticsDto>> GetStudentKitPaymentAnalyticsDivision(Int16 GradeId, Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var divisionStudentKitAnalytics = await _studentKitPaymentAnalyticsService.GetStudentKitPaymentAnalyticsDivision(GradeId, AcademicYearId);
                return Ok(divisionStudentKitAnalytics);
            }
            return Ok(await Task.FromResult(new StudentKitPaymentAnalyticsDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitPaymentAnalyticsStudent")]
        public async Task<ActionResult<StudentKitPaymentAnalyticsDto>> GetStudentKitPaymentAnalyticsStudent(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var studentKitAnalytics = await _studentKitPaymentAnalyticsService.GetStudentKitPaymentAnalyticsStudent(GradeId, DivisionId, AcademicYearId);
                return Ok(studentKitAnalytics);
            }
            return Ok(await Task.FromResult(new StudentKitPaymentAnalyticsDto()));

        }


    }
}
