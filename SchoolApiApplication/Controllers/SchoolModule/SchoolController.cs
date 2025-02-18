using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.SchoolModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
      
        private readonly ISchoolService _schoolService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IStorageService _storageService;

        public SchoolController(
            IHttpContextAccessor httpContextAccessor, ISchoolService schoolService,
            IStorageService storageService
           )
        {
           
            _httpContextAccessor = httpContextAccessor;
            _schoolService = schoolService;
            _storageService = storageService;
        }


        [Authorize]
        [HttpGet("GetSchoolProfile")]
        public async Task<ActionResult<SchoolDto>> GetSchoolProfile(Int16 SchoolId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                string schoolCode = Convert.ToString(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == "SchoolCode").Value);
                var result = await _schoolService.GetSchoolProfile(SchoolId);
                if (result != null)
                {
                    if(!string.IsNullOrEmpty(result.LogoUrl))
                    {
                        var schoolImage = await _storageService.ReadImageFileAsync(UploadFileType.SCHOOL_UPLOAD, result.LogoUrl);
                        if (schoolImage.IsSuccess)
                        {
                            result.LogoImageContentType = schoolImage.LogoImageContentType;
                            result.Base64LogoImage = schoolImage.Base64LogoImage;
                        }
                       
                    }
                    
                   
                    if (result.EstablishmentDate != null)
                    {
                        result.ngbEstablishmentDate = new SchoolNgbDateModel
                        {
                            year = result.EstablishmentDate.Value.Year,
                            month = result.EstablishmentDate.Value.Month,
                            day = result.EstablishmentDate.Value.Day
                        };
                    }
                }
                else
                {
                    result = new SchoolDto() {SchoolCode=schoolCode };
                }
                return Ok(result);
            }
            return Ok(await Task.FromResult(new SchoolDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("SchoolProfileUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> SchoolProfileUpsert()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                SchoolDto schoolModel = JsonConvert.DeserializeObject<SchoolDto>(Request.Form["schoolprofile"], new TrimmingConverter());
                if (schoolModel.ngbEstablishmentDate != null)
                {
                    schoolModel.EstablishmentDate = new DateTime(schoolModel.ngbEstablishmentDate.year,
                                       schoolModel.ngbEstablishmentDate.month,
                                       schoolModel.ngbEstablishmentDate.day);
                }

                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                  await  ProcessSchoolProfileImage(files, schoolModel);
                }
                return Ok(await _schoolService.SchoolProfileUpsert(schoolModel, userId));
            }
            return Ok(await Task.FromResult(new int()));
        }

        [Authorize]
        [HttpGet("GetSchoolSettingProfile")]
        public async Task<ActionResult<SchoolSettingDto>> GetSchoolSettingProfile(Int16 SchoolId,int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {

                var result = await _schoolService.GetSchoolSettingProfile(SchoolId, academicYearId);
                if (result.AcademicYearStartMonth != null && result.AcademicYearStartMonth.Value.Day > 0)
                {
                    result.ngbAcademicYearStartMonth = new SchoolNgbDateModel
                    {
                        year = result.AcademicYearStartMonth.Value.Year,
                        month = result.AcademicYearStartMonth.Value.Month,
                        day = result.AcademicYearStartMonth.Value.Day
                    };
                }
                return Ok(result);
            }
            return Ok(await Task.FromResult(new SchoolSettingDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("SchoolSettingUpsert")]
        public async Task<ActionResult<int>> SchoolProfileUpsert([FromBody]SchoolSettingDto schoolModel)
        {
           
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                if (schoolModel.ngbAcademicYearStartMonth != null && schoolModel.ngbAcademicYearStartMonth.day > 0)
                {
                    schoolModel.AcademicYearStartMonth = new DateTime(schoolModel.ngbAcademicYearStartMonth.year,
                     schoolModel.ngbAcademicYearStartMonth.month,
                     schoolModel.ngbAcademicYearStartMonth.day);
                }
                return Ok(await _schoolService.SchoolSettingUpsert(schoolModel, userId));
           
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetCurrentSchoolAppVersion")]
        public async Task<ActionResult<AppVersionDto>> GetCurrentSchoolAppVersion()
        {
            return Ok(await _schoolService.GetCurrentSchoolAppVersion());
        }

        private async Task ProcessSchoolProfileImage(IFormFileCollection files, SchoolDto schoolModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    schoolModel.LogoUrl =  await _storageService.UploadFileAsync(UploadFileType.SCHOOL_UPLOAD, file);
                }
            }
        }


    }
}