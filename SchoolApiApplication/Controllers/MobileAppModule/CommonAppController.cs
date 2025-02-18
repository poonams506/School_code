using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.DTO.MobileAppModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.ParentAppModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonAppController : ControllerBase
    {
        private readonly ICommonAppService _commonAppService;
        private readonly IStorageService _storageService;
        public CommonAppController(
            ICommonAppService commonAppService,
            IStorageService storageService)
        {
            _commonAppService = commonAppService;
            _storageService = storageService;
        }

      

        [Authorize]
        [HttpGet("GetSchoolDetail")]
        public async Task<ActionResult<SchoolDetailMobileDto>> GetSchoolDetail()
        {
            var schoolDetail= await _commonAppService.GetSchoolDetail();
            if (!string.IsNullOrEmpty(schoolDetail.LogoUrl))
            {
                schoolDetail.LogoUrl = await _storageService.GetFullPath(Common.UploadFileType.SCHOOL_UPLOAD, schoolDetail.LogoUrl);
            }
            return Ok(schoolDetail);
        }

        [Authorize]
        [HttpGet("GetStudentsByUserId")]
        public async Task<ActionResult<StudentDetailMobileResponseDto>> GetStudentsByUserId()
        {
            
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var lstStudentDetail = await _commonAppService.GetStudentsByUserId(userId, (int)schoolDetail.AcademicYearId);
            lstStudentDetail.LstStudents.ForEach(async student =>
            {
                if(!string.IsNullOrEmpty(student.ProfileImageURL))
                {
                    student.ProfileImageURL = await _storageService.GetFullPath(Common.UploadFileType.STUDENT_UPLOAD, student.ProfileImageURL);
                }
            });
            return Ok(lstStudentDetail);
        }
    }
}
