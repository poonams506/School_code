using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.BusinessLayer.Services.ExportModule;
using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.Controllers.ExportModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentKitPaymentAnalyticsExportController: ControllerBase
    {
        private readonly IStudentKitPaymentAnalyticsExportService _studentKitPaymentAnalyticsExportService;
        private readonly IHttpContextAccessor _httpcontextAccessor;

        public StudentKitPaymentAnalyticsExportController(IHttpContextAccessor httpContextAccessor, IStudentKitPaymentAnalyticsExportService studentKitPaymentAnalyticsExportService)
        {
            _httpcontextAccessor = httpContextAccessor;
            _studentKitPaymentAnalyticsExportService = studentKitPaymentAnalyticsExportService;
        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitPaymentAnalyticsExportSchool")]
        public async Task<ActionResult<StudentKitPaymentAnalyticsExportDto>> GetExportStudentKitPaymentAnalyticsSchool(Int16 AcademicYearId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var exportStudentKitSchoolAnalytics = await _studentKitPaymentAnalyticsExportService.GetExportStudentKitPaymentAnalyticsSchool(AcademicYearId);
                return Ok(exportStudentKitSchoolAnalytics);
            }
            return Ok(await Task.FromResult(new StudentKitPaymentAnalyticsExportDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitExportPaymentAnalyticsGrade")]

        public async Task<ActionResult<StudentKitPaymentAnalyticsExportDto>> GetExportStudentKitPaymentAnalyticsGrade(Int16 AcademicYearId, Int16 GradeId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var exportStudentKitGradeAnalytics = await _studentKitPaymentAnalyticsExportService.GetExportStudentKitPaymentAnalyticsGrade(AcademicYearId, GradeId);
                return Ok(exportStudentKitGradeAnalytics);
            }
            return Ok(await Task.FromResult(new StudentKitPaymentAnalyticsExportDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitExportPaymentAnalyticsDivision")]
        public async Task<ActionResult<StudentKitPaymentAnalyticsExportDto>> GetExportStudentKitPaymentAnalyticsDivision(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            if (_httpcontextAccessor.HttpContext != null)
            {
                var exportStudentKitDivisionAnalytics = await _studentKitPaymentAnalyticsExportService.GetExportStudentKitPaymentAnalyticsDivision(AcademicYearId, GradeId, DivisionId);
                return Ok(exportStudentKitDivisionAnalytics);
            }
            return Ok(await Task.FromResult(new StudentKitPaymentAnalyticsExportDto()));

        }

    }
}
