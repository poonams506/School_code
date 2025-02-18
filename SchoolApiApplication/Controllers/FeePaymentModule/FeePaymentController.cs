using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.FeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.FeePaymentModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FeePaymentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly IFeePaymentService _feePaymentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? UPLOAD_PATH;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;

        public FeePaymentController(IHttpContextAccessor httpContextAccessor, IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender,
            IStudentService studentService, IFeePaymentService feePaymentService)
        {
            _httpContextAccessor = httpContextAccessor;
            _feePaymentService = feePaymentService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
            _studentService = studentService;
        }
        #region Fee Payment
        [Authorize]
        [HttpPost]
        [Route("GetFeePaymentGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentList = await _feePaymentService.GetFeePaymentGridList(requestObjectWrapper);
                return Ok(feePaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpPost]
        [Route("GetFeePaymentDueListByAY")]
        public async Task<ActionResult<DatatableResponseModel>> GetFeePaymentDueListByAY(int studentId, bool currentAcademicYearInclude)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentList = await _feePaymentService.GetFeePaymentDueListByAY(studentId, currentAcademicYearInclude);
                return Ok(feePaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetFeePaymentSelect")]
        public async Task<ActionResult<FeePaymentSelectDto>> GetFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentSelect = await _feePaymentService.GetFeePaymentSelect(academicYearId, studentId, GradeId, DivisionId);
                return Ok(feePaymentSelect);
            }
            return Ok(await Task.FromResult(new FeePaymentSelectDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("FeePaymentUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> FeePaymentUpsert(FeePaymentUpsertDto feePaymentUpsertDto, string encryptedString)
        {
            //FeePaymentUpsertDto feePaymentUpsertDto = new FeePaymentUpsertDto();
            //JsonSerializerSettings theJsonSerializerSettings = new JsonSerializerSettings();
            //try
            //{
            //    feePaymentUpsertDto = JsonConvert.DeserializeObject<FeePaymentUpsertDto>(CryptoJS.DecryptAES(encryptedString, "LogicalHunt@2023"));
            //}
            //catch (Exception ex)
            //{
            //    throw;
            //}
           
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

                var result=await _feePaymentService.FeePaymentUpsert(feePaymentUpsertDto);
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
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:AcademicFee_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:AcademicFee_Template:Body"];
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
                return (result);
            }
            return Ok(await Task.FromResult(new int()));
        }

        [Authorize]
        [HttpPost]
        [Route("FeePaymentPreviousAYPedingFeeUpdate")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> FeePaymentPreviousAYPedingFeeUpdate(long studentId, decimal previousAcademicYearPendingFeeAmount)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                 return Ok(await _feePaymentService.FeePaymentPreviousAYPedingFeeUpdate(studentId, previousAcademicYearPendingFeeAmount, userId));
            }
            return Ok(await Task.FromResult(new int()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetPaymentFeePageMasterActivityList")]
        public async Task<ActionResult<PaymentFeePageMasterActivityList>> GetPaymentFeePageMasterActivityList(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var paymentFeePageMasterActivityList = await _feePaymentService.GetPaymentFeePageMasterActivityList(GradeId, DivisionId, AcademicYearId, StudentId);

                return Ok(paymentFeePageMasterActivityList);

            }
            return Ok(await Task.FromResult(new PaymentFeePageMasterActivityList()));
        }
        #endregion

        #region Fee Payment History
        [Authorize]
        [HttpPost]
        [Route("GetFeePaymentHistoryGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentHistoryList = await _feePaymentService.GetFeePaymentHistoryGridList(requestObjectWrapper);
                return Ok(feePaymentHistoryList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [Authorize]
        [HttpGet]
        [Route("GetFeePaymentHistorySelect")]
        public async Task<ActionResult<FeePaymentHistorySelectDto>> GetFeePaymentHistorySelect(Int16 academicYearId, long studentId, Int16 gradeId, Int16 divisionId, long feePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentSelect = await _feePaymentService.GetFeePaymentHistorySelect(gradeId,divisionId,academicYearId,studentId,feePaymentId);
                return Ok(feePaymentSelect);
            }
            return Ok(await Task.FromResult(new FeePaymentHistorySelectDto()));
        }
        [Authorize]
        [HttpGet]
        [Route("FeePaymentDelete")]
        public async Task<ActionResult<int>> FeePaymentDelete(long feePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var feePaymentDelete = await _feePaymentService.FeePaymentDelete(feePaymentId, userId);
                return Ok(feePaymentDelete);
            }
            return Ok(await Task.FromResult(new int()));
        }
        [Authorize]
        [HttpGet]
        [Route("ClearCheque")]
        public async Task<ActionResult<bool>> ClearCheque(long feePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var clearCheque = await _feePaymentService.ClearCheque(feePaymentId, userId);
                return Ok(clearCheque);
            }
            return Ok(await Task.FromResult(new bool()));
        }
        #endregion

        #region Payment Report
        [Authorize]
        [HttpPost]
        [Route("GetDayWisePaymentReport")]
        public async Task<ActionResult<DaywisePaymentReportDTO>> GetDayWisePaymentReport(DaywisePaymentReportRequest request)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                DateTime StartDate =  new DateTime(request.StartDate.year,
                                        request.StartDate.month,
                                        request.StartDate.day);
                DateTime EndDate = new DateTime(request.EndDate.year,
                                      request.EndDate.month,
                                      request.EndDate.day);

                var dayWisePaymentReport = await _feePaymentService.GetDayWisePaymentReport(StartDate, EndDate);
                return Ok(dayWisePaymentReport);
            }
            return Ok(await Task.FromResult(new DaywisePaymentReportDTO()));
        }
        #endregion
    }
}
