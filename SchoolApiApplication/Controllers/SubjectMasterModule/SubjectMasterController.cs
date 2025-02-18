using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMasterModule;
using SchoolApiApplication.DTO.SubjectMasterModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.SubjectMasterModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectMasterController : ControllerBase
    {
       
        private readonly ISubjectMasterService _subjectMasterService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SubjectMasterController(
          IHttpContextAccessor httpContextAccessor, ISubjectMasterService subjectMasterService
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _subjectMasterService = subjectMasterService;
        }

        [Authorize]
        [HttpPost]
        [Route("SubjectMasterUpsert")]
        public async Task<ActionResult<int>> SubjectMasterUpsert(SubjectMasterDto SubjectMasterObj)
        {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _subjectMasterService.SubjectMasterUpsert(SubjectMasterObj, userId));
        }

        [HttpPost]
        [Route("GetSubjectMasterList")]
        public async Task<ActionResult<DatatableResponseModel>> GetSubjectMasterList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var subjectMasterList = await _subjectMasterService.GetSubjectMasterList(requestObjectWrapper);
                return Ok(subjectMasterList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpGet("GetSubjectMaster")]
        public async Task<ActionResult<SubjectMasterDto>> GetSubjectMaster(int SubjectMasterId)
        {
                return Ok(await _subjectMasterService.GetSubjectMaster(SubjectMasterId));

        }
        [HttpDelete]
        [Route("SubjectMasterDelete")]
        public async Task<ActionResult<SubjectMasterDeleteResponceDto>> SubjectMasterDelete(int subjectMasterId)
        {
            int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _subjectMasterService.SubjectMasterDelete(subjectMasterId, userId));
        }

        [Authorize]
        [HttpPost("GetAllSubjectsByClassList")]
        public async Task<ActionResult<TimetableSubjectDropdownResponseDto>> GetAllSubjectsByClassList(TimetableSubjectDropdownRequestDto requestDto)
        {
            return Ok(await _subjectMasterService.GetAllSubjectsByClassList(requestDto));
        }

    }
}
