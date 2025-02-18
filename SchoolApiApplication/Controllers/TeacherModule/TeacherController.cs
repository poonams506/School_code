using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.TeacherModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ITeacherService _teacherService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IStorageService _storageService;
        private IWebHostEnvironment _hostingEnvironment;
        public string? UPLOAD_PATH;

        public TeacherController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, ITeacherService teacherService, IStorageService storageService,
            IEmailSender emailSender)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _teacherService = teacherService;
            _emailSender = emailSender;
            _storageService = storageService;
        }

        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/teacher";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }

        [Authorize]
        [HttpGet("GetTeacherProfile")]
        public async Task<ActionResult<TeacherDto>> GetTeacherProfile(long TeacherId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _teacherService.GetTeacherProfile(TeacherId);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.ProfileImageURL))
                    {
                        var teacherImage = await _storageService.ReadImageFileAsync(UploadFileType.TEACHER_UPLOAD, result.ProfileImageURL);
                        if (teacherImage.IsSuccess)
                        {
                            result.ProfileImageContentType = teacherImage.LogoImageContentType;
                            result.ProfileBase64Image = teacherImage.Base64LogoImage;
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
                    result = new TeacherDto() { };
                }

                return Ok(result);
            }
            return Ok(await Task.FromResult(new TeacherDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("TeacherProfileUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> TeacherProfileUpsert()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                TeacherDto teacherModel = JsonConvert.DeserializeObject<TeacherDto>(Request.Form["teacherprofile"], new TrimmingConverter());
                if (teacherModel.ngbBirthDate != null)
                {
                    teacherModel.BirthDate = new DateTime(teacherModel.ngbBirthDate.year,
                                       teacherModel.ngbBirthDate.month,
                                       teacherModel.ngbBirthDate.day);
                }

                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                   await ProcessTeacherProfileImage(files, teacherModel);
                }
                return Ok(await _teacherService.TeacherProfileUpsert(teacherModel, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        private async Task ProcessTeacherProfileImage(IFormFileCollection files, TeacherDto teacherModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    teacherModel.ProfileImageURL =  await _storageService.UploadFileAsync(UploadFileType.TEACHER_UPLOAD, file);
                }
            }
        }
        [HttpPost]
        [Route("GetTeacherList")]
        public async Task<ActionResult<DatatableResponseModel>> GetTeacherList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var teacherList = await _teacherService.GetTeacherList(requestObjectWrapper);
                return Ok(teacherList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [HttpDelete]
        [Route("TeacherProfileDelete")]
        public async Task<ActionResult<TeacherDeleteRespose>> TeacherProfileDelete(long teacherId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

                return Ok(await _teacherService.TeacherProfileDelete(teacherId, userId));
            }

            return Ok(await Task.FromResult(new TeacherDeleteRespose()));
        }

    }
}