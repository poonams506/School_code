using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.AccessModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;
using SchoolApiApplication.DTO.ClerkModule;

namespace SchoolApiApplication.Controllers.AccessModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAccessService _accessService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private IWebHostEnvironment _hostingEnvironment;
        public string? UPLOAD_PATH;

        public AccessController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IAccessService accessService,
            IEmailSender emailSender)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _accessService = accessService;
            _emailSender = emailSender;
        }

        [Authorize]
        [HttpPost]
        [Route("RolePermissionUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> RolePermissionUpsert(List<PermissionDto> RolePermissionModel)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _accessService.RolePermissionUpsert(RolePermissionModel, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        /// <summary>
        /// use this api to get actual role module permission by role id
        /// </summary>
        /// <param name="RoleId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("GetModulesPermissions")]
        public async Task<ActionResult<RoleModuleDto>> GetModulesPermissions(int RoleId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _accessService.GetModulesPermissions(RoleId);
                if (result == null)
                {
                    result = new RoleModuleDto() { };
                }
                return Ok(result);
            }
            return Ok(await Task.FromResult(new RoleModuleDto()));
        }

        /// <summary>
        /// use this api for role master only
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetRoleList")]
        public async Task<ActionResult<RoleMasterDto>> GetRoleList()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var roleList = await _accessService.GetRoleList();
                return Ok(roleList);
            }
            return Ok(await Task.FromResult(new RoleMasterDto()));
        }

        /// <summary>
        /// use this api for permission master only
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetPermissionsList")]
        public async Task<ActionResult<PermissionMasterDto>> GetPermissionsList()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var permissionsList = await _accessService.GetPermissionsList();
                return Ok(permissionsList);
            }
            return Ok(await Task.FromResult(new PermissionMasterDto()));
        }


        /// <summary>
        /// use this api for module master only
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetModuleList")]
        public async Task<ActionResult<ModuleMasterDto>> GetModuleList()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var moduleList = await _accessService.GetModuleList();
                return Ok(moduleList);
            }
            return Ok(await Task.FromResult(new ModuleMasterDto()));
        }

    }
}