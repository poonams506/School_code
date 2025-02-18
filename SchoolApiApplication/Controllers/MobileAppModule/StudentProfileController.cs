using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.ParentAppModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.ParentAppModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentProfileController : ControllerBase
    {
        private readonly IStudentProfileService _studentProfileService;
        private readonly IStorageService _storageService;
        public StudentProfileController(
            IStudentProfileService studentProfileService,
            IStorageService storageService
           )
        {
            _studentProfileService = studentProfileService;
            _storageService = storageService;
        }

       

        [Authorize]
        [HttpGet]
        [Route("GetStudentProfile")]
        public async Task<ActionResult<StudentProfileMobileDto>> GetStudentProfile(long StudentId)
        {
            var result = await _studentProfileService.GetStudentProfile(StudentId);
           if (result != null && !string.IsNullOrEmpty(result.ProfileImageURL))
           {
                    var studentImage = await _storageService.ReadImageFileAsync(UploadFileType.STUDENT_UPLOAD, result.ProfileImageURL);
                    if (studentImage.IsSuccess)
                    {
                        result.ProfileImageContentType = studentImage.LogoImageContentType;
                        result.ProfileBase64Image = studentImage.Base64LogoImage;
                    }

                
            }
                
            return Ok(result);
           
        }


        [Authorize]
        [HttpPost]
        [Route("StudentProfileUpdate")]
        [DisableRequestSizeLimit]

        public async Task<ActionResult<int>> StudentProfileUpdate()
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            StudentProfileMobileDto studentProfileObj = JsonConvert.DeserializeObject<StudentProfileMobileDto>(Request.Form["studentProfile"], new TrimmingConverter());

            if (Request.HasFormContentType && Request.Form != null)
            {
                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                    await ProcessStudentProfileImage(files, studentProfileObj);
                }
            }

           var result=  await _studentProfileService.StudentProfileUpdate(studentProfileObj, userId);
            return Ok(result);


        }
        private async Task ProcessStudentProfileImage(IFormFileCollection files, StudentProfileMobileDto studentProfileDto)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    studentProfileDto.ProfileImageURL = await _storageService.UploadFileAsync(UploadFileType.STUDENT_UPLOAD, file);
                }
            }
        }


        [Authorize]
        [HttpGet]
        [Route("GetParentProfile")]
        public async Task<ActionResult<ParentProfileMobileResponseDto>> GetParentProfile(long StudentId)
        {
            var result = await _studentProfileService.GetParentProfile(StudentId);
            if (result.FatherDetail != null && !string.IsNullOrEmpty(result.FatherDetail.ProfileImageURL))
            {
                var parentImage = await _storageService.ReadImageFileAsync(UploadFileType.PARENT_UPLOAD, result.FatherDetail.ProfileImageURL);
                if (parentImage.IsSuccess)
                {
                    result.FatherDetail.ProfileImageContentType = parentImage.LogoImageContentType;
                    result.FatherDetail.ProfileBase64Image = parentImage.Base64LogoImage;
                }
            }
            if (result.MotherDetail != null && !string.IsNullOrEmpty(result.MotherDetail.ProfileImageURL))
            {
                var parentImage = await _storageService.ReadImageFileAsync(UploadFileType.PARENT_UPLOAD, result.MotherDetail.ProfileImageURL);
                if (parentImage.IsSuccess)
                {
                    result.MotherDetail.ProfileImageContentType = parentImage.LogoImageContentType;
                    result.MotherDetail.ProfileBase64Image = parentImage.Base64LogoImage;
                }
            }
            if (result.GuardianDetail != null && !string.IsNullOrEmpty(result.GuardianDetail.ProfileImageURL))
            {
                var parentImage = await _storageService.ReadImageFileAsync(UploadFileType.PARENT_UPLOAD, result.GuardianDetail.ProfileImageURL);
                if (parentImage.IsSuccess)
                {
                    result.GuardianDetail.ProfileImageContentType = parentImage.LogoImageContentType;
                    result.GuardianDetail.ProfileBase64Image = parentImage.Base64LogoImage;
                }
            }

            return Ok(result);

        }


        [Authorize]
        [HttpPost]
        [Route("ParentProfileUpdate")]
        [DisableRequestSizeLimit]

        public async Task<ActionResult<int>> ParentProfileUpdate()
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            ParentProfileMobileDto parentProfileObj = JsonConvert.DeserializeObject<ParentProfileMobileDto>(Request.Form["parentProfile"], new TrimmingConverter());

            if (Request.HasFormContentType && Request.Form != null)
            {
                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                    await ProcessParentProfileImage(files, parentProfileObj);
                }
            }

            var result = await _studentProfileService.ParentProfileUpdate(parentProfileObj, userId);
            return Ok(result);


        }
        private async Task ProcessParentProfileImage(IFormFileCollection files, ParentProfileMobileDto parentProfileDto)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    parentProfileDto.ProfileImageURL = await _storageService.UploadFileAsync(UploadFileType.PARENT_UPLOAD, file);
                }
            }
        }

    }
}
