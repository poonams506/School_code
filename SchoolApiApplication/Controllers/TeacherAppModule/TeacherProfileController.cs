using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.HomeworkModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SubjectMasterModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeacherAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MobileAppModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.TeacherAppModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.DTO.TeacherOneDayLectureModule;
using SchoolApiApplication.Helper.Implementations;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.TeacherAppModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherProfileController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ITeacherProfileService _teacherProfileService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private IWebHostEnvironment _hostingEnvironment;
        private readonly ICommonAppService _commonAppService;
        private readonly IStorageService _storageService;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly ISubjectMasterService _subjectMasterService;
        private readonly IHomeworkService _homeworkService;


        public TeacherProfileController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, ITeacherProfileService teacherProfileService,
             IUserService userService, IFirebaseNotificationSender firebaseNotificationSender,
            IEmailSender emailSender, ICommonAppService commonAppService, ISubjectMasterService subjectMasterService,
            IStorageService storageService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _teacherProfileService = teacherProfileService;
            _emailSender = emailSender;
            _commonAppService = commonAppService;
            _storageService = storageService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _subjectMasterService = subjectMasterService;
        }
        [Authorize]
        [HttpPost]
        [Route("TeacherProfileUpdate")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> TeacherProfileUpdate()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                TeacherProfileDto TeacherProfileObj= JsonConvert.DeserializeObject<TeacherProfileDto>(Request.Form["teacherProfile"], new TrimmingConverter());

                if (Request.HasFormContentType && Request.Form !=null)
                {
                    IFormFileCollection files = Request.Form.Files;
                    if (files?.Count() > 0)
                    {
                        await ProcessTeacherProfileImage(files, TeacherProfileObj);
                    }
                }


                return Ok(await _teacherProfileService.TeacherProfileUpdate(TeacherProfileObj, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        [Authorize]
        [HttpGet("GetTeacherProfile")]
        public async Task<ActionResult<TeacherDto>> GetTeacherAppProfile(long TeacherId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _teacherProfileService.GetTeacherProfile(TeacherId);
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
        [Route("GetStudentAttendanceList")]
        public async Task<ActionResult<StudentAttendanceGridResponseDto>> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            requestDto.AcademicYearId = (short)schoolDetail.AcademicYearId;
            var studentAttendanceGridResponseDto = new StudentAttendanceGridResponseDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                if (requestDto.ngbAttendanceDate != null && requestDto.ngbAttendanceDate.day > 0)
                {
                    requestDto.AttendanceDate = new DateTime(requestDto.ngbAttendanceDate.year,
                                       requestDto.ngbAttendanceDate.month,
                                       requestDto.ngbAttendanceDate.day);
                }

                studentAttendanceGridResponseDto.StudentAttendancesList = await _teacherProfileService.GetStudentAttendanceGridList(requestDto);
                return Ok(studentAttendanceGridResponseDto);
            }
            return Ok(await Task.FromResult(new StudentAttendanceGridResponseDto()));
        }
        [Authorize]
        [HttpPost]
        [Route("GetStudentAttendanceUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto studentAttendanceUpsertDto)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                studentAttendanceUpsertDto.AcademicYearId = (short)schoolDetail.AcademicYearId;
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                if (studentAttendanceUpsertDto.ngbAttendanceDate != null && studentAttendanceUpsertDto.ngbAttendanceDate.day > 0)
                {
                    studentAttendanceUpsertDto.AttendanceDate = new DateTime(studentAttendanceUpsertDto.ngbAttendanceDate.year,
                     studentAttendanceUpsertDto.ngbAttendanceDate.month,
                     studentAttendanceUpsertDto.ngbAttendanceDate.day);
                }

                var result = await _teacherProfileService.GetStudentAttendanceUpsert(studentAttendanceUpsertDto, userId);
                SendAttendanceNotification(studentAttendanceUpsertDto);
                return Ok(result);

            }
            return Ok(await Task.FromResult(new long()));
        }
        private async void SendAttendanceNotification(StudentAttendanceUpsertDto StudentAttendanceUpsertDto)
        {

            try
            {
                var presentStudentList = StudentAttendanceUpsertDto.StudentAttendanceUpsertLists.Where(x => x.StatusId == 1).Select(x => x.StudentId).ToList();
                var absentStudentList = StudentAttendanceUpsertDto.StudentAttendanceUpsertLists.Where(x => x.StatusId == 3).Select(x => x.StudentId).ToList();

                if (presentStudentList.Count > 0)
                {
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, string.Join(",", presentStudentList));
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:Attendance_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:Attendance_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", "present");
                            messageBody = messageBody.Replace("{token2}", StudentAttendanceUpsertDto.AttendanceDate.ToString("dd/MM/yyyy"));

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

                else if (absentStudentList.Count > 0)
                {
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, "", string.Join(",", absentStudentList));
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:Attendance_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:Attendance_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", "absent");
                            messageBody = messageBody.Replace("{token2}", StudentAttendanceUpsertDto.AttendanceDate.ToString("dd/MM/yyyy"));


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
        private async Task ProcessTeacherProfileImage(IFormFileCollection files, TeacherProfileDto teacherProfileDto)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    teacherProfileDto.ProfileImageURL = await _storageService.UploadFileAsync(UploadFileType.TEACHER_UPLOAD, file);
                }
            }
        }

        [Authorize]
        [HttpPost]
        [Route("ClassTeacherGradeDivisionList")]
        public async Task<ActionResult<ClassTeacherGradeDivisionListDto>> ClassTeacherGradeDivisionList(int teacherId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var classTeacherGradeDivisionList   = await _teacherProfileService.ClassTeacherGradeDivisionList(teacherId, (int)schoolDetail.AcademicYearId);
            return Ok(classTeacherGradeDivisionList);
         }

        [Authorize]
        [HttpPost]
        [Route("GetSubjectDropdownByClassTeacher")]
        public async Task<ActionResult<TeacherClassSubjectResponseDto>> GetSubjectDropdownByClassTeacher(TeacherClassSubjectRequestDto RequestDto)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
           
                RequestDto.AcademicYearId = schoolDetail.AcademicYearId;
            
            var classSubjectList = await _teacherProfileService.GetSubjectDropdownByClassTeacher(RequestDto);
            return Ok(classSubjectList);
        }

        [Authorize]
        [HttpGet]
        [Route("GetSchoolBasicDetails")]
        public async Task<ActionResult<SchoolDetailMobileDto>> GetSchoolBasicDetails()
        {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                return Ok(schoolDetail);
            
           
        }

        [Authorize]
        [HttpPost]
        [Route("GetHomeworkList")]
        public async Task<ActionResult<HomeworkListDto>> GetHomeworkList(int month, int year)
        {
           
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var HomeworkList = await _teacherProfileService.GetHomeworkList(month, year, (int)schoolDetail.AcademicYearId, userId);
                return Ok(HomeworkList);
        }

        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishHomeworkParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishHomeworkParticulars(PublishUnpublishHomeworkDto publishRequest)
        {
            
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _teacherProfileService.PublishUnpublishHomeworkParticular(publishRequest, userId);
            // send notification
            HomeworkUpsertDto homeworkUpsertDto = new HomeworkUpsertDto();
            homeworkUpsertDto = await _teacherProfileService.HomeWorkSelect(publishRequest.HomeworkId);
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
                            var messageBody = _config["FirebaseSetting:MessageTemplates:Homework_Template:Body"];
                            messageBody = messageBody.Replace("{token1}", homeworkUpsertDto.SubjectName);
                            messageBody = messageBody.Replace("{token2}", homeworkUpsertDto.HomeworkTitle);


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

        [Authorize]
        [HttpGet("HomeworkSelect")]
        public async Task<ActionResult<HomeworkUpsertDto>> HomeworkSelect(long HomeworkId)
        {

            var result = await _teacherProfileService.HomeWorkSelect(HomeworkId);
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
        [HttpDelete]
        [Route("HomeWorkDelete")]
        public async Task<ActionResult<int>> HomeWorkDelete(long homeworkId)
        {
            return Ok(await _teacherProfileService.HomeWorkDelete(homeworkId));
        }

        [Authorize]
        [HttpPost]
        [Route("HomeworkUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<HomeworkUpsertDto>> HomeworkUpsert()
        {
            HomeworkUpsertDto HomeworkUpsertDto = JsonConvert.DeserializeObject<HomeworkUpsertDto>(Request.Form["homeworkDetail"], new TrimmingConverter());
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            HomeworkUpsertDto.AcademicYearId = schoolDetail.AcademicYearId;

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
            var result = await _teacherProfileService.HomeWorkUpsert(HomeworkUpsertDto, userId);
            // send notification
            if (HomeworkUpsertDto.IsPublished == true)
            {
                var subjectDeatils= await _subjectMasterService.GetSubjectMaster(HomeworkUpsertDto.SubjectId);
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
            return Ok(result);

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

        private async Task ProcessHomeworkMediaFiles(IFormFileCollection files, HomeworkUpsertDto homeworkModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.HOMEWORK_MEDIA_FILE_UPLOAD, file);
                    var currentHomeworkMediaFile = new HomeworkMediaContentDto
                    {
                        FileName = fileName,
                        FileType = 2 // Assuming 2 represents media files
                    };
                    homeworkModel.MediaVideoText.Add(currentHomeworkMediaFile);
                }
            }
        }


        [Authorize]
        [HttpGet("NoticeSelect")]
        public async Task<ActionResult<NoticeUpsertDto>> NoticeSelect(long NoticeId)
        {

            var result = await _teacherProfileService.NoticeSelect(NoticeId);


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

            // Update FullPath

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
        [Route("PublishUnpublishNoticeParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishNoticeParticulars(PublishUnpublishNoticeDto publishRequest)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _teacherProfileService.PublishUnpublishNoticeParticular(publishRequest, userId);
            NoticeUpsertDto noticeUpsertDto = new NoticeUpsertDto();
            noticeUpsertDto = await _teacherProfileService.NoticeSelect(publishRequest.NoticeId);
            await SendNoticeNotification(noticeUpsertDto);
            return Ok(result);

        }

        [HttpDelete]
        [Route("NoticeDelete")]
        public async Task<ActionResult<int>> NoticeDelete(long noticeId)
        {
            return Ok(await _teacherProfileService.NoticeDelete(noticeId));
        }

        [Authorize]
        [HttpPost]
        [Route("GetNoticeList")]
        public async Task<ActionResult<NoticeListDto>> GetNoticeList(byte NoticeTypeId, int RefId, int month, int year)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var NoticeList = await _teacherProfileService.GetNoticeList((int)schoolDetail.AcademicYearId, NoticeTypeId, RefId, month, year);
                return Ok(NoticeList);
            }
            return Ok(await Task.FromResult(new NoticeListDto()));
        }

      
        [Authorize]
        [HttpPost]
        [Route("NoticeUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<NoticeUpsertDto>> NoticeUpsert()
        {
            NoticeUpsertDto NoticeUpsertDto = JsonConvert.DeserializeObject<NoticeUpsertDto>(Request.Form["noticeDetail"], new TrimmingConverter());
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            NoticeUpsertDto.AcademicYearId = schoolDetail.AcademicYearId;
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
                await ProcessNoticeTextfiles(files, NoticeUpsertDto);
            }
            var result = await _teacherProfileService.NoticeUpsert(NoticeUpsertDto, userId);
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
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(3, 0, 0, 0, string.Join(",", NoticeUpsertDto.teacherId));
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
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(4, 0, 0, 0, string.Join(",", NoticeUpsertDto.clerkId));
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
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(6, 0, 0, 0, string.Join(",", NoticeUpsertDto.cabDriverId));
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

            // Process the notice media details to get full paths
            foreach (var noticeMedia in noticeModel.VideoText)
            {
                noticeMedia.FullPath = await _storageService.GetFullPath(UploadFileType.NOTICE_MEDIA_FILE_UPLOAD, noticeMedia.FileName);
            }

        }
       

        [Authorize]
        [HttpGet("GallerySelect")]
        public async Task<ActionResult<GalleryUpsertDto>> GallerySelect(long GalleryId)
        {

            var result = await _teacherProfileService.GallerySelect(GalleryId);


            if (result.StartDate != null && result.StartDate.Value.Day > 0)
            {
                result.ngbStartDate = new SchoolNgbDateModel
                {
                    year = result.StartDate.Value.Year,
                    month = result.StartDate.Value.Month,
                    day = result.StartDate.Value.Day
                };
            }
          

            // Update FullPath

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
        [Route("PublishUnpublishGalleryParticular")]
        public async Task<ActionResult<int>> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _teacherProfileService.PublishUnpublishGalleryParticular(publishRequest, userId);

            GalleryUpsertDto galleryUpsertDto = new GalleryUpsertDto();
            galleryUpsertDto = await _teacherProfileService.GallerySelect(publishRequest.GalleryId);
            await SendGalleryNotification(galleryUpsertDto);
            return Ok(result);
        }

        [HttpDelete]
        [Route("GalleryDelete")]
        public async Task<ActionResult<int>> GalleryDelete(long GalleryId)
        {
            return Ok(await _teacherProfileService.GalleryDelete(GalleryId));
        }

        [Authorize]
        [HttpPost]
        [Route("GetGalleryGridList")]
        public async Task<ActionResult<GalleryListDto>> GetGalleryGridList(byte GalleryTypeId, int RefId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var GalleryList = await _teacherProfileService.GetGalleryGridList((int)schoolDetail.AcademicYearId, GalleryTypeId, RefId);
                return Ok(GalleryList);
            }
            return Ok(await Task.FromResult(new GalleryListDto()));
        }


        [Authorize]
        [HttpPost]
        [Route("GalleryUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<GalleryUpsertDto>> GalleryUpsert()
        {
            GalleryUpsertDto GalleryUpsertDto = JsonConvert.DeserializeObject<GalleryUpsertDto>(Request.Form["galleryDetail"], new TrimmingConverter());
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            GalleryUpsertDto.AcademicYearId = schoolDetail.AcademicYearId;
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            if (GalleryUpsertDto.ngbStartDate != null && GalleryUpsertDto.ngbStartDate.day > 0)
            {
                GalleryUpsertDto.StartDate = new DateTime(GalleryUpsertDto.ngbStartDate.year,
                 GalleryUpsertDto.ngbStartDate.month,
                 GalleryUpsertDto.ngbStartDate.day);
            }
    
            IFormFileCollection files = Request.Form.Files;
            if (files?.Count > 0)
            {
                await ProcessGalleryTextfiles(files, GalleryUpsertDto);
            }
            var result = await _teacherProfileService.GalleryUpsert(GalleryUpsertDto, userId);
            await SendGalleryNotification(GalleryUpsertDto);
            return Ok(result);
        }

        private async Task ProcessGalleryTextfiles(IFormFileCollection files, GalleryUpsertDto galleryModel)
        {
            foreach (var file in files)
            {

                if (file.Length > 0)
                {
                    string fileName = await _storageService.UploadFileAsync(UploadFileType.GALLERY_TEXT_FILE_UPLOAD, file);
                    var currentGalleryMediaFile = new GalleryFileDto
                    {
                        FileName = fileName,
                        FileType = 1
                    };
                    galleryModel.GalleryTextFileArray.Add(currentGalleryMediaFile);
                }
            }

            // Process the notice media details to get full paths
            foreach (var galleryMedia in galleryModel.GalleryVideoText)
            {
                galleryMedia.FullPath = await _storageService.GetFullPath(UploadFileType.GALLERY_MEDIA_FILE_UPLOAD, galleryMedia.FileName);
            }

        }
        private async Task<bool> SendGalleryNotification(GalleryUpsertDto GalleryUpsertDto)
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
            return await Task.FromResult(new bool());
        }
        private async Task<string> sendForSelectClass(string title, int classId)
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

        [HttpGet]
        [Route("StudentTeacherAppSelect")]
        public async Task<ActionResult<StudentTeacherAppResponseDto>> StudentTeacherAppSelect(int AcademicYearId, int GradeId, int DivisionId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _teacherProfileService.StudentTeacherAppSelect((int)schoolDetail.AcademicYearId, GradeId, DivisionId);
            result.StudentTeacherAppList.ForEach(async fileDetail =>
            {
                if(!string.IsNullOrEmpty( fileDetail.ProfileImageURL))
                fileDetail.ProfileImageURL = await _storageService.GetFullPath(UploadFileType.STUDENT_UPLOAD, fileDetail.ProfileImageURL);
            });
            return Ok(result);          
        }

        [Authorize]
        [HttpGet]
        [Route("ClassMissingAttendanceReport")]
        public async Task<ActionResult<ClassAttendanceMissingReportResponseDto>> ClassAttendanceMissingReport(int teacherId, int Month, int Year)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _teacherProfileService.ClassAttendanceMissingReport((int)schoolDetail.AcademicYearId, teacherId, Month, Year);
            foreach (var classAttendance in result.ClassAttendanceMissingList)
            {
                if (classAttendance.AttendanceMissingDate.HasValue && classAttendance.AttendanceMissingDate.Value.Day > 0)
                {
                    classAttendance.ngbAttendanceMissingDate = new SchoolNgbDateModel
                    {
                        year = classAttendance.AttendanceMissingDate.Value.Year,
                        month = classAttendance.AttendanceMissingDate.Value.Month,
                        day = classAttendance.AttendanceMissingDate.Value.Day
                    };
                }
            }



            return Ok(result);

        }

        [HttpGet]
        [Route("TeacherOneDayLectureSelect")]

        public async Task<ActionResult<TeacherOneDayLectureResponseDto>> TeacherOneDayLectureSelect(int TeacherId, int DayNo)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _teacherProfileService.TeacherOneDayLectureSelect((int)schoolDetail.AcademicYearId, TeacherId, DayNo);

            return Ok(result);
        }

        [HttpGet]
        [Route("SchoolMonthEvent")]

        public async Task<ActionResult<SchoolMonthEventResponseDto>> SchoolMonthEventStaffSelect()
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _teacherProfileService.SchoolMonthEventStaffSelect((int)schoolDetail.AcademicYearId);
            foreach (var schoolEvent in result.SchoolMonthEventList)
            {
                foreach (var eventDetail in schoolEvent.LstEventDetail)
                {
                    eventDetail.FullPath = await _storageService.GetFullPath(UploadFileType.SCHOOL_UPLOAD, eventDetail.FileName);

                }
                if (schoolEvent.StartDate != null && schoolEvent.StartDate.Value.Day > 0)
                {
                    schoolEvent.ngbStartDate = new SchoolNgbDateModel
                    {
                        year = schoolEvent.StartDate.Value.Year,
                        month = schoolEvent.StartDate.Value.Month,
                        day = schoolEvent.StartDate.Value.Day
                    };
                }
                if (schoolEvent.EndDate != null && schoolEvent.EndDate.Value.Day > 0)
                {
                    schoolEvent.ngbEndDate = new SchoolNgbDateModel
                    {
                        year = schoolEvent.EndDate.Value.Year,
                        month = schoolEvent.EndDate.Value.Month,
                        day = schoolEvent.EndDate.Value.Day
                    };
                }
                if (schoolEvent.StartTime != null && schoolEvent.StartTime.Value.Hour > 0)
                {
                    schoolEvent.ngbStartTime = new SchoolNgbTimeModel
                    {
                        hour = schoolEvent.StartTime.Value.Hour,
                        minute = schoolEvent.StartTime.Value.Minute,
                        second = schoolEvent.StartTime.Value.Second
                    };
                }
                if (schoolEvent.EndTime != null && schoolEvent.EndTime.Value.Hour > 0)
                {
                    schoolEvent.ngbEndTime = new SchoolNgbTimeModel
                    {
                        hour = schoolEvent.EndTime.Value.Hour,
                        minute = schoolEvent.EndTime.Value.Minute,
                        second = schoolEvent.EndTime.Value.Second
                    };
                }
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("SchoolMonthEventParentSelect")]

        public async Task<ActionResult<SchoolMonthEventResponseDto>> SchoolMonthEventParentSelect(int GradeId, int DivisionId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _teacherProfileService.SchoolMonthEventParentSelect((int)schoolDetail.AcademicYearId, GradeId, DivisionId);
            foreach (var schoolParentsEvent in result.SchoolMonthEventList)
            {
                foreach (var eventDetail in schoolParentsEvent.LstEventDetail)
                {
                    eventDetail.FullPath = await _storageService.GetFullPath(UploadFileType.SCHOOL_UPLOAD, eventDetail.FileName);

                }
                if (schoolParentsEvent.StartDate != null && schoolParentsEvent.StartDate.Value.Day > 0)
                {
                    schoolParentsEvent.ngbStartDate = new SchoolNgbDateModel
                    {
                        year = schoolParentsEvent.StartDate.Value.Year,
                        month = schoolParentsEvent.StartDate.Value.Month,
                        day = schoolParentsEvent.StartDate.Value.Day
                    };
                }
                if (schoolParentsEvent.EndDate != null && schoolParentsEvent.EndDate.Value.Day > 0)
                {
                    schoolParentsEvent.ngbEndDate = new SchoolNgbDateModel
                    {
                        year = schoolParentsEvent.EndDate.Value.Year,
                        month = schoolParentsEvent.EndDate.Value.Month,
                        day = schoolParentsEvent.EndDate.Value.Day
                    };
                }
                if (schoolParentsEvent.StartTime != null && schoolParentsEvent.StartTime.Value.Hour > 0)
                {
                    schoolParentsEvent.ngbStartTime = new SchoolNgbTimeModel
                    {
                        hour = schoolParentsEvent.StartTime.Value.Hour,
                        minute = schoolParentsEvent.StartTime.Value.Minute,
                        second = schoolParentsEvent.StartTime.Value.Second
                    };
                }
                if (schoolParentsEvent.EndTime != null && schoolParentsEvent.EndTime.Value.Hour > 0)
                {
                    schoolParentsEvent.ngbEndTime = new SchoolNgbTimeModel
                    {
                        hour = schoolParentsEvent.EndTime.Value.Hour,
                        minute = schoolParentsEvent.EndTime.Value.Minute,
                        second = schoolParentsEvent.EndTime.Value.Second
                    };
                }
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("GetTeacherAttendanceHoliday")]
        public async Task<ActionResult<TeacherAttendanceHolidayResponseDto>> GetTeacherAttendanceHoliday()
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result= await _teacherProfileService.GetTeacherAttendanceHoliday(schoolDetail.AcademicYearId);
            return Ok(result);
        }

    }
} 