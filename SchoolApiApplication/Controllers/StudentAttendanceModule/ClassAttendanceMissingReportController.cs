using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Controllers.StudentAttendanceModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClassAttendanceMissingReportController : ControllerBase
    {
        private readonly IClassAttendanceMissingReportService _classAttendanceMissingReportService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClassAttendanceMissingReportController(IHttpContextAccessor httpContextAccessor, IClassAttendanceMissingReportService classAttendanceMissingReportService)
        {

            _httpContextAccessor = httpContextAccessor;
            _classAttendanceMissingReportService = classAttendanceMissingReportService;
        }
        [Authorize]
        [HttpGet]
        [Route("ClassMissingAttendanceReport")]
        public async Task<ActionResult<ClassAttendanceMissingReportResponseDto>> ClassAttendanceMissingReport(int AcademicYearId, int RefId, int RoleId)
        {
           
             var result = await _classAttendanceMissingReportService.ClassAttendanceMissingReport(AcademicYearId, RefId, RoleId);
            foreach (var classAttendance in result.ClassAttendanceMissingList)
            {
                if (classAttendance.AttendanceMissingDate.HasValue && classAttendance.AttendanceMissingDate.Value.Day > 0)
                {
                    classAttendance.ngbAttendanceMissingDate = new SchoolNgbDateModel
                    {
                        year = classAttendance.AttendanceMissingDate.Value.Year,
                        month = classAttendance.AttendanceMissingDate.Value.Month,
                        day = classAttendance.AttendanceMissingDate.Value.Day
                    };
                }
            }



            return Ok(result);
           
        }
    }
}
