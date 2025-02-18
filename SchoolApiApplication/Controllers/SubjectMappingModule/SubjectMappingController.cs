using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMappingModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.SubjectMappingModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectMappingController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ISubjectMappingService _subjectMappingService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SubjectMappingController(IConfiguration config,
          IHttpContextAccessor httpContextAccessor, ISubjectMappingService subjectMappingService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _subjectMappingService = subjectMappingService;
        }
        [HttpPost]
        [Route("GetSubjectMappingList")]
        public async Task<ActionResult<DatatableResponseModel>> GetSubjectMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var subjectDropdownList = await _subjectMappingService.GetSubjectMappingList(requestObjectWrapper);
                return Ok(subjectDropdownList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [HttpPost]
        [Route("SubjectMappingInsert")]
        public async Task<ActionResult<SubjectMappingUpsertDto>> SubjectMappingInsert(SubjectMappingDto subjectMappingObj, int academicYearId, int gradeId, int divisionId)
        {
            var response = new SubjectMappingUpsertDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                response.SubjectExistResposeList = await _subjectMappingService.SubjectMappingInsert(subjectMappingObj, userId, academicYearId, gradeId, divisionId);
                return Ok(response);
            }
            return Ok(await Task.FromResult(new SubjectMappingUpsertDto()));
        }

        [HttpPost]
        [Route("SubjectMappingDelete")]
        public async Task<ActionResult<SubjectMappingUpsertDto>> SubjectMappingDelete(int academicYearId, int gradeId, int divisionId, int subjectId)
        {
            var response = new SubjectMappingUpsertDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                response.SubjectExistResposeList = await _subjectMappingService.SubjectMappingDelete(userId, academicYearId, gradeId, divisionId, subjectId);
                return Ok(response);
            }
            return Ok(await Task.FromResult(new SubjectMappingUpsertDto()));
        }

        [HttpGet]
        [Route("GetSubjectMasterDropDown")]
        public async Task<ActionResult<SubjectMappingDto>> GetSubjectMasterDropDown()
        {
            return Ok(await _subjectMappingService.GetSubjectMasterDropDown());
        }

        [Authorize]
        [HttpGet]
        [Route("SubjectIndexNumberDetailsSelect")]
        public async Task<ActionResult<SubjectIndexNumberDetailsDto>> SubjectIndexNumberDetailsSelect(int GradeId, int DivisionId, int AcademicYearId)
        {
            var result = await _subjectMappingService.SubjectIndexNumberDetailsSelect( GradeId, DivisionId, AcademicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("UpsertSubjectIndexNumberDetails")]
        public async Task<ActionResult<string>> UpsertSubjectIndexNumberDetails(UpsertSubjectIndexNumberDetailsDto obj)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _subjectMappingService.UpsertSubjectIndexNumberDetails(obj, userId));
            }
            return Ok(await Task.FromResult(new int()));
        }


        [Authorize]
        [HttpPost]
        [Route("SubjectMappingCloneDetails")]
        public async Task<ActionResult<int>> SubjectMappingCloneDetails(SubjectMappingCloneDto cloneRequest)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _subjectMappingService.SubjectMappingCloneDetails(cloneRequest, userId));

        }

        [Authorize]
        [HttpGet]
        [Route("GetGradeDivisionSubjectMappingMasterList")]
        public async Task<ActionResult<GradeDivisionWithDisabledCommonMasterDto>> GetGradeDivisionSubjectMappingMasterList(int AcademicYearId)
        {
            return Ok(await _subjectMappingService.GetGradeDivisionSubjectMappingMasterList(AcademicYearId));
        }


    }
}