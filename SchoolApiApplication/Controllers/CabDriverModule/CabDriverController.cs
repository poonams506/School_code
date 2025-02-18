using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.CabDriverModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.CabDriverModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;

namespace SchoolApiApplication.Controllers.CabDriverModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class CabDriverController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ICabDriverService _cabDriverService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IStorageService _storageService;
        private IWebHostEnvironment _hostingEnvironment;
        public string? UPLOAD_PATH;

        public CabDriverController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, ICabDriverService cabDriverService,
            IEmailSender emailSender, IStorageService storageService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _cabDriverService = cabDriverService;
            _emailSender = emailSender;
            _storageService = storageService;
        }

        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/cabdriver";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }

        [Authorize]
        [HttpGet("GetCabDriverProfile")]
        public async Task<ActionResult<CabDriverDto>> GetCabDriverProfile(long CabDriverId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _cabDriverService.GetCabDriverProfile(CabDriverId);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.ProfileImageURL))
                    {
                        var cabDriverImage = await _storageService.ReadImageFileAsync(UploadFileType.CAB_DRIVER_UPLOAD, result.ProfileImageURL);
                        if (cabDriverImage.IsSuccess)
                        {
                            result.ProfileImageContentType = cabDriverImage.LogoImageContentType;
                            result.ProfileBase64Image = cabDriverImage.Base64LogoImage;
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
                    if (result.ValidTill != null)
                    {
                        result.ngbValidTill = new SchoolNgbDateModel
                        {
                            year = result.ValidTill.Value.Year,
                            month = result.ValidTill.Value.Month,
                            day = result.ValidTill.Value.Day
                        };
                    }
                }
                else
                {
                    result = new CabDriverDto() { };
                }

                return Ok(result);
            }
            return Ok(await Task.FromResult(new CabDriverDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("CabDriverProfileUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> CabDriverProfileUpsert()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                CabDriverDto cabDriverModel = JsonConvert.DeserializeObject<CabDriverDto>(Request.Form["cabdriverprofile"], new TrimmingConverter());
                if (cabDriverModel.ngbBirthDate != null)
                {
                    cabDriverModel.BirthDate = new DateTime(cabDriverModel.ngbBirthDate.year,
                                       cabDriverModel.ngbBirthDate.month,
                                       cabDriverModel.ngbBirthDate.day);
                }
                if (cabDriverModel.ngbValidTill != null)
                {
                    cabDriverModel.ValidTill = new DateTime(cabDriverModel.ngbValidTill.year,
                                       cabDriverModel.ngbValidTill.month,
                                       cabDriverModel.ngbValidTill.day);
                }

                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                   await ProcessCabDriverProfileImage(files, cabDriverModel);
                }
                return Ok(await _cabDriverService.CabDriverProfileUpsert(cabDriverModel, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        private async Task ProcessCabDriverProfileImage(IFormFileCollection files, CabDriverDto cabDriverModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    cabDriverModel.ProfileImageURL =  await _storageService.UploadFileAsync(UploadFileType.CAB_DRIVER_UPLOAD, file);
                }

            }
        }
        
        [HttpPost]
        [Route("GetCabDriverList")]
        public async Task<ActionResult<DatatableResponseModel>> GetCabDriverList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var cabDriverList = await _cabDriverService.GetCabDriverList(requestObjectWrapper);
                return Ok(cabDriverList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [HttpDelete]
        [Route("CabDriverDelete")]
        public async Task<ActionResult<CabDriverDeleteRespose>> CabDriverDelete(long cabDriverId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _cabDriverService.CabDriverDelete(cabDriverId, userId));
            }

            return Ok(await Task.FromResult(new CabDriverDeleteRespose()));
        }


    }
}