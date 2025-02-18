using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.Controllers.ExportModule
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeacherExportController : Controller
    {
        private readonly IConfiguration _config;
        private readonly ITeacherExportService _teacherExportService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private IWebHostEnvironment _hostingEnvironment;

        public TeacherExportController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, ITeacherExportService teacherExportService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _teacherExportService = teacherExportService;
            _hostingEnvironment = hostingEnvironment;
        }

        [Authorize]
        [HttpPost]
        [Route("ExportTeacherData")]
        public async Task<ActionResult<ResponseExportTeacherDataDto>> ExportTeacherData()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var teacherList = await _teacherExportService.ExportTeacherData();
                return Ok(teacherList);
            }
            return Ok(await Task.FromResult(new TeacherExportDataDto()));
        }
    }
}
