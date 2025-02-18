using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolMonthEventModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherOneDayLectureModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolMonthEventModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;

namespace SchoolApiApplication.Controllers.TeacherOneDayLectureModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherOneDayLectureController : ControllerBase
    {
        private readonly ITeacherOneDayLectureService _teacherOneDayLectureService;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public TeacherOneDayLectureController(IWebHostEnvironment hostingEnvironment, ITeacherOneDayLectureService teacherOneDayLectureService)
        {
            _hostingEnvironment = hostingEnvironment;
            _teacherOneDayLectureService = teacherOneDayLectureService;
        }

        [HttpGet]
        [Route ("TeacherOneDayLectureSelect")]

        public async Task<ActionResult<TeacherOneDayLectureResponseDto>> TeacherOneDayLectureSelect (int AcademicYearId, int TeacherId, int DayNo)
        {
            var result = await _teacherOneDayLectureService.TeacherOneDayLectureSelect(AcademicYearId, TeacherId, DayNo);

            return Ok(result);
        }
    }
}
