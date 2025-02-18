using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.AdhocFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.RegistrationFeePaymentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.BusinessLayer.Services.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.RegistrationFeeModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.RegistrationFeePaymentModule
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationFeePaymentController : ControllerBase
    {

        private readonly IStudentService _studentService;
        private readonly IRegistrationFeePaymentService _registrationFeePaymentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public string? UPLOAD_PATH;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        private readonly IUserService _userService;
        private readonly IConfiguration _config;
        public RegistrationFeePaymentController(IHttpContextAccessor httpContextAccessor, IStudentService studentService,
            IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender, IRegistrationFeePaymentService registrationFeePaymentService)
        {
            _httpContextAccessor = httpContextAccessor;
            _studentService = studentService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
            _registrationFeePaymentService = registrationFeePaymentService;
        }
        [Authorize]
        [HttpPost]
        [Route("GetRegistrationFeePaymentGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetRegistrationFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentList = await _registrationFeePaymentService.GetRegistrationFeePaymentGridList(requestObjectWrapper);
                return Ok(feePaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetRegistrationFeePaymentSelect")]
        public async Task<ActionResult<RegistrationFeePaymentSelectDto>> GetRegistrationFeePaymentSelect(int academicYearId, long studentEnquiryId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentSelect = await _registrationFeePaymentService.GetRegistrationFeePaymentSelect(academicYearId, studentEnquiryId);
                return Ok(feePaymentSelect);
            }
            return Ok(await Task.FromResult(new RegistrationFeePaymentSelectDto()));
        }
        [Authorize]
        [HttpDelete]
        [Route("RegistrationFeePaymentDelete")]
        public async Task<ActionResult<int>> RegistrationFeePaymentDelete( int registrationFeeId, int academicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                var result = await _registrationFeePaymentService.RegistrationFeePaymentDelete(registrationFeeId, userId);
                return Ok(result);
            }
            return Ok(await Task.FromResult(new int()));
        }

        [Authorize]
        [HttpPost]
        [Route("RegistrationFeePaymentUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<int>> RegistrationFeePaymentUpsert(RegistrationFeePaymentDto registrationFeePaymentDto)
        {


            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                registrationFeePaymentDto.UserId = userId;
                if (registrationFeePaymentDto.ngbChequeDate != null && registrationFeePaymentDto.ngbChequeDate.day > 0)
                {
                    registrationFeePaymentDto.ChequeDate = new DateTime(registrationFeePaymentDto.ngbChequeDate.year,
                                        registrationFeePaymentDto.ngbChequeDate.month,
                                        registrationFeePaymentDto.ngbChequeDate.day);
                }
                if (registrationFeePaymentDto.ngbOnlineTransactionDateTime != null && registrationFeePaymentDto.ngbOnlineTransactionDateTime.day > 0)
                {
                    registrationFeePaymentDto.OnlineTransactionDateTime = new DateTime(registrationFeePaymentDto.ngbOnlineTransactionDateTime.year,
                                        registrationFeePaymentDto.ngbOnlineTransactionDateTime.month,
                                        registrationFeePaymentDto.ngbOnlineTransactionDateTime.day);
                }

                var result = await _registrationFeePaymentService.RegistrationFeePaymentUpsert(registrationFeePaymentDto);
               return (result);
            }
            return Ok(await Task.FromResult(new int()));
        }

        [Authorize]
        [HttpPost]
        [Route("GetRegistrationFeePaymentHistoryGridList")]
        public async Task<ActionResult<DatatableResponseModel>> GetRegistrationFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentList = await _registrationFeePaymentService.GetRegistrationFeePaymentHistoryGridList(requestObjectWrapper);
                return Ok(feePaymentList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpGet]
        [Route("GetRegistrationFeePaymentHistorySelect")]
        public async Task<ActionResult<RegistrationFeePaymentHistorySelectDto>> GetRegistrationFeePaymentHistorySelect(int academicYearId, long studentEnquiryId, int registrationFeeId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var feePaymentSelect = await _registrationFeePaymentService.GetRegistrationFeePaymentHistorySelect(academicYearId, studentEnquiryId, registrationFeeId);
                return Ok(feePaymentSelect);
            }
            return Ok(await Task.FromResult(new RegistrationFeePaymentHistorySelectDto()));
        }

    }
}
