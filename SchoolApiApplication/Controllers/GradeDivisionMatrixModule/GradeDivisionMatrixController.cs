using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.DivisionModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.BusinessLayer.Interfaces.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.BusinessLayer.Services.DivisionModule;

namespace SchoolApiApplication.Controllers.GradeDivisionMatrixModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeDivisionMatrixController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IGradeDivisionMatrixService _gradeDivisionMatrixService;
        private readonly IHttpContextAccessor _httpContextAccessor;
       

        public GradeDivisionMatrixController(IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IGradeDivisionMatrixService gradeDivisionMatrixService)
        {
            _config = config;   
            _httpContextAccessor = httpContextAccessor;
            _gradeDivisionMatrixService = gradeDivisionMatrixService;
        }

        [Authorize]
        [HttpGet("GetGradeDivisionMatrixData")]
        public async Task<ActionResult<GradeDivisionMatrixDto>> GetDivisionData(int? GradeId, int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                return Ok(await _gradeDivisionMatrixService.GetGradeDivisionMatrixData(GradeId, academicYearId));
            }
            return Ok(await Task.FromResult(new GradeDivisionMatrixDto()));

        }
        [Authorize]
        [HttpPost]
        [Route("GradeDivisionMatrixDataUpsert")]
        public async Task<ActionResult<int>> GradeDivisionMatrixDataUpsert(GradeDivisionMatrixDto GradeDivisionObj, int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _gradeDivisionMatrixService.GradeDivisionMatrixDataUpsert(GradeDivisionObj, userId, academicYearId));
            }
            return Ok(await Task.FromResult(new int()));
        }

        [HttpPost]
        [Route("GetGradeDivisionMatrixList")]
        public async Task<ActionResult<DatatableResponseModel>> GetDivisionList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var gradeDivisionList = await _gradeDivisionMatrixService.GetGradeDivisionMatrixList(requestObjectWrapper);
                return Ok(gradeDivisionList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [HttpDelete]
        [Route("GradeDivisionMatrixDelete")]
        public async Task<ActionResult<GradeDivisionMatrixDeleteRespose>> GradeDivisionMatrixDelete(int? gradeId, string divisionName, int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _gradeDivisionMatrixService.GradeDivisionMatrixDelete(gradeId, divisionName, academicYearId, userId));
            }
            return Ok(await Task.FromResult(new GradeDivisionMatrixDeleteRespose()));
        }
    }
}
