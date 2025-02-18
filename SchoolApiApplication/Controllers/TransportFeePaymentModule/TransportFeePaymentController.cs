using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TransportFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.TransportFeePaymentModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.TransportFeePaymentModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TransportFeePaymentController : ControllerBase
    {
        private readonly ITransportFeePaymentService _feeTransportPaymentService;
        private readonly IStudentService _studentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;
        public TransportFeePaymentController(IHttpContextAccessor httpContextAccessor, ITransportFeePaymentService feeTransportPaymentService, 
            IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender, IStudentService studentService)
        {
            _httpContextAccessor = httpContextAccessor;
            _feeTransportPaymentService = feeTransportPaymentService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
            _studentService = studentService;
        }
        #region Fee Payment
        [Authorize]
        [HttpPost]
        [Route("GetTransportFeePaymentStudentGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetTransportFeePaymentStudentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feeTransportPaymentList = await _feeTransportPaymentService.GetTransportFeePaymentStudentGridList(requestObjectWrapper);
                return Ok(feeTransportPaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpPost]
        [Route("GetTransportFeePaymentStaffGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetTransportFeePaymentStaffGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feeTransportPaymentList = await _feeTransportPaymentService.GetTransportFeePaymentStaffGridList(requestObjectWrapper);
                return Ok(feeTransportPaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpPost]
        [Route("GetTransportFeePaymentDueListByAY")]
        public async Task<ActionResult<DatatableResponseModel>> GetTransportFeePaymentDueListByAY(int consumerId, int roleId, bool currentAcademicYearInclude)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feeTransportPaymentList = await _feeTransportPaymentService.GetTransportFeePaymentDueListByAY(consumerId, roleId, currentAcademicYearInclude);
                return Ok(feeTransportPaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportFeePaymentSelect")]
        public async Task<ActionResult<TransportFeePaymentSelectDto>> GetTransportFeePaymentSelect(Int32 academicYearId, int consumerId, int roleId, int transportConsumerStoppageMappingId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feeTransportPaymentSelect = await _feeTransportPaymentService.GetTransportFeePaymentSelect(academicYearId, consumerId, roleId, transportConsumerStoppageMappingId);
                return Ok(feeTransportPaymentSelect);
            }
            return Ok(await Task.FromResult(new TransportFeePaymentSelectDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("TransportFeePaymentUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> TransportFeePaymentUpsert([FromBody] TransportFeePaymentUpsertDto transportFeePaymentUpsertDto)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                transportFeePaymentUpsertDto.UserId = userId;
                if (transportFeePaymentUpsertDto.ngbChequeDate != null && transportFeePaymentUpsertDto.ngbChequeDate.day > 0)
                {
                    transportFeePaymentUpsertDto.ChequeDate = new DateTime(transportFeePaymentUpsertDto.ngbChequeDate.year,
                                        transportFeePaymentUpsertDto.ngbChequeDate.month,
                                        transportFeePaymentUpsertDto.ngbChequeDate.day);
                }
                if (transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime != null && transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime.day > 0)
                {
                    transportFeePaymentUpsertDto.OnlineTransactionDateTime = new DateTime(transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime.year,
                                        transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime.month,
                                        transportFeePaymentUpsertDto.ngbOnlineTransactionDateTime.day);
                }

                var result=await _feeTransportPaymentService.TransportFeePaymentUpsert(transportFeePaymentUpsertDto);
                try
                {
                    if (transportFeePaymentUpsertDto.RoleId == 5)
                    {
                        var studentProfile = await _studentService.GetStudentProfile(transportFeePaymentUpsertDto.ConsumerId, (int)transportFeePaymentUpsertDto.AcademicYearId);
                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, 0, 0, transportFeePaymentUpsertDto.ConsumerId.ToString());
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        allFCMUsers.ForEach(user =>
                        {
                            try
                            {
                                var messageTitle = _config["FirebaseSetting:MessageTemplates:TransportFee_Template:Title"];
                                var messageBody = _config["FirebaseSetting:MessageTemplates:TransportFee_Template:Body"];
                                messageBody = messageBody.Replace("{token1}", transportFeePaymentUpsertDto.PaidAmount.ToString());
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
                return(result);

            }
            return Ok(await Task.FromResult(new int()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportFeePaymentMonths")]
        public async Task<ActionResult<TransportFeeMonthMastersDto>> GetTransportFeePaymentMonths(Int16 academicYearId, int consumerId, int roleId, int transportConsumerStoppageMappingId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var paymentTransportFeeMonths = await _feeTransportPaymentService.GetTransportFeePaymentMonths(academicYearId, consumerId, roleId, transportConsumerStoppageMappingId);

                return Ok(paymentTransportFeeMonths);

            }
            return Ok(await Task.FromResult(new TransportFeeMonthMastersDto()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetTransportFeePaymentStoppageGridLIst")]
        public async Task<ActionResult<TransportFeePaymentStoppageGridDto>> GetTransportFeePaymentStoppageGridLIst(Int16 academicYearId, int consumerId, int roleId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var paymentTransportStoppagelist = await _feeTransportPaymentService.GetTransportFeePaymentStoppageGridLIst(academicYearId, consumerId, roleId);

                return Ok(paymentTransportStoppagelist);

            }
            return Ok(await Task.FromResult(new TransportFeePaymentStoppageGridDto()));
        }
        #endregion

        #region Fee Payment History
        [Authorize]
        [HttpPost]
        [Route("GetTransportFeePaymentHistoryGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetTransportFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feeTransportPaymentHistoryList = await _feeTransportPaymentService.GetTransportFeePaymentHistoryGridList(requestObjectWrapper);
                return Ok(feeTransportPaymentHistoryList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }
        [Authorize]
        [HttpGet]
        [Route("GetTransportFeePaymentHistorySelect")]
        public async Task<ActionResult<TransportFeePaymentHistorySelectDto>> GetTransportFeePaymentHistorySelect(int roleId, Int16 academicYearId, long consumerId, long tarnsportFeePaymentId, int transportConsumerStoppageMappingId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feeTransportPaymentSelect = await _feeTransportPaymentService.GetTransportFeePaymentHistorySelect(roleId, academicYearId, consumerId, tarnsportFeePaymentId, transportConsumerStoppageMappingId);
                return Ok(feeTransportPaymentSelect);
            }
            return Ok(await Task.FromResult(new TransportFeePaymentHistorySelectDto()));
        }
        [Authorize]
        [HttpGet]
        [Route("TransportFeePaymentDelete")]
        public async Task<ActionResult<int>> TransportFeePaymentDelete(long transportFeePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var feeTransportPaymentDelete = await _feeTransportPaymentService.TransportFeePaymentDelete(transportFeePaymentId, userId);
                return Ok(feeTransportPaymentDelete);
            }
            return Ok(await Task.FromResult(new int()));
        }
        [Authorize]
        [HttpGet]
        [Route("TransportClearCheque")]
        public async Task<ActionResult<bool>> TransportClearCheque(long transportFeePaymentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var clearCheque = await _feeTransportPaymentService.TransportClearCheque(transportFeePaymentId, userId);
                return Ok(clearCheque);
            }
            return Ok(await Task.FromResult(new bool()));
        }
        #endregion

        #region Transport Fee Payment Report

        [Authorize]
        [HttpPost]
        [Route("GetDayWiseTransportPaymentReport")]
        public async Task<ActionResult<TransportPaymentReportDaywiseDto>> GetDayWiseTransportPaymentReport(DaywiseTransportPaymentReportRequest request)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                DateTime StartDate = new DateTime(request.StartDate.year,
                                        request.StartDate.month,
                                        request.StartDate.day);
                DateTime EndDate = new DateTime(request.EndDate.year,
                                      request.EndDate.month,
                                      request.EndDate.day);

                var dayWiseTransportPaymentReport = await _feeTransportPaymentService.GetDayWiseTranportPaymentReport(StartDate, EndDate);
                return Ok(dayWiseTransportPaymentReport);
            }
            return Ok(await Task.FromResult(new TransportPaymentReportDaywiseDto()));
        }
        #endregion
    }
}
