using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.CabDriverModule;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamReportCard;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamReportCard;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.CBSE_ExamReportCard
{
    [Route("api/[controller]")]
    [ApiController]
    public class CBSE_ExamReportCardController : Controller
    {
            private readonly IConfiguration _config;
            private readonly ICBSE_ExamReportCardService _examReportCardService;
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly IEmailSender _emailSender;
            private readonly IStorageService _storageService;
            private IWebHostEnvironment _hostingEnvironment;
            public string? UPLOAD_PATH;

            public CBSE_ExamReportCardController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
                IHttpContextAccessor httpContextAccessor, ICBSE_ExamReportCardService examReportCardService,
                IEmailSender emailSender, IStorageService storageService)
            {
                _config = config;
                _httpContextAccessor = httpContextAccessor;
                _hostingEnvironment = hostingEnvironment;
                _examReportCardService = examReportCardService;
                _emailSender = emailSender;
                _storageService = storageService;
            }
        [Authorize]
        [HttpPost]
        [Route("GetExamMasterListForReport")]
        public async Task<ActionResult<CBSE_ExamNameResponseDto>> GetExamMasterListForReport([FromBody]ExamNameRequestDto examNameRequestDto)
        {
            var result = await _examReportCardService.GetExamMasterListForReport(examNameRequestDto);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("GetExamReportCardGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> GetExamReportCardGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var ExamReportList = await _examReportCardService.GetExamReportCardGridSelect(requestObjectWrapper, userId);
            return Ok(ExamReportList);
        }

        [Authorize]
        [HttpGet("GetExamReportCardSelect")]
        public async Task<ActionResult<CBSE_ExamReportCardNameDto>> GetExamReportCardSelect(long examReportCardNameId,int academicYearId)
        {
            var result = await _examReportCardService.GetExamReportCardSelect(examReportCardNameId, academicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpDelete]
        [Route("ExamReportCardDelete")]
        public async Task<ActionResult<int>> ExamReportCardDelete(long examReportCardNameId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _examReportCardService.ExamReportCardDelete(examReportCardNameId, userId));
        }

        [Authorize]
        [HttpPost]
        [Route("ExamReportCardUpsert")]
        public async Task<ActionResult<int>> ExamReportCardUpsert(ExamReportCardUpsertDto obj,int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var result=await _examReportCardService.ExamReportCardUpsert(obj, userId, academicYearId);
                return Ok(result);
            }
            return Ok(await Task.FromResult(new int()));
        }

    }
}
