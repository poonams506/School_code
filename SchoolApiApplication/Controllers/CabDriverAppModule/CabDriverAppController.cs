using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.CadDriverAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.Helper.Interfaces;
using SchoolApiApplication.DTO.CadDriverAppModule;
using SchoolApiApplication.Common;
using Newtonsoft.Json;
using System.Security.Claims;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.BusinessLayer.Services.UserModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.Controllers.CabDriverAppModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class CabDriverAppController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ICabDriverProfileService _cabDriverProfileService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private IWebHostEnvironment _hostingEnvironment;
        private readonly ICommonAppService _commonAppService;
        private readonly IStorageService _storageService;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;

        public CabDriverAppController(IWebHostEnvironment hostingEnvironment, 
           IHttpContextAccessor httpContextAccessor, ICabDriverProfileService cabDriverProfileService,
           IEmailSender emailSender, ICommonAppService commonAppService,
           IStorageService storageService,
             IConfiguration config, IUserService userService,
            IFirebaseNotificationSender firebaseNotificationSender
            )
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _cabDriverProfileService = cabDriverProfileService;
            _emailSender = emailSender;
            _commonAppService = commonAppService;
            _storageService = storageService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            
        }
        [Authorize]
        [HttpPost]
        [Route("CabDrverProfileUpdate")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> CabDrverProfileUpdate()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                CabDriverProfileAppDto cabDriverProfileAppDtoObj = JsonConvert.DeserializeObject<CabDriverProfileAppDto>(Request.Form["cabDriverProfile"], new TrimmingConverter());

                if (Request.HasFormContentType && Request.Form != null)
                {
                    IFormFileCollection files = Request.Form.Files;
                    if (files?.Count() > 0)
                    {
                        await ProcessTeacherProfileImage(files, cabDriverProfileAppDtoObj);
                    }
                }


                return Ok(await _cabDriverProfileService.CabDriverProfileUpdate(cabDriverProfileAppDtoObj, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        [Authorize]
        [HttpGet("GetCabDriverProfile")]
        public async Task<ActionResult<CabDriverProfileAppDto>> GetCabDriverAppProfile(long CabDriverId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _cabDriverProfileService.GetCabDriverProfile(CabDriverId);
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
                }
                else
                {
                    result = new CabDriverProfileAppDto() { };
                }

                return Ok(result);
            }
            return Ok(await Task.FromResult(new CabDriverProfileAppDto()));
        }
        private async Task ProcessTeacherProfileImage(IFormFileCollection files, CabDriverProfileAppDto cabDriverProfileAppDtoObj)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    cabDriverProfileAppDtoObj.ProfileImageURL = await _storageService.UploadFileAsync(UploadFileType.CAB_DRIVER_UPLOAD, file);
                }
            }
        }

        [Authorize]
        [HttpGet]
        [Route("GetCabDriverAppRouteSelect")]

        public async Task<ActionResult<CabDriverRouteListDto>> GetCabDriverAppRoute(long CabDriverId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                var result = await _cabDriverProfileService.GetCabDriverAppRoute(schoolDetail.AcademicYearId, CabDriverId);

                return Ok(result);
            }
            return Ok(await Task.FromResult(new CabDriverRouteListDto()));

        }

        [Authorize]
        [HttpGet]
        [Route("GetCabDriverAppStoppageStudentSelect")]

        public async Task<ActionResult<CabdriverAppStoppageStudentDto>> GetCabDriverAppStoppageStudent(long? RouteId, string TripType)
        {
            
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                var result = await _cabDriverProfileService.GetCabDriverAppStoppageStudent(schoolDetail.AcademicYearId, RouteId, TripType);
                return Ok(result);
            

        }
        private async Task ProcessCabDriverProfileImage(IFormFileCollection files, CabDriverProfileAppDto cabDriverProfileAppDtoObj)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    cabDriverProfileAppDtoObj.ProfileImageURL = await _storageService.UploadFileAsync(UploadFileType.CAB_DRIVER_UPLOAD, file);
                }
            }
        }

        [Authorize]
        [HttpPost]
        [Route("CabDriverTripUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> CabDriverTripUpsert(CabDriverTripDto Trip)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
           // return Ok(await _cabDriverProfileService.CabDriverTripUpsert(Trip, userId));

            var result = await _cabDriverProfileService.CabDriverTripUpsert(Trip, userId);
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            await  SendStudenttripNotification(Trip, schoolDetail.AcademicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("CabDriverTripDetailUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> CabDriverTripDetailUpsert(CabDriverAppTripDetailsDto TripDetail)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result =  await _cabDriverProfileService.CabDriverTripDetailUpsert(TripDetail, userId);
            await SendStudentTripNotification(TripDetail);
            return Ok(result);
            
        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentSelect")]

        public async Task<ActionResult<StudentInformationDto>> GetStudent( string QRCode)
        {
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                var result = await _cabDriverProfileService.GetStudent(schoolDetail.AcademicYearId, QRCode);
                return Ok(result);

        }

        [Authorize]
        [HttpPost]
        [Route("UpdateCabDriverLocationByTrip")]
        public async Task<ActionResult<int>> UpdateCabDriverLocationByTrip(CabDriverLocationDto currentLocation)
        {
            var result = await _cabDriverProfileService.UpdateCabDriverLocationByTrip(currentLocation);
            return Ok(result);
        }
        private async Task<bool> SendStudentTripNotification(CabDriverAppTripDetailsDto cabDriverAppTripDetailsDto)
        {
            
                try
                {

                    if (cabDriverAppTripDetailsDto.TripType == "PickUp" && cabDriverAppTripDetailsDto.StudentId>0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, cabDriverAppTripDetailsDto.StudentId.ToString());
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:StudentPickUp_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:StudentPickUp_Template:Body"];

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
                  else if (cabDriverAppTripDetailsDto.TripType == "Drop" && cabDriverAppTripDetailsDto.StudentId> 0)
                  {
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0,  cabDriverAppTripDetailsDto.StudentId.ToString());
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:StudentDrop_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:StudentDrop_Template:Body"];

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
            return await Task.FromResult(new bool());
        }

        private async Task<bool> SendStudenttripNotification(CabDriverTripDto cabDriverTripDto,int AcademicYearId)
        {

            try
            {
                if (cabDriverTripDto.TripType == "PickUp")
                {
                    var result = await _cabDriverProfileService.GetCabDriverAppStoppageStudent(AcademicYearId, cabDriverTripDto.RouteId, cabDriverTripDto.TripType);
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, string.Join(",", result.CabDriverStudentList.Select(x => x.StudentId).ToList()));
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:CabdriverTrip_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:CabdriverTrip_Template:Body"];

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
                else if (cabDriverTripDto.TripType == "Drop" )
                {
                    var result = await _cabDriverProfileService.GetStudentList(cabDriverTripDto.TripId);
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, string.Join(",", result.NotificationStudentList.Select(x => x.StudentId).ToList()));
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:CabdriverTripDrop_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:CabdriverTripDrop_Template:Body"];

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
                else if (cabDriverTripDto.IsTripEnd==true)
                {
                    var result = await _cabDriverProfileService.GetCabDriverAppStoppageStudent(AcademicYearId, cabDriverTripDto.RouteId, cabDriverTripDto.TripType);
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, string.Join(",", result.CabDriverStudentList.Select(x => x.StudentId).ToList()));
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:StudentDrop_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:StudentDrop_Template:Body"];

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
            return await Task.FromResult(new bool());
        }

        

        [Authorize]
        [HttpGet]
        [Route("GetStudentList")]

        public async Task<ActionResult<CabDriverTripNotificationResponceDto>> GetStudentList(long TripId)
        {

            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _cabDriverProfileService.GetStudentList(TripId);
            return Ok(result);

        }

        [Authorize]
        [HttpPost]
        [Route("GetActivetripSelect")]

        public async Task<ActionResult<CabDriverActiveTripDto>> GetActivetripSelect(CabDriverActiveTripRequestDto requestDto)
        {
           var result = await _cabDriverProfileService.GetActivetripSelect(requestDto);
            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("GetCurrentActiveTripId")]
        public async Task<ActionResult<CabDriverActiveTripDto>> GetCurrentActiveTripId(int CabDriverUserId)
        {
            var result =await _cabDriverProfileService.GetCurrentActiveTripId(CabDriverUserId);
            return Ok(result);
        }
    }
}
