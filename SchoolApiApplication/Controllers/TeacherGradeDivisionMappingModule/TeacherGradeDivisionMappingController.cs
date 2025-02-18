using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.GradeDivisionMatrixModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.BusinessLayer.Services.GradeDivisionMatrixModule;
using SchoolApiApplication.BusinessLayer.Services.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.TeacherGradeDivisionMappingModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherGradeDivisionMappingController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ITeacherGradeDivisionMappingService _teacherGradeDivisionMappingService;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public TeacherGradeDivisionMappingController(IConfiguration config,
            IHttpContextAccessor httpContextAccessor, ITeacherGradeDivisionMappingService teacherGradeDivisionMappingService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _teacherGradeDivisionMappingService = teacherGradeDivisionMappingService;
        }
        [HttpPost]
        [Route("GetTeacherGradeDivisionMappingList")]
        public async Task<ActionResult<DatatableResponseModel>> GetTeacherGradeDivisionMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var teacherList = await _teacherGradeDivisionMappingService.GetTeacherGradeDivisionMappingList(requestObjectWrapper);
                return Ok(teacherList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [HttpPost]
        [Route("TeacherGradeDivisionMappingInsert")]
        public async Task<ActionResult<int>> TeacherGradeDivisionMappingInsert(TeacherGradeDivisionMappingDto teacherGradeDivisionMappingobj)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _teacherGradeDivisionMappingService.TeacherGradeDivisionMappingInsert(teacherGradeDivisionMappingobj, userId));
            }
            return Ok(await Task.FromResult(new int()));
        }


        [HttpPost]
        [Route("TeacherMappingDelete")]
        public async Task<ActionResult<int>> TeacherMappingDelete(int academicYearId, int gradeId, int divisionId, int teacherId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _teacherGradeDivisionMappingService.TeacherMappingDelete(userId, academicYearId, gradeId, divisionId, teacherId));
            }
            return Ok(await Task.FromResult(new TeacherGradeDivisionMappingDto()));
        }

    }
}
