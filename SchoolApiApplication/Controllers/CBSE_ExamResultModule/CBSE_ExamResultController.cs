using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamResult;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.CBSE_ExamResultModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class CBSE_ExamResultController : ControllerBase
    {
        private readonly ICBSE_ExamResultService _examResultService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;

        public CBSE_ExamResultController(IWebHostEnvironment hostingEnvironment, ICommonAppService commonAppService,
               IHttpContextAccessor httpContextAccessor, ICBSE_ExamResultService examResultService, IStorageService storageService)

        {
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _examResultService = examResultService;
            _storageService = storageService;
            _commonAppService = commonAppService;
            _httpContextAccessor = httpContextAccessor;
        }
        [Authorize]
        [HttpPost]
        [Route("GetExamResultGridList")]
        public async Task<ActionResult<CBSE_ExamResultDto>> GetExamResultGridList(CBSE_ExamResultRequestDto requestDto)
        {
            CBSE_ExamResultDto examResultDto = new CBSE_ExamResultDto();
            if (_httpContextAccessor.HttpContext != null)
            {


                examResultDto = await _examResultService.GetExamResultGridList(requestDto);
                return Ok(examResultDto);
            }
            return Ok(await Task.FromResult(new CBSE_ExamResultDto()));
        }
        [Authorize]
        [HttpPost]
        [Route("ExamResultUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> ExamResultUpsert(CBSE_ExamResultDto examResultDto)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
               

                var result = await _examResultService.ExamResultUpsert(examResultDto, userId);
                return Ok(result);

            }
            return Ok(await Task.FromResult(new long()));
        }
     
        [Authorize]
        [HttpGet]
        [Route("GetExamNameList")]
        public async Task<ActionResult<ExamResultResponseDto>> ExamNameList(int AcademicYearId, int GradeId, int DivisionId)
        {
            var result = await _examResultService.ExamNameList(AcademicYearId, GradeId, DivisionId);
            return Ok(result);
        }
        [Authorize]
        [HttpGet]
        [Route("GetSubjectNameList")]
        public async Task<ActionResult<ExamResultResponseDto>> SubjectNameList(int AcademicYearId, int ExamMasterId)
        {
            var result = await _examResultService.SubjectNameList(AcademicYearId, ExamMasterId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("GetMarkGradeList")]
        public async Task<ActionResult<ExamResultResponseDto>> MarkGradeList(int AcademicYearId)
        {
            var result = await _examResultService.MarkGradeList(AcademicYearId);
            return Ok(result);
        }


        [Authorize]
        [HttpPost]
        [Route("uspCBSE_ExamResultGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> GetCBSE_ExamResultGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            var examResultList = await _examResultService.GetCBSE_ExamResultGridSelect(requestObjectWrapper);
            return Ok(examResultList);
        }
    }
}
