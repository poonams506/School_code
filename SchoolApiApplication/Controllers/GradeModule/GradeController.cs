using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.GradeModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolModule;
using SchoolApiApplication.DTO.ParentModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;
using SchoolApiApplication.DTO.GradeModule;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace SchoolApiApplication.Controllers.GradeModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IGradeService _gradeService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private IWebHostEnvironment _hostingEnvironment;


        public GradeController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IGradeService gradeService,
            IEmailSender emailSender)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _gradeService = gradeService;
            _emailSender = emailSender;
        }

        [Authorize]
        [HttpGet("GetGradeData")]
        public async Task<ActionResult<GradeDto>> GetGradeData(int? gradeId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                return Ok(await _gradeService.GetGradeData(gradeId));
            }
            return Ok(await Task.FromResult(new GradeDto()));

        }
        [Authorize]
        [HttpPost]
        [Route("GradeDataUpsert")]
        public async Task<ActionResult<GradeUpdateRespose>> GradeDataUpsert(GradeDto GradeObj)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _gradeService.GradeDataUpsert(GradeObj, userId));
            }
            return Ok(await Task.FromResult(new GradeUpdateRespose()));
        }

        [HttpPost]
        [Route("GetGradeList")]
        public async Task<ActionResult<DatatableResponseModel>> GetGradeList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var gradeList = await _gradeService.GetGradeList(requestObjectWrapper);
                return Ok(gradeList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [HttpDelete]
        [Route("GradeDataDelete")]
        public async Task<ActionResult<GradeDeleteRespose>> GradeDataDelete(int gradeId, int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok( await _gradeService.GradeDataDelete(gradeId, academicYearId, userId));            
            }
            return Ok(await Task.FromResult(new GradeDeleteRespose()));
        }
    }
}
