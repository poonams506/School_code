using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassTeacherAttendanceModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolHolidayModule;
using SchoolApiApplication.DTO.ClassTeacherDataModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.Controllers.ClassTeacherAttendanceModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassTeacherDataController : ControllerBase
    {
        private readonly IClassTeacherDataService _ClassTeacherDataService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public ClassTeacherDataController(IWebHostEnvironment hostingEnvironment, IClassTeacherDataService classTeacherDataService, IHttpContextAccessor httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
            _ClassTeacherDataService = classTeacherDataService;
            _httpContextAccessor = httpContextAccessor;
        }


        [Authorize]
        [HttpGet("GetClassTeacherData")]
        public async Task<ActionResult<ClassTeacherDataDto>> GetClassTeacherData(int AcademicYearId, int UserId)
        {
            var result = await _ClassTeacherDataService.GetClassTeacherData(AcademicYearId, UserId);

            return Ok(result);
        }

    }
}
