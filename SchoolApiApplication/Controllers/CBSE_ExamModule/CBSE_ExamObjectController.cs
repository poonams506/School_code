using DocumentFormat.OpenXml.Spreadsheet;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.CBSE_ExamModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Services.GalleryModule;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.GradeModule;
using System.Security.Claims;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using NLog.Web.LayoutRenderers;

namespace SchoolApiApplication.Controllers.CBSE_ExamModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class CBSE_ExamObjectController : ControllerBase
    {
        private readonly ICBSE_ExamObjectService _examObjectService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;





        public CBSE_ExamObjectController(IWebHostEnvironment hostingEnvironment, ICommonAppService commonAppService,
               IHttpContextAccessor httpContextAccessor, ICBSE_ExamObjectService ExamObjectService, IStorageService storageService)

        {
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _examObjectService = ExamObjectService;
            _storageService = storageService;
            _commonAppService  = commonAppService;
            _httpContextAccessor = httpContextAccessor;
        }
        [Authorize]
        [HttpPost]
        [Route("CBSE_ExamMasterGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> CBSE_ExamMasterGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var ExamMasterList = await _examObjectService.CBSE_ExamMasterGridSelect(requestObjectWrapper, userId);
            return Ok(ExamMasterList);
           

        }

        [Authorize]
        [HttpGet("CBSE_ExamMasterSelect")]
        public async Task<ActionResult<CBSE_ExamMasterDto>> CBSE_ExamMasterSelect(int ExamMasterId)
        {
            var result = await _examObjectService.CBSE_ExamMasterSelect(ExamMasterId);
            return Ok(result);
        }
        [Authorize]
        [HttpDelete]
        [Route("CBSE_ExamMasterDelete")]
        public async Task<ActionResult<ExamMasterDeleteResponceDto>> CBSE_ExamMasterDelete(long ExamMasterId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _examObjectService.CBSE_ExamMasterDelete(ExamMasterId, userId));
        }

        [Authorize]
        [HttpPost]
        [Route("CBSE_ExamObjectGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> CBSE_ExamObjectGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var ExamObjectList = await _examObjectService.CBSE_ExamObjectGridSelect(requestObjectWrapper, userId);
            return Ok(ExamObjectList);
        }
        [Authorize]
        [HttpPost]
        [Route("CBSE_ExamMasterUpsert")]
        public async Task<ActionResult<int>> CBSE_ExamMasterUpsert(CBSE_ExamMasterDto obj, int AcademicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _examObjectService.CBSE_ExamMasterUpsert(obj, userId, AcademicYearId));
            }
            return Ok(await Task.FromResult(new int()));
        }

        [Authorize]
        [HttpGet("CBSE_ExamObjectSelect")]
        public async Task<ActionResult<CBSE_ExamObjectDto>> CBSE_ExamObjectSelect(long ExamMasterId, int SubjectMasterId, int AcademicYearId)
        {
            var result = await _examObjectService.CBSE_ExamObjectSelect(ExamMasterId, SubjectMasterId, AcademicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishExamObjectParticular")]
        public async Task<ActionResult<int>> PublishUnpublishExamObjectParticular(PublishUnpublishExamObjectDto publishRequest)
        {
            {
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _examObjectService.PublishUnpublishExamObjectParticular(publishRequest, userId));
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("CBSE_ExamObjectDelete")]
        public async Task<ActionResult<ExamObjectDeleteRespose>> CBSE_ExamObjectDelete(long? ExamMasterId, int SubjectMasterId, int AcademicYearId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _examObjectService.CBSE_ExamObjectDelete(ExamMasterId, SubjectMasterId, AcademicYearId, userId));
        }

        [Authorize]
        [HttpPost]
        [Route("CBSE_ExamObjectUpsert")]
        public async Task<ActionResult<ExamObjectExistResponseDto>> CBSE_ExamObjectUpsert(CBSE_ExamObjectDto obj)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var result=await _examObjectService.CBSE_ExamObjectUpsert(obj, userId);
                return Ok(result);
            }
            return Ok(await Task.FromResult(new ExamObjectExistResponseDto()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetExamTypeList")]    
       public async Task<ActionResult<CBSE_ResponseDto>> CBSE_ExamTypeNameSelect()
       {
        var result = await _examObjectService.CBSE_ExamTypeNameSelect();
        return Ok(result);
       }

        [Authorize]
        [HttpGet]
        [Route("GetTermList")]
        public async Task<ActionResult<CBSE_ResponseDto>> CBSE_TermNameSelect()
        {
            var result = await _examObjectService.CBSE_TermNameSelect();
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("CBSE_ClassExamMappingGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> CBSE_ClassExamMappingGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var ClassExamMappingList = await _examObjectService.CBSE_ClassExamMappingGridSelect(requestObjectWrapper, userId);
            return Ok(ClassExamMappingList);
        }


        [Authorize]
        [HttpGet("CBSE_ClassExamMappingSelect")]
        public async Task<ActionResult<CBSE_ClassExamMappingDto>> CBSE_ClassExamMappingSelect(int ClassExamMappingId)
        {
            var result = await _examObjectService.CBSE_ClassExamMappingSelect(ClassExamMappingId);
            return Ok(result);
        }

        [Authorize]
        [HttpDelete]
        [Route("CBSE_ClassExamMappingDelete")]
        public async Task<ActionResult<int>> CBSE_ClassExamMappingDelete(long examMasterId, int academicYearId, int gradeId, int divisionId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _examObjectService.CBSE_ClassExamMappingDelete(examMasterId, academicYearId, gradeId, divisionId));
        }


        [Authorize]
        [HttpPost]
        [Route("CBSE_ClassExamMappingUpsert")]
        public async Task<ActionResult<int>> CBSE_ClassExamMappingUpsert(CBSE_ClassExamMappingDto obj, int academicYearId, int examMasterId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _examObjectService.CBSE_ClassExamMappingUpsert(obj, userId, academicYearId, examMasterId));
            }
            return Ok(await Task.FromResult(new GradeUpdateRespose()));
        }


        [Authorize]
        [HttpGet]
        [Route("GetExamNameList")]
        public async Task<ActionResult<CBSE_ExamNameResponseDto>> CBSE_ExamNameSelect(int AcademicYearId)
        {
            var result = await _examObjectService.CBSE_ExamNameSelect(AcademicYearId);
            return Ok(result);
        }
    


        [Authorize]
        [HttpPost]
        [Route("CBSE_MarksGradeRelationGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> CBSE_MarksGradeRelationGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var MarksGradeList = await _examObjectService.CBSE_MarksGradeRelationGridSelect(requestObjectWrapper, userId);
            return Ok(MarksGradeList);
        }

        [Authorize]
        [HttpGet("CBSE_MarksGradeRelationSelect")]
        public async Task<ActionResult<CBSE_MarksGradeRelationDto>> CBSE_MarksGradeRelationSelect(int MarksGradeRelationId)
        {
            var result = await _examObjectService.CBSE_MarksGradeRelationSelect(MarksGradeRelationId);
            return Ok(result);
        }

        [Authorize]
        [HttpDelete]
        [Route("CBSE_MarksGradeRelationDelete")]
        public async Task<ActionResult<MarksGradeRelationDeleteRespose>> CBSE_MarksGradeRelationDelete(long MarksGradeRelationId)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _examObjectService.CBSE_MarksGradeRelationDelete(MarksGradeRelationId, userId));

        }

        [Authorize]
        [HttpPost]
        [Route("CBSE_MarksGradeRelationUpsert")]
        public async Task<ActionResult<int>> CBSE_MarksGradeRelationUpsert(CBSE_MarksGradeRelationDto obj, int AcademicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _examObjectService.CBSE_MarksGradeRelationUpsert(obj, userId,  AcademicYearId));
            }
            return Ok(await Task.FromResult(new int()));
        }


        [Authorize]
        [HttpDelete]
        [Route("CBSE_ObjectDelete")]
        public async Task<ActionResult<ExamObjectDeleteResponseDto>> CBSE_ObjectDelete(ExamObjectDeleteRequestDto obj)
        {
            int UserId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _examObjectService.CBSE_ObjectDelete(obj, UserId));
        }


    }

}
