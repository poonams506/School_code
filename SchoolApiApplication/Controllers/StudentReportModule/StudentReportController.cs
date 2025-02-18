using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentReportModule;
using SchoolApiApplication.DTO.Certificate_Module;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.StudentReportModule;

namespace SchoolApiApplication.Controllers.StudentReportModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentReportController : ControllerBase
    {

        private readonly IStudentReportService _studentReportService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentReportController(IHttpContextAccessor httpContextAccessor,IWebHostEnvironment hostingEnvironment, IStudentReportService studentReportService)
        {
            _hostingEnvironment = hostingEnvironment;
            _studentReportService = studentReportService;
            _httpContextAccessor = httpContextAccessor;
        }


        [Authorize]
        [HttpPost("GetCasteWiseStudentCountSelect")]
        public async Task<ActionResult<CasteWiseStudentCountResponseDto>> GetCasteWiseStudentCountSelect([FromBody] RequestReportDto obj)
        {
            var result = await _studentReportService.GetCasteWiseStudentCountSelect(obj);
            return Ok(result);
        }


       

        [Authorize]
        [HttpPost("GetcategoryStudentCountSelect")]
        public async Task<ActionResult<CategoryWiseStudentCountReportResponseDTO>> GetcategoryStudentCountSelect([FromBody] RequestReportDto obj)
        {
            var result = await _studentReportService.GetcategoryStudentCountSelect(obj);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("GetReligionStudentCountSelect")]
        public async Task<ActionResult<ReligionWiseStudentCountReporResponsetDTO>> GetReligionStudentCountSelect([FromBody] RequestReportDto obj)
        {
            var result = await _studentReportService.GetReligionStudentCountSelect(obj);
            return Ok(result);
        }


        [Authorize]
        [HttpPost("GetRTEStudentCountSelect")]
        public async Task<ActionResult<RTEStudentCountReportResponseDto>> GetRTEStudentCountSelect([FromBody] RequestReportDto obj)
        {
            var result = await _studentReportService.GetRTEStudentCountSelect(obj);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("GetTotalStudentCountSelect")]
        public async Task<ActionResult<StudentGenderCountReportResponseDto>> GetTotalStudentCountSelect([FromBody] RequestReportDto obj)
        {
            var result = await _studentReportService.GetTotalStudentCountSelect(obj);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("GetStudentGenderListSelect")]
        public async Task<ActionResult<StudentGenderListResponseDto>> GetStudentGenderListSelect([FromBody] RequestReportDto obj)
        {
            var result = await _studentReportService.GetStudentGenderListSelect(obj);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("GetRTEStudentListSelect")]
        public async Task<ActionResult<StudentRTEGenderListResponseDto>> GetRTEStudentListSelect([FromBody] RequestReportDto obj)
        {
            var result = await _studentReportService.GetRTEStudentListSelect(obj);
            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentAllFeeReceiptSelect")]
        public async Task<ActionResult<StudentAllFeeReceiptSelectDto>> GetStudentAllFeeReceiptSelectDto(Int32 academicYearId, long studentId, Int32 classId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var allReceiptSelect = await _studentReportService.GetStudentAllFeeReceiptSelectDto(academicYearId, studentId, classId);
                return Ok(allReceiptSelect);
            }
            return Ok(await Task.FromResult(new StudentAllFeeReceiptSelectDto()));
        }

        [Authorize]
        [HttpGet("GetStudentNames")]

        public async Task<ActionResult<StudentNameList>> GetStudentNames(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentList = await _studentReportService.GetStudentNames(AcademicYearId, GradeId, DivisionId, false);
                return Ok(studentList);
            }
            return Ok(await Task.FromResult(new StudentNameList()));
        }

        [Authorize]
        [HttpGet("GetStudentNamesWithArchive")]

        public async Task<ActionResult<StudentNameList>> GetStudentNamesWithArchive(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentList = await _studentReportService.GetStudentNames(AcademicYearId, GradeId, DivisionId, true);
                return Ok(studentList);
            }
            return Ok(await Task.FromResult(new StudentNameList()));
        }

    }
}
