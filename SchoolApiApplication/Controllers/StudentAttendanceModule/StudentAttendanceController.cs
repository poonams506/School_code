using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Numerics;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.StudentAttendanceModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAttendanceController : Controller
       
    {
        private readonly IStudentAttendanceService _studentAttendanceService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? UPLOAD_PATH;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;

        public StudentAttendanceController(IHttpContextAccessor httpContextAccessor, IStudentAttendanceService studentAttendanceService,
            IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender)
        {

            _httpContextAccessor = httpContextAccessor;
            _studentAttendanceService= studentAttendanceService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
        }
        [Authorize]
        [HttpPost]
        [Route("GetStudentAttendanceList")]
        public async Task<ActionResult<StudentAttendanceGridResponseDto>>GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto)
        {
            StudentAttendanceGridResponseDto studentAttendanceGridResponseDto = new StudentAttendanceGridResponseDto();
            if (_httpContextAccessor.HttpContext != null)
            {
                if (requestDto.ngbAttendanceDate != null && requestDto.ngbAttendanceDate.day > 0)
                {
                    requestDto.AttendanceDate = new DateTime(requestDto.ngbAttendanceDate.year,
                                       requestDto.ngbAttendanceDate.month,
                                       requestDto.ngbAttendanceDate.day);
                }
                   
                studentAttendanceGridResponseDto= await _studentAttendanceService.GetStudentAttendanceGridList(requestDto);
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
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                if (studentAttendanceUpsertDto.ngbAttendanceDate != null && studentAttendanceUpsertDto.ngbAttendanceDate.day > 0)
                {
                    studentAttendanceUpsertDto.AttendanceDate = new DateTime(studentAttendanceUpsertDto.ngbAttendanceDate.year,
                     studentAttendanceUpsertDto.ngbAttendanceDate.month,
                     studentAttendanceUpsertDto.ngbAttendanceDate.day);
                }

                var result = await _studentAttendanceService.GetStudentAttendanceUpsert(studentAttendanceUpsertDto, userId);
                await SendAttendanceNotification(studentAttendanceUpsertDto);
                 return Ok(result);

            }
            return Ok(await Task.FromResult(new long()));
        }
        public async Task<bool> SendAttendanceNotification(StudentAttendanceUpsertDto StudentAttendanceUpsertDto)
        {
          
            try
            {
                var presentStudentList = StudentAttendanceUpsertDto.StudentAttendanceUpsertLists.Where(x => x.StatusId == 1).Select(x=>x.StudentId).ToList();
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
            return await Task.FromResult(new bool());
        }


        [Authorize]
        [HttpGet]
        [Route("GetAllTeacherForDropDown")]
        public async Task<ActionResult<TeacherDropdownResponseDto>> GetAllTeacherForDropDown()
        {
            return Ok(await _studentAttendanceService.GetAllTeacherForDropDown());
        }


        [Authorize]
        [HttpGet]
        [Route("GetAttendanceDetailByStudentId")]
        public async Task<ActionResult<StudentAttendanceMobileResponseDto>> GetAttendanceDetailByStudentId(long StudentId,int AcademicYearId)
        {
            return Ok(await _studentAttendanceService.GetAttendanceDetailByStudentId(StudentId, AcademicYearId));
        }

    }
}
