using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.FeeParticularModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.FeeParticularModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeeParticularController : ControllerBase
    {
        private readonly IFeeParticularService _feeParticularService;
        private readonly IHttpContextAccessor _httpcontextAccessor;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;



        public FeeParticularController(IHttpContextAccessor httpContextAccessor, IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender,IFeeParticularService feeParticularService)
        {
            _httpcontextAccessor = httpContextAccessor;
            _feeParticularService = feeParticularService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;
        }
        [Authorize]
        [HttpPost]
        [Route("GetFeeParticularGridList")]

        public async Task<ActionResult<DatatableRequestModel>> GetFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            var feeParticularList = await _feeParticularService.GetFeeParticularGridList(requestObjectWrapper);
            return Ok(feeParticularList);
        }

        [Authorize]
        [HttpGet]
        [Route("GetFeeParticularSelect")]

        public async Task<ActionResult<FeeStructureDto>> GetFeeParticularSelect(int ClassId, int AcademicYearId)
        {

            var FeeParticularSelect = await _feeParticularService.GetFeeParticularSelect(ClassId, AcademicYearId);
            return Ok(FeeParticularSelect);


        }

        [Authorize]
        [HttpPost]
        [Route("FeeParticularInsert")]
        [DisableRequestSizeLimit]


        public async Task<ActionResult<int>> FeeParticularInsert(FeeStructureDto FeeParticularInsertObj)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result=await _feeParticularService.FeeParticularInsert(FeeParticularInsertObj, userId);
            await SendFeeNotification(FeeParticularInsertObj);
            return Ok(result);

        }

        [Authorize]
        [HttpPost]
        [Route("FeeParticularUpdate")]
        [DisableRequestSizeLimit]

        public async Task<ActionResult<int>> FeeParticularUpdate(FeeStructureDto FeeParticularUpdateObj)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result=await _feeParticularService.FeeParticularUpdate(FeeParticularUpdateObj, userId);
            await SendFeeNotification(FeeParticularUpdateObj);
            return Ok(result);
        }
        private async Task<bool> SendFeeNotification(FeeStructureDto FeeStructureDto)
        {
            // send notification
            if (FeeStructureDto.IsPublish == true)
            {
                try
                {
                    if (FeeStructureDto.ClassId.Count > 0)
                    {
                        List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                        List<Task<string>> tasks = new List<Task<string>>();
                        foreach (var item in FeeStructureDto.ClassId)
                        {
                            tasks.Add(sendForSelectClass( (int)item));
                        }
                        string[] results = await Task.WhenAll(tasks);
                    }
                }
                catch (Exception)
                {

                }
            }
            return await Task.FromResult(new bool());
        }

        private async Task<string> sendForSelectClass( int classId)
        {
            var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, classId);
            List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
            allFCMUsers.ForEach(user =>
            {
                try
                {
                    var messageTitle = _config["FirebaseSetting:MessageTemplates:FeeParticular_Template:Title"];
                    var messageBody = _config["FirebaseSetting:MessageTemplates:FeeParticular_Template:Body"];

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


        [Authorize]
        [HttpPost]
        [Route("GetAllApplicableWaiverData")]
        public async Task<ActionResult<FeeWaiverResponseDto>> GetAllApplicableWaiverData(int AcademicYearId)
        {
            return Ok(await _feeParticularService.GetAllApplicableWaiverData(AcademicYearId));

        }

        [Authorize]
        [HttpGet]
        [Route("GetGradeDivisionFeeParticularMasterList")]
        public async Task<ActionResult<GradeDivisionWithDisabledCommonMasterDto>> GetGradeDivisionFeeParticularMasterList(int AcademicYearId)
        {
            return Ok(await _feeParticularService.GetGradeDivisionFeeParticularMasterList(AcademicYearId));
        }


        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishGradeDivisionParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishGradeDivisionParticulars([FromBody] PublishUnpublishParticularDto publishRequest)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result=await _feeParticularService.PublishUnpublishGradeDivisionParticulars(publishRequest, userId);

            if (publishRequest.IsPublish == true)
            {
                try
                {
                    var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, 0, (int)publishRequest.GradeId, (int)publishRequest.DivisionId);
                    List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                    allFCMUsers.ForEach(user =>
                    {
                        try
                        {
                            var messageTitle = _config["FirebaseSetting:MessageTemplates:FeeParticular_Template:Title"];
                            var messageBody = _config["FirebaseSetting:MessageTemplates:FeeParticular_Template:Body"];

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
        [HttpPost]
        [Route("FeeParticularClone")]
        public async Task<ActionResult<int>> FeeParticularClone(FeeParticularCloneDto cloneRequest)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _feeParticularService.FeeParticularClone(cloneRequest, userId));

        }

        [HttpDelete]
        [Route("FeeParticularDelete")]
        public async Task<ActionResult<int>> FeeParticularDelete(int gradeId, int divisionId, int academicYearId)
        {


            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _feeParticularService.FeeParticularDelete(gradeId, divisionId, academicYearId, userId));


        }

        [HttpGet]
        [Route("CopyFeeParticularsFromLastAY")]
        public async Task<ActionResult<int>> CopyFeeParticularsFromLastAY(int gradeId, int divisionId)
        {

            return Ok(await _feeParticularService.CopyFeeParticularsFromLastAY(gradeId, divisionId));



        }


        #region Student Kit Fee Structure
        [Authorize]
        [HttpPost]
        [Route("GetStudentKitFeeParticularGridList")]

        public async Task<ActionResult<DatatableRequestModel>> GetStudentKitFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            var feeParticularList = await _feeParticularService.GetStudentKitFeeParticularGridList(requestObjectWrapper);
            return Ok(feeParticularList);
        }

        [HttpGet]
        [Route("GetStudentKitFeeParticularByClassId")]
        public async Task<ActionResult<StudentKitFeeStructureDto>> GetStudentKitFeeParticularByClassId(int ClassId, int AcademicYearId)
        {
            return await _feeParticularService.GetStudentKitFeeParticularByClassId(ClassId, AcademicYearId);
        }

        [HttpPost]
        [Route("StudentKitFeeParticularInsert")]
        public async Task<ActionResult<int>> StudentKitFeeParticularInsert([FromBody] StudentKitFeeStructureDto FeeParticularInsertObj)
        {
            int UserId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return await _feeParticularService.StudentKitFeeParticularInsert(FeeParticularInsertObj, UserId);

        }

        [HttpPost]
        [Route("StudentKitFeeParticularUpdate")]
        public async Task<ActionResult<int>> StudentKitFeeParticularUpdate(StudentKitFeeStructureDto FeeParticularUpdateObj)
        {
            int UserId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return await _feeParticularService.StudentKitFeeParticularUpdate(FeeParticularUpdateObj, UserId);

        }
        [HttpGet]
        [Route("GetGradeDivisionStudentKitFeeParticularMasterList")]
        public async Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionStudentKitFeeParticularMasterList(int AcademicYearId)
        {
            return await _feeParticularService.GetGradeDivisionStudentKitFeeParticularMasterList(AcademicYearId);
        }

        [Authorize]
        [HttpPost]
        [Route("PublishUnpublishGradeDivisionStudentKitParticulars")]
        public async Task<ActionResult<int>> PublishUnpublishGradeDivisionStudentKitParticulars([FromBody] PublishUnpublishParticularDto publishRequest)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _feeParticularService.PublishUnpublishGradeDivisionStudentKitParticulars(publishRequest, userId));

        }

        [Authorize]
        [HttpPost]
        [Route("StudentKitFeeParticularClone")]
        public async Task<ActionResult<int>> StudentKitFeeParticularClone(FeeParticularCloneDto cloneRequest)
        {

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _feeParticularService.StudentKitFeeParticularClone(cloneRequest, userId));

        }

        [HttpDelete]
        [Route("StudentKitFeeParticularDelete")]
        public async Task<ActionResult<int>> StudentKitFeeParticularDelete(int gradeId, int divisionId, int academicYearId)
        {


            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _feeParticularService.StudentKitFeeParticularDelete(gradeId, divisionId, academicYearId, userId));


        }

        [HttpGet]
        [Route("CopyStudentKitFeeParticularsFromLastAY")]
        public async Task<ActionResult<int>> CopyStudentkitFeeParticularsFromLastAY(int gradeId, int divisionId)
        {

            return Ok(await _feeParticularService.CopyStudentKitFeeParticularsFromLastAY(gradeId, divisionId));



        }

        #endregion
    }
}
