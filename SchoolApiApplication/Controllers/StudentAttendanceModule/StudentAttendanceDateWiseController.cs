using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule;

namespace SchoolApiApplication.Controllers.StudentAttendanceModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAttendanceDateWiseController : ControllerBase
    {
        private readonly IStudentAttendanceDateWiseReportService _studentAttendanceDateWiseReportService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public StudentAttendanceDateWiseController(IHttpContextAccessor httpContextAccessor, IStudentAttendanceDateWiseReportService studentAttendanceDateWiseReportService)
        {

            _httpContextAccessor = httpContextAccessor;
            _studentAttendanceDateWiseReportService = studentAttendanceDateWiseReportService;
        }
        [Authorize]
        [HttpPost]
        [Route("StudentAttendanceReportDateWise")]
        public async Task<ActionResult<DatatableResponseModel>> StudentAttendanceReportDateWise(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
               
            {
                if (requestObjectWrapper.ngbtakenOn != null && requestObjectWrapper.ngbtakenOn.day > 0)
                {
                    requestObjectWrapper.takenOn = new DateTime(requestObjectWrapper.ngbtakenOn.year,
                                       requestObjectWrapper.ngbtakenOn.month,
                                       requestObjectWrapper.ngbtakenOn.day);
                }
                var result = await _studentAttendanceDateWiseReportService.StudentAttendanceReportDateWise(requestObjectWrapper);
                return Ok(result);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
    }
}
