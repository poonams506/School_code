using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.NoticeModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.NoticeModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeController : ControllerBase
    {
        private readonly INoticeService _noticeService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        public NoticeController(IWebHostEnvironment hostingEnvironment, ICommonAppService commonAppService,
            IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender,
            INoticeService noticeService,IStorageService storageService)
        {
            _hostingEnvironment = hostingEnvironment;
            _noticeService = noticeService;
            _storageService = storageService;
            _commonAppService  = commonAppService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
        }

        [HttpPost]
        [Route("GetNoticeGridList")]

        public async Task<ActionResult<DatatableResponseModel>> GetNoticeGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var NoticeList = await _noticeService.GetNoticeGridList(requestObjectWrapper, userId);
            return Ok(NoticeList);
        }

        [Authorize]
        [HttpGet("NoticeSelect")]
        public async Task<ActionResult<NoticeUpsertDto>> NoticeSelect(long NoticeId)
        {
                var result =await _noticeService.NoticeSelect(NoticeId);
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

            result.NoticeTextFileArray.ForEach(async fileDetail =>
            {
                fileDetail.FullPath = await _storageService.GetFullPath(UploadFileType.NOTICE_TEXT_FILE_UPLOAD, fileDetail.FileName);
            });
            result.VideoText.ForEach(async fileDetail =>
            {
                fileDetail.FullPath = await _storageService.GetFullPath(UploadFileType.NOTICE_MEDIA_FILE_UPLOAD, fileDetail.FileName);
            });
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("NoticeUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<NoticeUpsertDto>> NoticeUpsert()
        {
            NoticeUpsertDto NoticeUpsertDto = JsonConvert.DeserializeObject<NoticeUpsertDto>(Request.Form["noticeDetail"], new TrimmingConverter());

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                if (NoticeUpsertDto.ngbStartDate != null && NoticeUpsertDto.ngbStartDate.day > 0)
                {
                    NoticeUpsertDto.StartDate = new DateTime(NoticeUpsertDto.ngbStartDate.year,
                     NoticeUpsertDto.ngbStartDate.month,
                     NoticeUpsertDto.ngbStartDate.day);
                }
                if (NoticeUpsertDto.ngbEndDate != null && NoticeUpsertDto.ngbEndDate.day > 0)
                {
                    NoticeUpsertDto.EndDate = new DateTime(NoticeUpsertDto.ngbEndDate.year,
                     NoticeUpsertDto.ngbEndDate.month,
                     NoticeUpsertDto.ngbEndDate.day);
                }

            IFormFileCollection files = Request.Form.Files;
            if (files?.Count > 0)
            {
              await  ProcessNoticeTextfiles(files, NoticeUpsertDto);
            }
            var result = await _noticeService.NoticeUpsert(NoticeUpsertDto, userId);
            await SendNoticeNotification(NoticeUpsertDto);
            return Ok(result);
        }

        private async Task<bool> SendNoticeNotification(NoticeUpsertDto NoticeUpsertDto)
        {
            // send notification
            if (NoticeUpsertDto.IsPublished == true)
            {
                try
                {
                    if (NoticeUpsertDto.NoticeToType == 2 && NoticeUpsertDto.ClassId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        List<Task<string>> tasks = new List<Task<string>>();
                        foreach (var item in NoticeUpsertDto.ClassId)
                        {
                            tasks.Add(sendForSelectClass(NoticeUpsertDto.NoticeTitle, NoticeUpsertDto.NoticeDescription, (int)item));
                        }
                        string[] results = await Task.WhenAll(tasks);
                    }
                    else if (NoticeUpsertDto.NoticeToType == 1 && NoticeUpsertDto.studentId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, string.Join(",", NoticeUpsertDto.studentId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Notice_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Notice_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", NoticeUpsertDto.NoticeTitle);

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
                    }
                    else if (NoticeUpsertDto.NoticeToType == 3 && NoticeUpsertDto.teacherId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(3, 0, 0, 0,"", string.Join(",", NoticeUpsertDto.teacherId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Notice_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Notice_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", NoticeUpsertDto.NoticeTitle);

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
                    }
                    else if (NoticeUpsertDto.NoticeToType == 4 && NoticeUpsertDto.clerkId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(4, 0, 0, 0,"","", string.Join(",", NoticeUpsertDto.clerkId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Notice_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Notice_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", NoticeUpsertDto.NoticeTitle);

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
                    }
                    else if (NoticeUpsertDto.NoticeToType == 5 && NoticeUpsertDto.cabDriverId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(6, 0, 0, 0,"","","", string.Join(",", NoticeUpsertDto.cabDriverId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Notice_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Notice_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", NoticeUpsertDto.NoticeTitle);

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
                    }



                }
                catch (Exception)
                {

                }
            }
            return await Task.FromResult(new bool());
        }

        private async Task<string> sendForSelectClass(string title, string message, int classId)
        {
            var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, classId);
            List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
            allFCMUsers.ForEach(user =>
            {
                try
                {
                    var messageTitle = _config["FirebaseSetting:MessageTemplates:Notice_Template:Title"];
                    var messageBody = _config["FirebaseSetting:MessageTemplates:Notice_Template:Body"];
                    messageBody = messageBody.Replace("{token1}", title);

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

        [HttpPost("UploadNoticeMediaChunk")]
        public async Task<IActionResult> UploadNoticeMediaChunk()
        {
            var fileChunk = Request.Form.Files["fileChunk"];
            var filename= Request.Form["filename"];
            var chunkIndex = JsonConvert.DeserializeObject<int>( Request.Form["chunkIndex"]);
            var totalChunks = JsonConvert.DeserializeObject<int>(Request.Form["totalChunks"]);
            string filePath = Path.Combine(GetUploadNoticeMediafilesFolderPath(), $"{filename}.part{chunkIndex}");
            if(fileChunk!=null)
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
            string filePath = Path.Combine(GetUploadNoticeMediafilesFolderPath(), filename);

            using (var mergedFileStream = new FileStream(filePath, FileMode.Create))
            {
                for (int i = 0; i < totalChunks; i++)
                {
                    string chunkFilePath = Path.Combine(GetUploadNoticeMediafilesFolderPath(), $"{filename}.part{i}");
                    using (var chunkStream = new FileStream(chunkFilePath, FileMode.Open))
                    {
                        await chunkStream.CopyToAsync(mergedFileStream);
                    }
                    System.IO.File.Delete(chunkFilePath);
                }
            }
        }

        private async Task ProcessNoticeTextfiles(IFormFileCollection files, NoticeUpsertDto noticeModel)
        {
            foreach (var file in files)
            {

                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.NOTICE_TEXT_FILE_UPLOAD, file);
                    var currentNoticeMediaFile = new NoticeFileDto
                    {
                        FileName = fileName,
                        FileType = 1
                    };
                    noticeModel.NoticeTextFileArray.Add(currentNoticeMediaFile);
                }
            }

        }

        private async Task ProcessNoticeMediaFiles(IFormFileCollection files, NoticeUpsertDto noticeModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.NOTICE_MEDIA_FILE_UPLOAD, file);
                    var currentNoticeMediaFile = new NoticeFileDto
                    {
                        FileName = fileName,
                        FileType = 2 // Assuming 2 represents media files
                    };
                    noticeModel.NoticeTextFileArray.Add(currentNoticeMediaFile);
                }
            }
        }


        private string GetUploadNoticeTextfilesFolderPath()
        {
            string folderName = "Uploads/notice/textfiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            return newPath;
        }

        private string GetUploadNoticeMediafilesFolderPath()
        {
            string folderName = "Uploads/notice/mediafiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            return newPath;
        }

        [HttpDelete]
        [Route("NoticeDelete")]
        public async Task<ActionResult<int>> NoticeDelete(long noticeId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _noticeService.NoticeDelete(noticeId, userId));
        }

        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishNoticeParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishNoticeParticulars(PublishUnpublishNoticeDto publishRequest)
        {
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _noticeService.PublishUnpublishNoticeParticular(publishRequest, userId);
            NoticeUpsertDto noticeUpsertDto = new NoticeUpsertDto();
            noticeUpsertDto = await _noticeService.NoticeSelect(publishRequest.NoticeId);
            await SendNoticeNotification(noticeUpsertDto);
            return Ok(result);

        }

        #region Parent App APIS
        [Authorize]
        [HttpPost]
        [Route("GetAllNoticeForStudent")]
        public async Task<ActionResult<ParentAppNoticeResponseDto>> GetAllNoticeForStudent(ParentAppNoticeRequestDto requestDto)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            requestDto.AcademicYearId = (int)schoolDetail.AcademicYearId;

            var lstNotice = await _noticeService.GetAllNoticeForStudent(requestDto);

            foreach (var notice in lstNotice.NoticeList)
            {
                foreach (var noticeDetail in notice.LstNoticeDetail)
                {
                    noticeDetail.FullPath = await _storageService.GetFullPath(UploadFileType.NOTICE_TEXT_FILE_UPLOAD, noticeDetail.FileName);
                }

                foreach (var noticeMedia in notice.LstNoticeMediaDetail)
                {
                    noticeMedia.FullPath = await _storageService.GetFullPath(UploadFileType.NOTICE_MEDIA_FILE_UPLOAD, noticeMedia.FileName);
                }
            }

            return Ok(lstNotice);
        }

#endregion

        [Authorize]
        [HttpGet]
        [Route("GetNoticeFromRoleAppSelectList")]
        public async Task<ActionResult<CommonDropdownSelectListItemResponseDto>> GetNoticeFromRoleAppSelectList()
        {
            var fromSelectList = await _noticeService.GetNoticeFromRoleAppSelectList();
            return Ok(fromSelectList);
        }

    }
}
