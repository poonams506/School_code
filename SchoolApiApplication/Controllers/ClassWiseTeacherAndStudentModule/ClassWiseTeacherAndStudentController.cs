using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassWiseTeacherAndStudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule;
using SchoolApiApplication.DTO.ClassWiseTeacherAndStudentDto;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Controllers.ClassWiseTeacherAndStudentModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassWiseTeacherAndStudentController : ControllerBase
    {
        private readonly IClassWiseTeacherAndStudentService _classWiseTeacherAndStudentService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClassWiseTeacherAndStudentController(IHttpContextAccessor httpContextAccessor, IClassWiseTeacherAndStudentService classWiseTeacherAndStudentService)
        {

            _httpContextAccessor = httpContextAccessor;
            _classWiseTeacherAndStudentService = classWiseTeacherAndStudentService;
        }
        [Authorize]
        [HttpGet]
        [Route("ClassTeacherSelect")]
    
        public async Task<ActionResult<ClassTeacherResponseDto>> ClassTeacherSelect(int AcademicYearId)
        {

            var result = await _classWiseTeacherAndStudentService.ClassTeacherSelect(AcademicYearId);
            return Ok(result);

        }

        [Authorize]
        [HttpGet]
        [Route("ClassWiseStudentSelect")]
        public async Task<ActionResult<ClassWiseStudentResponseDto>> ClassWiseStudentSelect(int AcademicYearId, int ClassTeacherId)
        {

            var result = await _classWiseTeacherAndStudentService.ClassWiseStudentSelect(AcademicYearId, ClassTeacherId);


            return Ok(result);

        }
    }
}
