using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.DivisionModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.Controllers.DivisionModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class DivisionController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IDivisionService _divisionService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private IWebHostEnvironment _hostingEnvironment;
       

        public DivisionController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IDivisionService divisionService,
            IEmailSender emailSender)
        {
            _config = config;   
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _divisionService = divisionService;
            _emailSender = emailSender;
        }

        [Authorize]
        [HttpGet("GetDivisionData")]
        public async Task<ActionResult<DivisionDto>> GetDivisionData(int? divisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                return Ok(await _divisionService.GetDivisionData(divisionId));
            }
            return Ok(await Task.FromResult(new DivisionDto()));

        }
        [Authorize]
        [HttpPost]
        [Route("DivisionDataUpsert")]
        public async Task<ActionResult<DivisionUpdateleteRespose>> DivisionDataUpsert(DivisionDto DivisionObj)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _divisionService.DivisionDataUpsert(DivisionObj, userId));
            }
            return Ok(await Task.FromResult(new DivisionUpdateleteRespose()));
        }

        [HttpPost]
        [Route("GetDivisionList")]
        public async Task<ActionResult<DatatableResponseModel>> GetDivisionList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var divisionList = await _divisionService.GetDivisionList(requestObjectWrapper);
                return Ok(divisionList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [HttpDelete]
        [Route("DivisionDataDelete")]
        public async Task<ActionResult<DivisionDeleteRespose>> DivisionDataDelete(int gradeId, int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _divisionService.DivisionDataDelete(gradeId, academicYearId, userId));
            }
            return Ok(await Task.FromResult(new DivisionDeleteRespose()));
        }
    }
}
