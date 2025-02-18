using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolVacationModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeachingLoadAnalysisModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolVacationModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.SchoolVacationModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;

namespace SchoolApiApplication.Controllers.TeachingLoadAnalysisModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachingLoadAnalysisController : ControllerBase
    {
        private readonly ITeachingLoadAnalysisService _teachingLoadAnalysisService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public TeachingLoadAnalysisController(IWebHostEnvironment hostingEnvironment, ITeachingLoadAnalysisService teachingLoadAnalysisService)
        {
            _hostingEnvironment = hostingEnvironment;
            _teachingLoadAnalysisService = teachingLoadAnalysisService;
        }


        [Authorize]
        [HttpGet("TeacherPercentageSelect")]
        public async Task<ActionResult<TeachingLoadAnalysisResponseDto>> TeacherPercentageSelect(int AcademicYearId)
        {
            var result = await _teachingLoadAnalysisService.TeacherPercentageSelect(AcademicYearId);

            return Ok(result);
        }
    }
}
