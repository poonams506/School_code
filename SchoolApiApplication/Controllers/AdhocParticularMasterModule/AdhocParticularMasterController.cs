using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.AdhocParticularMasterModule;
using SchoolApiApplication.DTO.AdhocParticularMasterModule;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.AdhocParticularMasterModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdhocParticularMasterController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IAdhocParticularMasterService _adhocParticularMasterService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private IWebHostEnvironment _hostingEnvironment;


        public AdhocParticularMasterController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IAdhocParticularMasterService adhocParticularMasterService,
            IEmailSender emailSender)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _adhocParticularMasterService = adhocParticularMasterService;
            _emailSender = emailSender;

        }
        [Authorize]
        [HttpPost]
        [Route("AdhocParticularMasterInsert")]

        public async Task<ActionResult<AdhocParticularMasterDtoInsertRespose>> AdhocParticularMasterInsert(AdhocParticularMasterDto Obj)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _adhocParticularMasterService.AdhocParticularMasterInsert(Obj, userId));
            }
            return Ok(await Task.FromResult(new AdhocParticularMasterDtoInsertRespose()));
        }

        [HttpPost]
        [Route("GetAdhocParticularList")]
        public async Task<ActionResult<AdhocParticularMasterDtoListRespose>> GetAdhocParticularList(int academicYearId)
        {
            return Ok(await _adhocParticularMasterService.GetAdhocParticularList(academicYearId));
            

        }
    }
}
