using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMappingModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherSubjectMappingModule;
using SchoolApiApplication.BusinessLayer.Services.SubjectMappingModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TeacherSubjectMapping;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.TeacherSubjectMappingModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherSubjectMappingController : ControllerBase
    {

        private readonly IConfiguration _config;
        private readonly ITeacherSubjectMappingService _teacherSubjectMappingService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherSubjectMappingController(IConfiguration config,
          IHttpContextAccessor httpContextAccessor, ITeacherSubjectMappingService teacherSubjectMappingService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _teacherSubjectMappingService = teacherSubjectMappingService;
        }
        [HttpPost]
        [Route("GetTeacherSubjectMappingList")]
        public async Task<ActionResult<DatatableResponseModel>> GetTeacherSubjectMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var teacherSubjectList = await _teacherSubjectMappingService.GetTeacherSubjectMappingList(requestObjectWrapper);
                return Ok(teacherSubjectList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [HttpPost]
        [Route("TeacherSubjectMappingInsert")]
        public async Task<ActionResult<TeacherSubjectMappingUpsertDto>> TeacherSubjectMappingInsert(TeacherSubjectMappingDto teacherSubjectMappingObj, int academicYearId, int teacherId)
        {
            var response = new TeacherSubjectMappingUpsertDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                response.TeacherSubjectExistResposeList = await _teacherSubjectMappingService.TeacherSubjectMappingInsert(teacherSubjectMappingObj, userId, academicYearId, teacherId);
                return Ok(response);
            }
            return Ok(await Task.FromResult(new TeacherSubjectMappingUpsertDto()));
        }

        [HttpPost]
        [Route("TeacherSubjectMappingDelete")]
        public async Task<ActionResult<TeacherSubjectMappingUpsertDto>> TeacherSubjectMappingDelete(int academicYearId, int teacherId, int subjectId)
        {
            var response = new TeacherSubjectMappingUpsertDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                response.TeacherSubjectExistResposeList = await _teacherSubjectMappingService.TeacherSubjectMappingDelete(userId, academicYearId, teacherId, subjectId);
                return Ok(response);
            }
            return Ok(await Task.FromResult(new TeacherSubjectMappingUpsertDto()));
        }
    }
}
