using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.AdhocFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.AdhocFeePaymentModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdhocFeePaymentController : ControllerBase
    {
        private readonly IAdhocFeePaymentService _adhocFeePaymentService;
        private readonly IStudentService _studentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? UPLOAD_PATH;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;
        public AdhocFeePaymentController(IHttpContextAccessor httpContextAccessor, IAdhocFeePaymentService adhocFeePaymentService,
            IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender, IStudentService studentService)
        {
            _httpContextAccessor = httpContextAccessor;
            _adhocFeePaymentService = adhocFeePaymentService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
            _studentService = studentService;
        }
        #region Fee Payment
        [Authorize]
        [HttpPost]
        [Route("GetAdhocFeePaymentGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetAdhocFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentList = await _adhocFeePaymentService.GetAdhocFeePaymentGridList(requestObjectWrapper);
                return Ok(feePaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetAdhocFeePaymentSelect")]
        public async Task<ActionResult<AdhocFeePaymentSelectDto>> GetAdhocFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentSelect = await _adhocFeePaymentService.GetAdhocFeePaymentSelect(academicYearId, studentId, GradeId, DivisionId);
                return Ok(feePaymentSelect);
            }
            return Ok(await Task.FromResult(new AdhocFeePaymentSelectDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("AdhocFeePaymentUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> AdhocFeePaymentUpsert(AdhocFeePaymentUpsertDto feePaymentUpsertDto, string encryptedString)
        {
            
           
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                feePaymentUpsertDto.UserId = userId;
                if(feePaymentUpsertDto.ngbChequeDate != null && feePaymentUpsertDto.ngbChequeDate.day > 0)
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

                var result=await _adhocFeePaymentService.AdhocFeePaymentUpsert(feePaymentUpsertDto);
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
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:AdditionalFee_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:AdditionalFee_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", feePaymentUpsertDto.TotalFee.ToString());
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
                return (result);
            }
            return Ok(await Task.FromResult(new int()));
        }

        #endregion

        #region Fee Payment History
        [Authorize]
        [HttpPost]
        [Route("GetAdhocFeePaymentHistoryGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetAdhocFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentHistoryList = await _adhocFeePaymentService.GetAdhocFeePaymentHistoryGridList(requestObjectWrapper);
                return Ok(feePaymentHistoryList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [Authorize]
        [HttpGet]
        [Route("GetAdhocFeePaymentHistorySelect")]
        public async Task<ActionResult<AdhocFeePaymentHistorySelectDto>> GetAdhocFeePaymentHistorySelect(Int16 academicYearId, long studentId, Int16 gradeId, Int16 divisionId, long feePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentSelect = await _adhocFeePaymentService.GetAdhocFeePaymentHistorySelect(gradeId,divisionId,academicYearId,studentId,feePaymentId);
                return Ok(feePaymentSelect);
            }
            return Ok(await Task.FromResult(new AdhocFeePaymentHistorySelectDto()));
        }
        [Authorize]
        [HttpGet]
        [Route("AdhocFeePaymentDelete")]
        public async Task<ActionResult<int>> AdhocFeePaymentDelete(long feePaymentId)
        {
           if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var feePaymentDelete = await _adhocFeePaymentService.AdhocFeePaymentDelete(feePaymentId, userId);
                return Ok(feePaymentDelete);
            }
            return Ok(await Task.FromResult(new int()));
        }
        [Authorize]
        [HttpGet]
        [Route("AdhocClearCheque")]
        public async Task<ActionResult<bool>> AdhocClearCheque(long feePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var clearCheque = await _adhocFeePaymentService.AdhocClearCheque(feePaymentId, userId);
                return Ok(clearCheque);
            }
            return Ok(await Task.FromResult(new bool()));
        }
        #endregion

        #region Adhoc Fee Payment Daywise Report

        [Authorize]
        [HttpPost]
        [Route("GetDayWiseAdhocPaymentReport")]
        public async Task<ActionResult<AdhocFeePaymentDaywiseReportDto>> GetDayWiseAdhocPaymentReport(DaywiseAdhocPaymentReportRequest request)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                DateTime StartDate = new DateTime(request.StartDate.year,
                                        request.StartDate.month,
                                        request.StartDate.day);
                DateTime EndDate = new DateTime(request.EndDate.year,
                                      request.EndDate.month,
                                      request.EndDate.day);

                var dayWiseAdhocPaymentReport = await _adhocFeePaymentService.GetDayWiseAdhocPaymentReport(StartDate, EndDate);
                return Ok(dayWiseAdhocPaymentReport);
            }
            return Ok(await Task.FromResult(new AdhocFeePaymentDaywiseReportDto()));
        }
        #endregion

    }
}
