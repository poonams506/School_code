using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.ParentModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;


namespace SchoolApiApplication.Controllers.ParentModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IParentService _parentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IStorageService _storageService;
        private IWebHostEnvironment _hostingEnvironment;
        public string? UPLOAD_PATH;

        public ParentController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IParentService parentService,
            IEmailSender emailSender, IStorageService storageService)
        {
            _config = config;   
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _parentService = parentService;
            _emailSender = emailSender;
            _storageService = storageService;
        }

        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/parent";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }

        [Authorize]
        [HttpGet("GetParentProfile")]
        public async Task<ActionResult<ParentDto>> GetParentProfile(long? parentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _parentService.GetParentProfile(parentId);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.ProfileImageURL))
                    {
                        var parentImage = await _storageService.ReadImageFileAsync(UploadFileType.PARENT_UPLOAD, result.ProfileImageURL);
                        if (parentImage.IsSuccess)
                        {
                            result.ProfileImageContentType = parentImage.LogoImageContentType;
                            result.ProfileBase64Image = parentImage.Base64LogoImage;
                        }

                    }
                    if (result.BirthDate != null && result.BirthDate.Value.Day > 0)
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
                    result = new ParentDto { };
                }
                return Ok(result);
            }
            return Ok(await Task.FromResult(new ParentDto()));

        }
        [Authorize]
        [HttpPost]
        [Route("ParentProfileUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> ParentProfileUpsert()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                ParentDto parentModel = JsonConvert.DeserializeObject<ParentDto>(Request.Form["parentProfile"], new TrimmingConverter());
                if (parentModel.ngbBirthDate != null)
                { 
                    parentModel.BirthDate = new DateTime(parentModel.ngbBirthDate.year,
                                        parentModel.ngbBirthDate.month,
                                        parentModel.ngbBirthDate.day);
                }
     
                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                   await ProcessParentProfileImage(files, parentModel);
                }
                return Ok(await _parentService.ParentProfileUpsert(parentModel, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }
        private async Task ProcessParentProfileImage(IFormFileCollection files, ParentDto parentModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    parentModel.ProfileImageURL =  await _storageService.UploadFileAsync(UploadFileType.PARENT_UPLOAD, file);
                }
            }

        }
        [HttpPost]
        [Route("GetParentList")]
        public async Task<ActionResult<DatatableResponseModel>> GetParentList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var parentList = await _parentService.GetParentList(requestObjectWrapper);
                return Ok(parentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [HttpDelete]
        [Route("ParentProfileDelete")]
        public async Task<ActionResult<ParentDeleteRespose>> ParentProfileDelete(long parentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _parentService.ParentProfileDelete(parentId, userId));
            }

            return Ok(await Task.FromResult(new ParentDeleteRespose()));
        }
    }
}
