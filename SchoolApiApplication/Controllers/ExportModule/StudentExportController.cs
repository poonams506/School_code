using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ImportModule;
using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.Controllers.ExportModule
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentExportController : Controller
    {
      
            private readonly IConfiguration _config;
            private readonly IStudentExportService _studentExportService;
            private readonly IHttpContextAccessor _httpContextAccessor;
            private IWebHostEnvironment _hostingEnvironment;

            public StudentExportController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
                IHttpContextAccessor httpContextAccessor, IStudentExportService studentExportService)
            {
                _config = config;
                _httpContextAccessor = httpContextAccessor;
                _studentExportService = studentExportService;
                _hostingEnvironment = hostingEnvironment;
            }

        [Authorize]
        [HttpPost]
        [Route("ExportStudentData")]
        public async Task<ActionResult<ResponseExportStudentDataDto>> ExportStudentData(int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentList = await _studentExportService.ExportStudentData(academicYearId);
                return Ok(studentList);
            }
            return Ok(await Task.FromResult(new StudentExportDataDto()));
        }

    }
    }
