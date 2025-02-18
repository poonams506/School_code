using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.AdminModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.AdminModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;

namespace SchoolApiApplication.Controllers.AdminModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAdminService _adminService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IStorageService _storageService;
        private IWebHostEnvironment _hostingEnvironment;
        public string? UPLOAD_PATH;

        public AdminController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IAdminService adminService,
            IEmailSender emailSender, IStorageService storageService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _adminService = adminService;
            _emailSender = emailSender;
            _storageService = storageService;
        }

        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/admin";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }

        [Authorize]
        [HttpGet("GetAdminProfile")]
        public async Task<ActionResult<AdminDto>> GetAdminProfile(long AdminId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _adminService.GetAdminProfile(AdminId);
                if (result != null)
                {

                    if (!string.IsNullOrEmpty(result.ProfileImageURL))
                    {
                        var adminImage = await _storageService.ReadImageFileAsync(UploadFileType.ADMIN_UPLOAD, result.ProfileImageURL);
                        if (adminImage.IsSuccess)
                        {
                            result.ProfileImageContentType = adminImage.LogoImageContentType;
                            result.ProfileBase64Image = adminImage.Base64LogoImage;
                        }

                    }

                    if (result.BirthDate != null)
                    {
                        result.ngbBirthDate = new SchoolNgbDateModel
                        {
                            year = result.BirthDate.Value.Year,
                            month = result.BirthDate.Value.Month,
                            day = result.BirthDate.Value.Day
                        };
                    }
                }
                else
                {
                    result = new AdminDto() { };
                }

                return Ok(result);
            }
            return Ok(await Task.FromResult(new AdminDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("AdminProfileUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> AdminProfileUpsert()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                AdminDto adminModel = JsonConvert.DeserializeObject<AdminDto>(Request.Form["adminprofile"], new TrimmingConverter());
                if (adminModel.ngbBirthDate != null)
                {
                    adminModel.BirthDate = new DateTime(adminModel.ngbBirthDate.year,
                                       adminModel.ngbBirthDate.month,
                                       adminModel.ngbBirthDate.day);
                }

                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                  await  ProcessAdminProfileImage(files, adminModel);
                }
                return Ok(await _adminService.AdminProfileUpsert(adminModel, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }


        private async Task ProcessAdminProfileImage(IFormFileCollection files, AdminDto adminModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    adminModel.ProfileImageURL =  await _storageService.UploadFileAsync(UploadFileType.ADMIN_UPLOAD, file);
                }
            }
        }

        [HttpPost]
        [Route("GetAdminList")]
        public async Task<ActionResult<DatatableResponseModel>> GetAdminList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var adminList = await _adminService.GetAdminList(requestObjectWrapper);
                return Ok(adminList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [HttpDelete]
        [Route("AdminProfileDelete")]
        public async Task<ActionResult<AdminDeleteRespose>> AdminProfileDelete(long adminId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

                return Ok(await _adminService.AdminProfileDelete(adminId, userId));
            }

            return Ok(await Task.FromResult(new AdminDeleteRespose()));

        }

    }
}