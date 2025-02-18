using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.HomeworkModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMasterModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.BusinessLayer.Services.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Services.UserModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.Helper.Implementations;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;

namespace SchoolApiApplication.Controllers.HomeworkModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeworkController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IHomeworkService _homeworkService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly IUserService _userService;
        private readonly ISubjectMasterService _subjectMasterService;

        public HomeworkController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHomeworkService homeworkService, ICommonAppService commonAppService, IUserService userService,
            IStorageService storageService, IFirebaseNotificationSender firebaseNotificationSender, ISubjectMasterService subjectMasterService)
        {
            _hostingEnvironment = hostingEnvironment;
            _homeworkService = homeworkService;
            _storageService = storageService;
            _commonAppService = commonAppService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
            _subjectMasterService = subjectMasterService;
        }

        [HttpPost]
        [Route("GetHomeworkGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetHomeworkGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var HomeworkList = await _homeworkService.GetHomeworkGridList(requestObjectWrapper, userId);
            return Ok(HomeworkList);
        }

        [Authorize]
        [HttpGet("HomeworkSelect")]
        public async Task<ActionResult<HomeworkUpsertDto>> HomeworkSelect(long HomeworkId)
        {
            var result = await _homeworkService.HomeWorkSelect(HomeworkId);
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

            result.HomeworkTextFileArray.ForEach(async fileDetail =>
            {
                fileDetail.FullPath = await _storageService.GetFullPath(UploadFileType.HOMEWORK_TEXT_FILE_UPLOAD, fileDetail.FileName);
            });

            result.MediaVideoText.ForEach(async fileDetail =>
            {
                fileDetail.FullPath = await _storageService.GetFullPath(UploadFileType.HOMEWORK_MEDIA_FILE_UPLOAD, fileDetail.FileName);
            });

            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("HomeworkUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<HomeworkUpsertDto>> HomeworkUpsert()
        {
            HomeworkUpsertDto HomeworkUpsertDto = JsonConvert.DeserializeObject<HomeworkUpsertDto>(Request.Form["homeworkDetail"], new TrimmingConverter());

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            if (HomeworkUpsertDto.ngbStartDate != null && HomeworkUpsertDto.ngbStartDate.day > 0)
            {
                HomeworkUpsertDto.StartDate = new DateTime(HomeworkUpsertDto.ngbStartDate.year,
                    HomeworkUpsertDto.ngbStartDate.month,
                    HomeworkUpsertDto.ngbStartDate.day);
            }

            if (HomeworkUpsertDto.ngbEndDate != null && HomeworkUpsertDto.ngbEndDate.day > 0)
            {
                HomeworkUpsertDto.EndDate = new DateTime(HomeworkUpsertDto.ngbEndDate.year,
                    HomeworkUpsertDto.ngbEndDate.month,
                    HomeworkUpsertDto.ngbEndDate.day);
            }

            IFormFileCollection files = Request.Form.Files;
            if (files?.Count > 0)
            {
                await ProcessHomeworkTextfiles(files, HomeworkUpsertDto);
            }
            var upsertResult = await _homeworkService.HomeWorkUpsert(HomeworkUpsertDto, userId);

            // send notification
            if(HomeworkUpsertDto.IsPublished == true)
            {
                var subjectDeatils = await _subjectMasterService.GetSubjectMaster(HomeworkUpsertDto.SubjectId);
                try
                {
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, (int)HomeworkUpsertDto.ClassId);
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:Homework_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:Homework_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", subjectDeatils.SubjectName);
                            messageBody = messageBody.Replace("{token2}", HomeworkUpsertDto.HomeworkTitle);

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
                catch (Exception)
                {

                }
            }
            
            return Ok(upsertResult);

            //
        }

        [HttpPost("UploadHomeworkMediaChunk")]
        public async Task<IActionResult> UploadHomeworkMediaChunk()
        {
            var fileChunk = Request.Form.Files["fileChunk"];
            var filename = Request.Form["filename"];
            var chunkIndex = JsonConvert.DeserializeObject<int>(Request.Form["chunkIndex"]);
            var totalChunks = JsonConvert.DeserializeObject<int>(Request.Form["totalChunks"]);
            string filePath = Path.Combine(GetUploadHomeworkMediafilesFolderPath(), $"{filename}.part{chunkIndex}");

            if (fileChunk != null)
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await fileChunk.CopyToAsync(fileStream);
                }

                if (chunkIndex == totalChunks - 1)
                {
                    await MergeChunks(filename, totalChunks);
                }
            }

            return Ok();
        }

        private async Task MergeChunks(string filename, int totalChunks)
        {
            string filePath = Path.Combine(GetUploadHomeworkMediafilesFolderPath(), filename);

            using (var mergedFileStream = new FileStream(filePath, FileMode.Create))
            {
                for (int i = 0; i < totalChunks; i++)
                {
                    string chunkFilePath = Path.Combine(GetUploadHomeworkMediafilesFolderPath(), $"{filename}.part{i}");
                    using (var chunkStream = new FileStream(chunkFilePath, FileMode.Open))
                    {
                        await chunkStream.CopyToAsync(mergedFileStream);
                    }
                    System.IO.File.Delete(chunkFilePath);
                }
            }
        }

        private async Task ProcessHomeworkTextfiles(IFormFileCollection files, HomeworkUpsertDto homeworkModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.HOMEWORK_TEXT_FILE_UPLOAD, file);
                    var currentHomeworkMediaFile = new HomeworkFileDto
                    {
                        FileName = fileName,
                        FileType = 1
                    };
                    homeworkModel.HomeworkTextFileArray.Add(currentHomeworkMediaFile);
                }
            }
        }

        private async Task ProcessNoticeMediaFiles(IFormFileCollection files, HomeworkUpsertDto homeworkModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.NOTICE_MEDIA_FILE_UPLOAD, file);
                    var currentHomeworkMediaFile = new HomeworkMediaContentDto
                    {
                        FileName = fileName,
                        FileType = 2 // Assuming 2 represents media files
                    };
                    homeworkModel.MediaVideoText.Add(currentHomeworkMediaFile);
                }
            }
        }

        private string GetUploadHomeworkTextfilesFolderPath()
        {
            string folderName = "Uploads/homework/textfiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);

            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }

            return newPath;
        }

        private string GetUploadHomeworkMediafilesFolderPath()
        {
            string folderName = "Uploads/homework/mediafiles";
            string webRootPath = _hostingEnvironment.WebRootPath;
            var newPath = Path.Combine(webRootPath, folderName);

            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }

            return newPath;
        }

        [HttpDelete]
        [Route("HomeWorkDelete")]
        public async Task<ActionResult<int>> HomeWorkDelete(long homeworkId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _homeworkService.HomeWorkDelete(homeworkId, userId));
        }

        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishHomeworkParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishHomeworkParticulars(PublishUnpublishHomeworkDto publishRequest)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _homeworkService.PublishUnpublishHomeworkParticular(publishRequest, userId);
            // send notification
            HomeworkUpsertDto homeworkUpsertDto = new HomeworkUpsertDto();
            homeworkUpsertDto  = await _homeworkService.HomeWorkSelect(publishRequest.HomeworkId);
            if (homeworkUpsertDto.IsPublished == true)
            {
                try
                {
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, (int)homeworkUpsertDto.ClassId);
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:Homework_Template:Title"];
                            messageTitle = messageTitle.Replace("{token1}", homeworkUpsertDto.HomeworkTitle);
                            var messageBody = _config["FirebaseSetting:MessageTemplates:Homework_Template:Body"];
                            messageBody = messageBody.Replace("{token2}", homeworkUpsertDto.HomeworkDescription);

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
                catch (Exception)
                {

                }
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("GetSubjectMappingDropdown")]
        public async Task<ActionResult<SubjectMappingDropdownResponseDto>> GetSubjectMappingDropdown(short AcademicYearId, short GradeId, short DivisionId)
        {
            var result = await _homeworkService.GetSubjectMappingDropdown(AcademicYearId, GradeId, DivisionId);
            return Ok(result);
        }

        #region Parent APP APIS

        //[HttpPost]
        //[Authorize]
        //[Route("GetAllHomeworkForStudent")]
        //public async Task<ActionResult<ParentAppHomeworkResponseDto>> GetAllHomeworkForStudent(ParentAppHomeworkRequestDto requestDto)
        //{
        //    var schoolDetail = await _commonAppService.GetSchoolDetail();
        //    requestDto.AcademicYearId = (int)schoolDetail.AcademicYearId;
        //    var lstHomework = await _homeworkService.GetAllHomeworkForStudent(requestDto);
        //    lstHomework.HomeworkList.ForEach(homework =>
        //    {
        //        homework.LstHomeworkDetail.ForEach(async homeworkDetail =>
        //        {
        //            homeworkDetail.FullPath = await _storageService.GetFullPath(UploadFileType.HOMEWORK_TEXT_FILE_UPLOAD, homeworkDetail.FileName);
        //        });
        //    });
        //    return Ok(lstHomework);
        //}

        [HttpPost]
        [Authorize]
        [Route("GetAllHomeworkForStudent")]
        public async Task<ActionResult<ParentAppHomeworkResponseDto>> GetAllHomeworkForStudent(ParentAppHomeworkRequestDto requestDto)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            requestDto.AcademicYearId = (int)schoolDetail.AcademicYearId;
            var lstHomework = await _homeworkService.GetAllHomeworkForStudent(requestDto);

            // Process homework details
            foreach (var homework in lstHomework.HomeworkList)
            {
                // Process homework text files
                foreach (var homeworkDetail in homework.LstHomeworkDetail)
                {
                    homeworkDetail.FullPath = await _storageService.GetFullPath(UploadFileType.HOMEWORK_TEXT_FILE_UPLOAD, homeworkDetail.FileName);
                }

                // Process homework media video/text files
                foreach (var mediaContent in homework.LstMediaVideoText)
                {
                    mediaContent.FullPath = await _storageService.GetFullPath(UploadFileType.HOMEWORK_MEDIA_FILE_UPLOAD, mediaContent.FileName);
                }
            }

            return Ok(lstHomework);
        }


        #endregion
    }
}
