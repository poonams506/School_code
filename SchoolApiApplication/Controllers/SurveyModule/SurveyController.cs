using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.NoticeModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SurveyModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Services.NoticeModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SurveyModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.SurveyModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly ISurveyService _SurveyService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;
        public SurveyController(IWebHostEnvironment hostingEnvironment, ICommonAppService commonAppService,
            ISurveyService SurveyService, IStorageService storageService)
        {
            _hostingEnvironment = hostingEnvironment;
            _SurveyService = SurveyService;
            _storageService = storageService;
            _commonAppService = commonAppService;
        }


        [HttpPost]
        [Route("GetSurveyGridList")]

        public async Task<ActionResult<DatatableResponseModel>> GetSurveyGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var SurveyList = await _SurveyService.GetSurveyGridList(requestObjectWrapper, userId);
            return Ok(SurveyList);
        }

        [Authorize]
        [HttpGet("SurveySelect")]
        public async Task<ActionResult<SurveyDto>> SurveySelect(long SurveyId)
        {
            var result = await _SurveyService.SurveySelect(SurveyId);
            if (result.StartDate != null && result.StartDate.Value.Day > 0)
            {
                result.ngbStartDate = new SchoolNgbDateModel
                {
                    year = result.StartDate.Value.Year,
                    month = result.StartDate.Value.Month,
                    day = result.StartDate.Value.Day
                };
            }
            if (result.EndDate != null && result.EndDate.Value.Day > 0)
            {
                result.ngbEndDate = new SchoolNgbDateModel
                {
                    year = result.EndDate.Value.Year,
                    month = result.EndDate.Value.Month,
                    day = result.EndDate.Value.Day
                };
            }

            result.SurveyTextFileArray.ForEach(async fileDetail =>
            {
                fileDetail.FullPath = await _storageService.GetFullPath(UploadFileType.SURVEY_FILE_UPLOAD, fileDetail.FileName);
            });
            return Ok(result);
        }
        [HttpDelete]
        [Route("SurveyDelete")]
        public async Task<ActionResult<int>> SurveyDelete(long SurveyId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _SurveyService.SurveyDelete(SurveyId, userId));
        }

        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishSurveyParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishSurveyParticulars(PublishUnpublishSurveyDto publishRequest)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _SurveyService.PublishUnpublishSurveyParticular(publishRequest, userId));

        }

        [Authorize]
        [HttpGet]
        [Route("GetSurveyFromRoleAppSelectList")]
        public async Task<ActionResult<CommonDropdownSelectListItemResponseDto>> GetSurveyFromRoleAppSelectList()
        {
            var fromSelectList = await _SurveyService.GetSurveyFromRoleAppSelectList();
            return Ok(fromSelectList);
        }
        [Authorize]
        [HttpPost]
        [Route("SurveyUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<SurveyDto>> SurveyUpsert()
        {
            SurveyDto SurveyDto = JsonConvert.DeserializeObject<SurveyDto>(Request.Form["SurveyDetail"], new TrimmingConverter());

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            if (SurveyDto.ngbStartDate != null && SurveyDto.ngbStartDate.day > 0)
            {
                SurveyDto.StartDate = new DateTime(SurveyDto.ngbStartDate.year,
                 SurveyDto.ngbStartDate.month,
                 SurveyDto.ngbStartDate.day);
            }
            if (SurveyDto.ngbEndDate != null && SurveyDto.ngbEndDate.day > 0)
            {
                SurveyDto.EndDate = new DateTime(SurveyDto.ngbEndDate.year,
                 SurveyDto.ngbEndDate.month,
                 SurveyDto.ngbEndDate.day);
            }

            IFormFileCollection files = Request.Form.Files;
            if (files?.Count > 0)
            {
                await ProcessSurveyTextfiles(files, SurveyDto);
            }

            return Ok(await _SurveyService.SurveyUpsert(SurveyDto, userId));
        }

        private async Task ProcessSurveyTextfiles(IFormFileCollection files, SurveyDto surveyModel)
        {
            foreach (var file in files)
            {

                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.SURVEY_FILE_UPLOAD, file);
                    var currentSurveyMediaFile = new SurveyFileDto
                    {
                        FileName = fileName,
                        FileType = 1
                    };
                    surveyModel.SurveyTextFileArray.Add(currentSurveyMediaFile);
                }
            }

        }
    }
}
