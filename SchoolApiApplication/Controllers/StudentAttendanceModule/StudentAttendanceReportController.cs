using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Controllers.StudentAttendanceModule
{   //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAttendanceReportController : ControllerBase
    {
        private readonly IStudentAttendanceReportService _studentAttendanceReportService;
        private readonly IHttpContextAccessor _httpContextAccessor;
   

        public StudentAttendanceReportController(IHttpContextAccessor httpContextAccessor, IStudentAttendanceReportService studentAttendanceReportService)
        {

            _httpContextAccessor = httpContextAccessor;
            _studentAttendanceReportService= studentAttendanceReportService;
        }

        [HttpPost]
        [Route("GetStudentAttendanceReportGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetStudentAttendanceReportGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                if (requestObjectWrapper.ngbfromDate != null && requestObjectWrapper.ngbfromDate.day > 0)
                {
                    requestObjectWrapper.fromDate = new DateTime(requestObjectWrapper.ngbfromDate.year,
                                       requestObjectWrapper.ngbfromDate.month,
                                       requestObjectWrapper.ngbfromDate.day);
                }
                if (requestObjectWrapper.ngbtillDate != null && requestObjectWrapper.ngbtillDate.day > 0)
                {
                    requestObjectWrapper.tillDate = new DateTime(requestObjectWrapper.ngbtillDate.year,
                                       requestObjectWrapper.ngbtillDate.month,
                                       requestObjectWrapper.ngbtillDate.day);
                }
                var studentAttendancereport = await _studentAttendanceReportService.GetStudentAttendanceReportGridList(requestObjectWrapper);
                return Ok(studentAttendancereport);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
    }
}
