using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentKitFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.StudentKitFeePaymentModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.StudentKitFeePaymentModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentKitFeePaymentController : ControllerBase
    {
        private readonly IStudentKitFeePaymentService _studentKitFeePaymentService;
        private readonly IStudentService _studentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? UPLOAD_PATH;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public StudentKitFeePaymentController(IHttpContextAccessor httpContextAccessor, IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender,
            IStudentKitFeePaymentService studentKitFeePaymentService, IStudentService studentService)
        {
            _httpContextAccessor = httpContextAccessor;
            _studentKitFeePaymentService = studentKitFeePaymentService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
            _studentService = studentService;
        }

        [Authorize]
        [HttpPost]
        [Route("GetStudentKitFeePaymentGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetStudentKitFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentKitfeePaymentList = await _studentKitFeePaymentService.GetStudentKitFeePaymentGridList(requestObjectWrapper);
                return Ok(studentKitfeePaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpPost]
        [Route("GetStudentKitFeePaymentDueByAYSelect")]
        public async Task<ActionResult<StudentKitFeePaymentDueByAYSelectResponseDto>> GetStudentKitFeePaymentDueByAYSelect(int studentId, bool currentAcademicYearInclude)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentKitfeePaymentList = await _studentKitFeePaymentService.GetStudentKitFeePaymentDueByAYSelect(studentId, currentAcademicYearInclude);
                return Ok(studentKitfeePaymentList);
            }
            return Ok(await Task.FromResult(new StudentKitFeePaymentDueByAYSelectResponseDto()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetStudentKitFeePaymentSelect")]
        public async Task<ActionResult<StudentKitFeepaymentSelectDto>> GetStudentKitFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentKitfeePayment = await _studentKitFeePaymentService.GetStudentKitFeePaymentSelect(academicYearId, studentId, GradeId, DivisionId);
                return Ok(studentKitfeePayment);
            }
            return Ok(await Task.FromResult(new StudentKitFeepaymentSelectDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("StudentKitFeePaymentUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> StudentKitFeePaymentUpsert(StudentKitFeepaymentUpsertDto feePaymentUpsertDto)
        {
        

            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                feePaymentUpsertDto.UserId = userId;
                if (feePaymentUpsertDto.ngbChequeDate != null && feePaymentUpsertDto.ngbChequeDate.day > 0)
                {
                    feePaymentUpsertDto.ChequeDate = new DateTime(feePaymentUpsertDto.ngbChequeDate.year,
                                        feePaymentUpsertDto.ngbChequeDate.month,
                                        feePaymentUpsertDto.ngbChequeDate.day);
                }
                if (feePaymentUpsertDto.ngbOnlineTransactionDateTime != null && feePaymentUpsertDto.ngbOnlineTransactionDateTime.day > 0)
                {
                    feePaymentUpsertDto.OnlineTransactionDateTime = new DateTime(feePaymentUpsertDto.ngbOnlineTransactionDateTime.year,
                                        feePaymentUpsertDto.ngbOnlineTransactionDateTime.month,
                                        feePaymentUpsertDto.ngbOnlineTransactionDateTime.day);
                }

                var result=await _studentKitFeePaymentService.StudentKitFeePaymentUpsert(feePaymentUpsertDto);
                try
                {
                    if (feePaymentUpsertDto.StudentId > 0)
                    {
                        var studentProfile = await _studentService.GetStudentProfile(feePaymentUpsertDto.StudentId, (int)feePaymentUpsertDto.AcademicYearId);
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, feePaymentUpsertDto.StudentId.ToString());
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:StudentKitFee_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:StudentKitFee_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", feePaymentUpsertDto.PaidAmount.ToString());
                                messageBody = messageBody.Replace("{token2}", studentProfile.FirstName + " " + studentProfile.LastName);

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
            
            return Ok(result);

            }
            return Ok(await Task.FromResult(new int()));
        }


        [Authorize]
        [HttpPost]
        [Route("GetStudentKitFeePaymentHistoryGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetStudentKitFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentKitfeePaymentHistoryList = await _studentKitFeePaymentService.GetStudentKitFeePaymentHistoryGridList(requestObjectWrapper);
                return Ok(studentKitfeePaymentHistoryList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [Authorize]
        [HttpGet]
        [Route("GetStudentKitFeePaymentHistorySelect")]
        public async Task<ActionResult<StudentKitFeepaymentHistorySelectDto>> GetStudentKitFeePaymentHistorySelect(Int16 academicYearId, long studentId, Int16 gradeId, Int16 divisionId, long studentKitFeePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentKitfeePaymentSelect = await _studentKitFeePaymentService.GetStudentKitFeePaymentHistorySelect(gradeId, divisionId, academicYearId, studentId, studentKitFeePaymentId);
                return Ok(studentKitfeePaymentSelect);
            }
            return Ok(await Task.FromResult(new StudentKitFeepaymentHistorySelectDto()));
        }
        [Authorize]
        [HttpGet]
        [Route("StudentKitFeePaymentDelete")]
        public async Task<ActionResult<int>> StudentKitFeePaymentDelete(long studentKitFeePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var feePaymentDelete = await _studentKitFeePaymentService.StudentKitFeePaymentDelete(studentKitFeePaymentId, userId);
                return Ok(feePaymentDelete);
            }
            return Ok(await Task.FromResult(new int()));
        }
        [Authorize]
        [HttpGet]
        [Route("StudentKitClearCheque")]
        public async Task<ActionResult<bool>> StudentKitClearCheque(long studentKitFeePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var clearCheque = await _studentKitFeePaymentService.StudentKitClearCheque(studentKitFeePaymentId, userId);
                return Ok(clearCheque);
            }
            return Ok(await Task.FromResult(new bool()));
        }
        #region studentKit Daywise Payment Report
        
        [Authorize]
        [HttpPost]
        [Route("GetStudentKitDayWisePaymentReport")]
        public async Task<ActionResult<StudentKitDaywisePaymentReportDto>> GetStudentKitDayWisePaymentReport(StudentKitDaywisePaymentReportRequest request)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                DateTime StartDate = new DateTime(request.StartDate.year,
                                        request.StartDate.month,
                                        request.StartDate.day);
                DateTime EndDate = new DateTime(request.EndDate.year,
                                      request.EndDate.month,
                                      request.EndDate.day);

                var dayWiseStudentKitPaymentReport = await _studentKitFeePaymentService.GetStudentKitDayWisePaymentReport(StartDate, EndDate);
                return Ok(dayWiseStudentKitPaymentReport);
            }
            return Ok(await Task.FromResult(new StudentKitDaywisePaymentReportDto()));
        }
        #endregion





    }
}
