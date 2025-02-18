using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.GalleryModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.BusinessLayer.Services.UserModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.Helper.Implementations;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.GalleryModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly IGalleryService _galleryService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        public GalleryController(IWebHostEnvironment hostingEnvironment, ICommonAppService commonAppService,
             IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender,
            IGalleryService galleryService, IStorageService storageService)
        {
            _hostingEnvironment = hostingEnvironment;
            _galleryService = galleryService;
            _storageService = storageService;
            _commonAppService  = commonAppService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
        }

        [HttpPost]
        [Route("GetGalleryGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetGalleryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var GalleryList = await _galleryService.GetGalleryGridList(requestObjectWrapper, userId);
            return Ok(GalleryList);
        }

        [Authorize]
        [HttpGet("GallerySelect")]
        public async Task<ActionResult<GalleryUpsertDto>> GallerySelect(long galleryId)
        {
            var result = await _galleryService.GallerySelect(galleryId);

            if (result.StartDate != null && result.StartDate.Value.Day > 0)
            {
                result.ngbStartDate = new SchoolNgbDateModel
                {
                    year = result.StartDate.Value.Year,
                    month = result.StartDate.Value.Month,
                    day = result.StartDate.Value.Day
                };
            }

            result.GalleryTextFileArray.ForEach(async fileDetail =>
            {
                fileDetail.FullPath = await _storageService.GetFullPath(UploadFileType.GALLERY_TEXT_FILE_UPLOAD, fileDetail.FileName);
            });

            result.GalleryVideoText.ForEach(async fileDetail =>
            {
                fileDetail.FullPath = await _storageService.GetFullPath(UploadFileType.GALLERY_MEDIA_FILE_UPLOAD, fileDetail.FileName);
            });

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("GalleryUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<GalleryUpsertDto>> GalleryUpsert()
        {
            GalleryUpsertDto galleryUpsertDto = JsonConvert.DeserializeObject<GalleryUpsertDto>(Request.Form["galleryDetail"], new TrimmingConverter());

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            if (galleryUpsertDto.ngbStartDate != null && galleryUpsertDto.ngbStartDate.day > 0)
            {
                galleryUpsertDto.StartDate = new DateTime(galleryUpsertDto.ngbStartDate.year,
                  galleryUpsertDto.ngbStartDate.month,
                  galleryUpsertDto.ngbStartDate.day);
            }

            IFormFileCollection files = Request.Form.Files;
            if (files?.Count > 0)
            {
                await ProcessGalleryTextFiles(files, galleryUpsertDto);
            }
            var result = await _galleryService.GalleryUpsert(galleryUpsertDto, userId);
            SendGalleryNotification(galleryUpsertDto);
            return Ok(result);

           
        }

        [HttpPost("UploadGalleryMediaChunk")]
        public async Task<IActionResult> UploadGalleryMediaChunk()
        {
            var fileChunk = Request.Form.Files["fileChunk"];
            var filename = Request.Form["filename"];
            var chunkIndex = JsonConvert.DeserializeObject<int>(Request.Form["chunkIndex"]);
            var totalChunks = JsonConvert.DeserializeObject<int>(Request.Form["totalChunks"]);

            string filePath = Path.Combine(GetUploadGalleryMediaFilesFolderPath(), $"{filename}.part{chunkIndex}");

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
            string filePath = Path.Combine(GetUploadGalleryMediaFilesFolderPath(), filename);

            using (var mergedFileStream = new FileStream(filePath, FileMode.Create))
            {
                for (int i = 0; i < totalChunks; i++)
                {
                    string chunkFilePath = Path.Combine(GetUploadGalleryMediaFilesFolderPath(), $"{filename}.part{i}");
                    using (var chunkStream = new FileStream(chunkFilePath, FileMode.Open))
                    {
                        await chunkStream.CopyToAsync(mergedFileStream);
                    }
                    System.IO.File.Delete(chunkFilePath);
                }
            }
        }

        private async Task ProcessGalleryTextFiles(IFormFileCollection files, GalleryUpsertDto galleryModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.GALLERY_TEXT_FILE_UPLOAD , file);
                    var currentGalleryTextFile = new GalleryFileDto
                    {
                        FileName = fileName,
                        FileType = 1
                    };
                    galleryModel.GalleryTextFileArray.Add(currentGalleryTextFile);
                }
            }
        }

        private async Task ProcessGalleryMediaFiles(IFormFileCollection files, GalleryUpsertDto galleryModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.GALLERY_MEDIA_FILE_UPLOAD, file);
                    var currentGalleryMediaFile = new GalleryMediaContentDto
                    {
                        FileName = fileName,
                        FileType = 2 // Assuming 2 represents media files
                    };
                    galleryModel.GalleryVideoText.Add(currentGalleryMediaFile);
                }
            }
        }

        private string GetUploadGalleryTextFilesFolderPath()
        {
            string folderName = "Uploads/gallery/textfiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            return newPath;
        }

        private string GetUploadGalleryMediaFilesFolderPath()
        {
            string folderName = "Uploads/gallery/mediafiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            return newPath;
        }

        [HttpDelete]
        [Route("GalleryDelete")]
        public async Task<ActionResult<int>> GalleryDelete(long galleryId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _galleryService.GalleryDelete(galleryId, userId));
        }

        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishGalleryParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishGalleryParticulars(PublishUnpublishGalleryDto publishRequest)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _galleryService.PublishUnpublishGalleryParticular(publishRequest, userId);
            GalleryUpsertDto galleryUpsertDto = new GalleryUpsertDto();
            galleryUpsertDto = await _galleryService.GallerySelect(publishRequest.GalleryId);
            SendGalleryNotification(galleryUpsertDto);
            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("GetGalleryFromRoleAppSelectList")]
        public async Task<ActionResult<CommonDropdownSelectListItemResponseDto>> GetGalleryFromRoleAppSelectList()
        {
            var fromSelectList = await _galleryService.GetGalleryFromRoleAppSelectList();
            return Ok(fromSelectList);
        }
        public async void SendGalleryNotification(GalleryUpsertDto GalleryUpsertDto)
        {
            // send notification
            if (GalleryUpsertDto.IsPublished == true)
            {
                try
                {
                    if (GalleryUpsertDto.GalleryToType == 2 && GalleryUpsertDto.ClassId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        List<Task<string>> tasks = new List<Task<string>>();
                        foreach (var item in GalleryUpsertDto.ClassId)
                        {
                            tasks.Add(sendForSelectClass(GalleryUpsertDto.GalleryTitle, (int)item));
                        }
                        string[] results = await Task.WhenAll(tasks);
                    }
                    else if (GalleryUpsertDto.GalleryToType == 1 && GalleryUpsertDto.StudentId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, string.Join(",", GalleryUpsertDto.StudentId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", GalleryUpsertDto.GalleryTitle);
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
                    else if (GalleryUpsertDto.GalleryToType == 3 && GalleryUpsertDto.TeacherId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(3, 0, 0, 0, "", string.Join(",", GalleryUpsertDto.TeacherId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", GalleryUpsertDto.GalleryTitle);
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
                    else if (GalleryUpsertDto.GalleryToType == 4 && GalleryUpsertDto.ClerkId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(4, 0, 0, 0, "", "", string.Join(",", GalleryUpsertDto.ClerkId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", GalleryUpsertDto.GalleryTitle);
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
                    else if (GalleryUpsertDto.GalleryToType == 5 && GalleryUpsertDto.CabDriverId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(6, 0, 0, 0, "", "", "", string.Join(",", GalleryUpsertDto.CabDriverId));
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", GalleryUpsertDto.GalleryTitle);

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
        }
        public async Task<string> sendForSelectClass(string title, int classId)
        {
            var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, classId);
            List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
            allFCMUsers.ForEach(user =>
            {
                try
                {
                    var messageTitle = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Title"];
                    var messageBody = _config["FirebaseSetting:MessageTemplates:Gallery_Template:Body"];
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

        #region Parent App APIS
        [Authorize]
        [HttpPost]
        [Route("GetAllGalleryForStudent")]
        public async Task<ActionResult<ParentAppGalleryResponseDto>> GetAllGalleryForStudent(ParentAppGalleryRequestDto requestDto)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            requestDto.AcademicYearId = (int)schoolDetail.AcademicYearId;

            var lstGallery = await _galleryService.GetAllGalleryForStudent(requestDto);

            foreach (var gallery in lstGallery.GalleryList)
            {
                foreach (var galleryDetail in gallery.LstGalleryDetail)
                {
                    galleryDetail.FullPath = await _storageService.GetFullPath(UploadFileType.GALLERY_TEXT_FILE_UPLOAD, galleryDetail.FileName);
                }

                foreach (var galleryMedia in gallery.LstGalleryMediaDetail)
                {
                    galleryMedia.FullPath = await _storageService.GetFullPath(UploadFileType.GALLERY_MEDIA_FILE_UPLOAD, galleryMedia.FileName);
                }
            }

            return Ok(lstGallery);
        }

    }
    #endregion

}
