using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.BulkAttendanceUpdateModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.DTO.BulkAttendanceUpdateModule;
using SchoolApiApplication.DTO.CBSE_ExamReportCard;
using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.MasterModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.BulkAttendanceUpdateModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class BulkAttendanceUpdateController : ControllerBase
    {
        private readonly IBulkAttendanceUpdateService _bulkAttendanceUpdateService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;
        public BulkAttendanceUpdateController(IWebHostEnvironment hostingEnvironment, ICommonAppService commonAppService,
               IHttpContextAccessor httpContextAccessor, IBulkAttendanceUpdateService BulkAttendanceUpdateService, IStorageService storageService)

        {
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _bulkAttendanceUpdateService = BulkAttendanceUpdateService;
            _storageService = storageService;
            _commonAppService = commonAppService;
            _httpContextAccessor = httpContextAccessor;
        }
        [Authorize]
        [HttpPost]
        [Route("ClassAttendanceStatusGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> ClassAttendanceStatusGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var BulkAttendanceUpdateList = await _bulkAttendanceUpdateService.ClassAttendanceStatusGridSelect(requestObjectWrapper);
            return Ok(BulkAttendanceUpdateList);
        }

        [Authorize]
        [HttpPost]
        [Route("GetStudentAttendanceByMonthSelect")]
        public async Task<ActionResult<BulkSelectResponseDto>> GetStudentAttendanceByMonthSelect(StudentAttendanceUpdateRequestDto request)
        {

            var result = await _bulkAttendanceUpdateService.GetStudentAttendanceByMonthSelect(request);
            return Ok(result);
        }


        [Authorize]
        [HttpPost]
        [Route("StudentAttendanceByMonthUpsert")]
        public async Task<ActionResult<int>> StudentAttendanceByMonthUpsert(BulkAttendanceUpdateDto attendanceUpdate)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _bulkAttendanceUpdateService.StudentAttendanceByMonthUpsert(attendanceUpdate, userId);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("GetAttendanceSummaryByMonth")]
        public async Task<ActionResult<AttendanceSummaryBulkResponseDto>> GetAttendanceSummaryByMonth(StudentAttendanceUpdateRequestDto request)
        {
            var result = await _bulkAttendanceUpdateService.GetAttendanceSummaryByMonthAsync(request);
            return Ok(result);
        }


        [Authorize]
        [HttpPost]
        [Route("StatusInsert")]
        public async Task<ActionResult<int>> StatusInsert(StudentAttendanceStatusInsertDto request)
        {
            int UserId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var response = await _bulkAttendanceUpdateService.StatusInsert(request, UserId);
            return Ok(response);
        }

    }
}

