using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolHolidayModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.TeacherCountPerSubjectAnalyzerModule;

namespace SchoolApiApplication.Controllers.TeacherCountPerSubjectAnalyzerModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherCountPerSubjectAnalyzerController : ControllerBase
    {
        private readonly ITeacherCountPerSubjectAnalyzerService _teacherCountPerSubjectAnalyzerService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TeacherCountPerSubjectAnalyzerController(IWebHostEnvironment hostingEnvironment, ITeacherCountPerSubjectAnalyzerService teacherCountPerSubjectAnalyzerService, IHttpContextAccessor httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
            _teacherCountPerSubjectAnalyzerService = teacherCountPerSubjectAnalyzerService;
            _httpContextAccessor = httpContextAccessor;
        }

        [Authorize]
        [HttpGet("TeacherCountPerSubjectSelect")]
        public async Task<ActionResult<TeacherCountPerSubjectAnalyzerResponseDto>> TeacherCountPerSubjectSelect(int AcademicYearId)

        {
            var result = await _teacherCountPerSubjectAnalyzerService.TeacherCountPerSubjectSelect(AcademicYearId);

            return Ok(result);
        }

    }
}
