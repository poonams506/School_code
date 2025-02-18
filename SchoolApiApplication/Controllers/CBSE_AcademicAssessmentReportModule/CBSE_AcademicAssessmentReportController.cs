
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Services.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.DTO.CBSE_AcademicAssessmentReportModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.TransportModule;

namespace SchoolApiApplication.Controllers.CBSE_AcademicAssessmentReportModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class CBSE_AcademicAssessmentReportController : ControllerBase
    {
        private readonly ICBSE_AcademicAssessmentReportService _academicAssessmentReportService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;

        public CBSE_AcademicAssessmentReportController(IWebHostEnvironment hostingEnvironment, ICommonAppService commonAppService,
             IHttpContextAccessor httpContextAccessor, ICBSE_AcademicAssessmentReportService academicAssessmentReportService, IStorageService storageService)

        {
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _storageService = storageService;
            _commonAppService = commonAppService;
            _httpContextAccessor = httpContextAccessor;
            _academicAssessmentReportService = academicAssessmentReportService;
        }

        [Authorize]
        [HttpGet("ResultReportSearchSelect")]
        public async Task<ActionResult<CBSE_AcademicAssessmentReportDto>> ResultReportSearchSelect(int AcademicYearId, int GradeId, int DivisionId, long StudentId)
        {
            var result = await _academicAssessmentReportService.ResultReportSearchSelect(AcademicYearId, GradeId, DivisionId, StudentId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("ResultTempleteReportSearchSelect")]
        public async Task<ActionResult<ResultTempleteReportSearchResponseDto>> ResultTempleteReportSearchSelect(long StudentId, int AcademicYearId, int GradeId, int DivisionId,int ExamReportCardNameId)
        {
            var result = await _academicAssessmentReportService.ResultTempleteReportSearchSelect(StudentId, AcademicYearId, GradeId, DivisionId,ExamReportCardNameId);
            return Ok(result);
        }

        [HttpGet]
        [Route("ReportCardTemplateDropdown")]
        public async Task<ActionResult<ReportCardTempleteDropdownResponceDto>> ReportCardTemplateDropdown(int AcademicYearId, int GradeId, int DivisionId)
        {
            return Ok(await _academicAssessmentReportService.ReportCardTemplateDropdown(AcademicYearId, GradeId, DivisionId));
        }

        [Authorize]
        [HttpGet("StudentMonthlyAttendanceSelect")]
        public async Task<ActionResult<StudentMonthlyAttendanceResponceDto>> StudentMonthlyAttendanceSelect(int StudentId, int AcademicYearId)
        {
            var result = await _academicAssessmentReportService.StudentMonthlyAttendanceSelect(StudentId, AcademicYearId);
            return Ok(result);
        }
    }
}