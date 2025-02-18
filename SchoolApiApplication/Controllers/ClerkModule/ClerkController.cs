using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.ClerkModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;

namespace SchoolApiApplication.Controllers.ClerkModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClerkController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IClerkService _clerkService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IStorageService _storageService;
        private IWebHostEnvironment _hostingEnvironment;
        public string? UPLOAD_PATH;

        public ClerkController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IClerkService clerkService,
            IEmailSender emailSender, IStorageService storageService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _clerkService = clerkService;
            _emailSender = emailSender;
            _storageService = storageService;
        }

        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/clerk";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }

        [Authorize]
        [HttpGet("GetClerkProfile")]
        public async Task<ActionResult<ClerkDto>> GetClerkProfile(long ClerkId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _clerkService.GetClerkProfile(ClerkId);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.ProfileImageURL))
                    {
                        var clerkImage = await _storageService.ReadImageFileAsync(UploadFileType.CLERK_UPLOAD, result.ProfileImageURL);
                        if (clerkImage.IsSuccess)
                        {
                            result.ProfileImageContentType = clerkImage.LogoImageContentType;
                            result.ProfileBase64Image = clerkImage.Base64LogoImage;
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
                    result = new ClerkDto() { };
                }

                return Ok(result);
            }
            return Ok(await Task.FromResult(new ClerkDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("ClerkProfileUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> ClerkProfileUpsert()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                ClerkDto clerkModel = JsonConvert.DeserializeObject<ClerkDto>(Request.Form["clerkprofile"], new TrimmingConverter());
                if (clerkModel.ngbBirthDate != null)
                {
                    clerkModel.BirthDate = new DateTime(clerkModel.ngbBirthDate.year,
                                       clerkModel.ngbBirthDate.month,
                                       clerkModel.ngbBirthDate.day);
                }

                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                    await ProcessClerkProfileImage(files, clerkModel);
                }
                return Ok(await _clerkService.ClerkProfileUpsert(clerkModel, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        private async Task ProcessClerkProfileImage(IFormFileCollection files, ClerkDto clerkModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    clerkModel.ProfileImageURL =  await _storageService.UploadFileAsync(UploadFileType.CLERK_UPLOAD, file);
                }
            
            }
        }
        
        [HttpPost]
        [Route("GetClerkList")]
        public async Task<ActionResult<DatatableResponseModel>> GetClerkList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var clerkList = await _clerkService.GetClerkList(requestObjectWrapper);
                return Ok(clerkList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [HttpDelete]
        [Route("ClerkProfileDelete")]
        public async Task<ActionResult<ClerkDeleteRespose>> ClerkProfileDelete(long clerkId)
        {

            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _clerkService.ClerkProfileDelete(clerkId, userId));
            }

            return Ok(await Task.FromResult(new ClerkDeleteRespose()));

        }

    }
}