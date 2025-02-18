using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.HomeworkModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolEventModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.BusinessLayer.Services.HomeworkModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Numerics;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.SchoolEventModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolEventController : ControllerBase
    {
        private readonly ISchoolEventService _schoolEventService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        public SchoolEventController(IWebHostEnvironment hostingEnvironment,
            IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender,
            ISchoolEventService schoolEventService,
            IStorageService storageService)
        {
            _hostingEnvironment = hostingEnvironment;
            _schoolEventService = schoolEventService;
            _storageService = storageService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
        }
        [HttpPost]
        [Route("SchoolEvent")]

        public async Task<ActionResult<DatatableResponseModel>> SchoolEvent(DatatableRequestWrapper requestObjectWrapper)
        {
            var SchoolEventList = await _schoolEventService.SchoolEvent(requestObjectWrapper);
            return Ok(SchoolEventList);
        }

        [Authorize]
        [HttpGet("SchoolEventSelect")]
        public async Task<ActionResult<SchoolEventDto>> SchoolEventSelect(long SchoolEventId)
        {


            var result = await _schoolEventService.SchoolEventSelect(SchoolEventId);
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
            if (result.StartTime != null && result.StartTime.Value.Hour > 0)
            {
                result.ngbStartTime = new SchoolNgbTimeModel
                {
                    hour = result.StartTime.Value.Hour,
                    minute = result.StartTime.Value.Minute,
                    second = result.StartTime.Value.Second
                };
            }
            if (result.EndTime != null && result.EndTime.Value.Hour > 0)
            {
                result.ngbEndTime = new SchoolNgbTimeModel
                {
                    hour = result.EndTime.Value.Hour,
                    minute = result.EndTime.Value.Minute,
                    second = result.EndTime.Value.Second

                };
            }

            result.FileNameList.ForEach(async file =>
            {
                file.FullPath = await _storageService.GetFullPath(UploadFileType.SCHOOL_UPLOAD, file.FileName);
            });
            return Ok(result);
        }
        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishSchoolEventParticular")]
        public async Task<ActionResult<int>> PublishUnpublishSchoolEventParticular(PublishUnpublishSchoolEventDto publishRequest)
        {
            {
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var result = await _schoolEventService.PublishUnpublishSchoolEventParticular(publishRequest, userId);
                SchoolEventDto SchoolEventDto = new SchoolEventDto();
                SchoolEventDto = await _schoolEventService.SchoolEventSelect(publishRequest.SchoolEventId);
                await SendNotification(SchoolEventDto);
                return (result);
            }
           
        }
        [HttpDelete]
        [Route("SchoolEventDelete")]
        public async Task<ActionResult<int>> SchoolEventDelete(long SchoolEventId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _schoolEventService.SchoolEventDelete(SchoolEventId, userId));
        }


        [Authorize]
        [HttpPost]
        [Route("SchoolEventUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<SchoolEventDto>> SchoolEventUpsert()
        {
            SchoolEventDto SchoolEventDto = JsonConvert.DeserializeObject<SchoolEventDto>(Request.Form["schoolevent"], new TrimmingConverter());


            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            if (SchoolEventDto.ngbStartDate != null && SchoolEventDto.ngbStartDate.day > 0)
            {
                SchoolEventDto.StartDate = new DateTime(SchoolEventDto.ngbStartDate.year,
                 SchoolEventDto.ngbStartDate.month,
                 SchoolEventDto.ngbStartDate.day);
            }
            if (SchoolEventDto.ngbEndDate != null && SchoolEventDto.ngbEndDate.day > 0)
            {
                SchoolEventDto.EndDate = new DateTime(SchoolEventDto.ngbEndDate.year,
                 SchoolEventDto.ngbEndDate.month,
                 SchoolEventDto.ngbEndDate.day);
            }
            if (SchoolEventDto.ngbStartTime != null && SchoolEventDto.ngbStartTime.hour > 0)
            {
                SchoolEventDto.StartTime = new DateTime(SchoolEventDto.ngbStartDate.year,
                 SchoolEventDto.ngbStartDate.month,
                 SchoolEventDto.ngbStartDate.day,
                 SchoolEventDto.ngbStartTime.hour,
                 SchoolEventDto.ngbStartTime.minute,
                 SchoolEventDto.ngbStartTime.second);
            }
            if (SchoolEventDto.ngbEndTime != null && SchoolEventDto.ngbEndTime.hour > 0)
            {
                SchoolEventDto.EndTime = new DateTime(SchoolEventDto.ngbEndDate.year,
                 SchoolEventDto.ngbEndDate.month,
                 SchoolEventDto.ngbEndDate.day,
                 SchoolEventDto.ngbEndTime.hour,
                 SchoolEventDto.ngbEndTime.minute,
                 SchoolEventDto.ngbEndTime.second);
                }


            IFormFileCollection files = Request.Form.Files;
            if (files?.Count > 0)
            {
               await ProcessSchoolEventFiles(files, SchoolEventDto);
            }

            //return Ok(await _schoolEventService.SchoolEventUpsert(SchoolEventDto, userId));
            var result = await _schoolEventService.SchoolEventUpsert(SchoolEventDto, userId);
            await SendNotification(SchoolEventDto);
            return Ok(result);
        }
        private async Task<bool> SendNotification(SchoolEventDto SchoolEventDto)
        {
            // send notification
            if (SchoolEventDto.IsPublished == true)
            {
                try
                {
                    if (SchoolEventDto.ClassId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        List<Task<string>> tasks = new List<Task<string>>();
                        foreach (var item in SchoolEventDto.ClassId)
                        {
                            tasks.Add(sendForSelectClass(SchoolEventDto.EventTitle,SchoolEventDto.StartDate,SchoolEventDto.EndDate, (int)item));
                        }
                        string[] results = await Task.WhenAll(tasks);
                    }
                }
                catch (Exception)
                {

                }
            }
            return await Task.FromResult(new bool());
        }

        private async Task<string> sendForSelectClass(string eventTitle,DateTime? StartDate,DateTime? EndDate,int classId)
        {
            var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, classId);
            List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
            allFCMUsers.ForEach(user =>
            {
                try
                {
                    string eventDate= StartDate.Value.ToString("dd/MM/yyyy") +" To " + EndDate.Value.ToString("dd/MM/yyyy");
                    var messageTitle = _config["FirebaseSetting:MessageTemplates:Event_Template:Title"];
                    var messageBody = _config["FirebaseSetting:MessageTemplates:Event_Template:Body"];
                    messageBody = messageBody.Replace("{token1}", eventTitle);
                    messageBody = messageBody.Replace("{token2}", eventDate);

                    notificationUserDtos.Add(new FCMNotificationUserDto
                    {
                        Title = messageTitle,
                        Body = messageBody,
                        Token = user.FCMToken,
                        Data = new Dictionary<string, string>
                        {
                        }
                    });
                }
                catch (Exception)
                {

                }

            });
            await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);
            return "true";
        }

        [HttpPost("UploadSchoolEventMediaChunk")]
        public async Task<IActionResult> UploadSchoolEventMediaChunk()
        {
            var fileChunk = Request.Form.Files["fileChunk"];
            var filename = Request.Form["filename"];
            var chunkIndex = JsonConvert.DeserializeObject<int>(Request.Form["chunkIndex"]);
            var totalChunks = JsonConvert.DeserializeObject<int>(Request.Form["totalChunks"]);
            string filePath = Path.Combine(GetUploadSchoolEventMediafilesFolderPath(), $"{filename}.part{chunkIndex}");
            if (fileChunk != null)
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await fileChunk.CopyToAsync(fileStream);
                }

                if (chunkIndex == totalChunks - 1)
                {
                    // All chunks uploaded, merge them into one file
                    await MergeChunks(filename, totalChunks);
                }
            }
            return Ok();
        }

        private async Task MergeChunks(string filename, int totalChunks)
        {
            string filePath = Path.Combine(GetUploadSchoolEventMediafilesFolderPath(), filename);

            using (var mergedFileStream = new FileStream(filePath, FileMode.Create))
            {
                for (int i = 0; i < totalChunks; i++)
                {
                    string chunkFilePath = Path.Combine(GetUploadSchoolEventMediafilesFolderPath(), $"{filename}.part{i}");
                    using (var chunkStream = new FileStream(chunkFilePath, FileMode.Open))
                    {
                        await chunkStream.CopyToAsync(mergedFileStream);
                    }
                    System.IO.File.Delete(chunkFilePath);
                }
            }
        }

        private async Task ProcessSchoolEventFiles(IFormFileCollection files, SchoolEventDto SchoolEventModel )
        {
           
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName =await _storageService.UploadFileAsync(UploadFileType.SCHOOL_UPLOAD, file);
                    var currentSchoolEventMediaFile = new SchoolEventFileDto
                    {
                        FileName = fileName,
                    };
                    SchoolEventModel.FileNameList.Add(currentSchoolEventMediaFile);
                }
            }

        }


        private string GetUploadSchoolEventTextfilesFolderPath()
        {
            string folderName = "Uploads/schoolevent/textfiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            return newPath;
        }

        private string GetUploadSchoolEventMediafilesFolderPath()
        {
            string folderName = "Uploads/schoolevent/mediafiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            return newPath;
        }
    }
}
