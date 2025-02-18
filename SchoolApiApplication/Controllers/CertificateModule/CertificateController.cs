using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.CertificateModule;
using SchoolApiApplication.BusinessLayer.Interfaces.DivisionModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Services.CertificateModule;
using SchoolApiApplication.BusinessLayer.Services.DivisionModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.Certificate_Module;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;
using YamlDotNet.Core.Tokens;

namespace SchoolApiApplication.Controllers.CertificateModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private IWebHostEnvironment _hostingEnvironment;
        private readonly ICertificateService _certificateService;
        private readonly IStorageService _storageService;

        public CertificateController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, ICertificateService certificateService,
            IEmailSender emailSender, IStorageService storageService)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _certificateService = certificateService;
            _emailSender = emailSender;
            _storageService = storageService;
        }

        [Authorize]
        [HttpGet("BonafiedCertificateSelect")]
        public async Task<ActionResult<CertificateDto>> BonafiedCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {

                var result = await _certificateService.BonafiedCertificateSelect(AcademicYearId, GradeId, DivisionId, StudentId);
                if (result?.BonafiedDetails?.BirthDate != null && result.BonafiedDetails.BirthDate.Year > 1500)
                {
                    result.BonafiedDetails.ngbBirthDate = new SchoolNgbDateModel
                    {
                        year = result.BonafiedDetails.BirthDate.Year,
                        month = result.BonafiedDetails.BirthDate.Month,
                        day = result.BonafiedDetails.BirthDate.Day
                    };
                    string imagePath = $"{_hostingEnvironment.ContentRootPath}/Uploads/school/" + result.BonafiedDetails.LogoUrl;
                    if (System.IO.File.Exists(imagePath))
                    {
                        result.BonafiedDetails.SchoolProfileImageContentType = ImageHelper.GetMimeType(imagePath);
                        byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);

                        result.BonafiedDetails.SchoolProfileImage = $"data:{result.BonafiedDetails.SchoolProfileImageContentType};base64,{Convert.ToBase64String(imageBytes)}";
                    }
                    string profileImagePath = $"{_hostingEnvironment.ContentRootPath}/Uploads/student/" + result.BonafiedDetails.ProfileImageUrl;
                    if (System.IO.File.Exists(profileImagePath))
                    {
                        result.BonafiedDetails.ProfileImageContentType = ImageHelper.GetMimeType(profileImagePath);
                        byte[] imageBytes = System.IO.File.ReadAllBytes(profileImagePath);

                        result.BonafiedDetails.ProfileImage = $"data:{result.BonafiedDetails.ProfileImageContentType};base64,{Convert.ToBase64String(imageBytes)}";
                    }
                }
                result.BonafiedDetails.LogoUrl = "/Uploads/school/" + result?.BonafiedDetails?.LogoUrl;
                result.BonafiedDetails.SchoolLogoUrl = "/Uploads/school/" + result?.BonafiedDetails?.SchoolLogoUrl;
                result.BonafiedDetails.StudentLogoUrl = "/Uploads/student/" + result?.BonafiedDetails?.StudentLogoUrl;
                return Ok(result);
            }
            return await Task.FromResult(new CertificateDto());


        }



        [Authorize]
        [HttpGet("IdCardSelect")]
        public async Task<ActionResult<CertificateDto>> IdCardSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _certificateService.IdCardSelect(AcademicYearId, GradeId, DivisionId, StudentId);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.IdCardDetails?.LogoUrl))
                    {
                        var schoolImage = await _storageService.ReadImageFileAsync(UploadFileType.SCHOOL_UPLOAD, result.IdCardDetails.LogoUrl);
                        if (schoolImage.IsSuccess)
                        {
                            result.IdCardDetails.LogoImageContentType = schoolImage.LogoImageContentType;
                            result.IdCardDetails.LogoImage = schoolImage.Base64LogoImage;
                        }

                    }
                    if (!string.IsNullOrEmpty(result.IdCardDetails?.ProfileImageUrl))
                    {
                        var studentImage = await _storageService.ReadImageFileAsync(UploadFileType.STUDENT_UPLOAD, result.IdCardDetails.ProfileImageUrl);
                        if (studentImage.IsSuccess)
                        {
                            result.IdCardDetails.ProfileImageContentType = studentImage.LogoImageContentType;
                            result.IdCardDetails.ProfileImage = studentImage.Base64LogoImage;
                        }

                    }
                    if (result?.IdCardDetails?.BirthDate != null && result.IdCardDetails.BirthDate.Year > 1500)
                    {
                        result.IdCardDetails.ngbBirthDate = new SchoolNgbDateModel
                        {
                            year = result.IdCardDetails.BirthDate.Year,
                            month = result.IdCardDetails.BirthDate.Month,
                            day = result.IdCardDetails.BirthDate.Day
                        };

                    }
                }


                return Ok(result);
            }
            return await Task.FromResult(new CertificateDto());
        }

        [Authorize]
        [HttpGet("CharacterCertificateSelect")]
        public async Task<ActionResult<CertificateDto>> CharacterCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                return Ok(await _certificateService.CharacterCertificateSelect(AcademicYearId, GradeId, DivisionId, StudentId));
            }
            return Ok(await Task.FromResult(new CertificateDto()));
        }

        [HttpPost]
        [Route("GetCertificateList")]
        public async Task<ActionResult<DatatableResponseModel>> GetCertificateList(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var certificateList = await _certificateService.GetCertificateList(requestObjectWrapper);
                return Ok(certificateList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

        [Authorize]
        [HttpPost]
        [Route("CertificateUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> CertificateUpsert()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                CertificateAuditDto certificateModel = JsonConvert.DeserializeObject<CertificateAuditDto>(Request.Form["certificate"], new TrimmingConverter());
                return Ok(await _certificateService.CertificateUpsert(certificateModel, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }




        [Authorize]
        [HttpGet("GetCertificate")]
        public async Task<ActionResult<CertificateAuditDto>> GetCertificate(long CertificateAuditsId, Int16 AcademicYearId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _certificateService.GetCertificate(CertificateAuditsId, AcademicYearId);
                return Ok(result);
            }
            return Ok(await Task.FromResult(new CertificateAuditDto()));
        }

        [Authorize]
        [HttpGet("GetStudentNames")]

        public async Task<ActionResult<StudentNameModelResponse>> GetStudentNames(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentList = await _certificateService.GetStudentNames(AcademicYearId, GradeId, DivisionId, false);
                return Ok(studentList);
            }
            return Ok(await Task.FromResult(new StudentNameModelResponse()));
        }

        [Authorize]
        [HttpGet("GetStudentNamesWithArchive")]

        public async Task<ActionResult<StudentNameModelResponse>> GetStudentNamesWithArchive(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var studentList = await _certificateService.GetStudentNames(AcademicYearId, GradeId, DivisionId, true);
                return Ok(studentList);
            }
            return Ok(await Task.FromResult(new StudentNameModelResponse()));
        }

        [Authorize]
        [HttpGet("GetLeavingCertificateHistory")]
        public async Task<ActionResult<LeavingCertificateHistory>> GetLeavingCertificateHistory(int studentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _certificateService.GetLeavingCertificateHistory(studentId);

                return Ok(result);
            }
            return Ok(await Task.FromResult(new StudentDto()));

        }

        [Authorize]
        [HttpGet("LeavingCertificatePrintSelect")]
        public async Task<ActionResult<CertificateDto>> LeavingCertificatePrintSelect(int LeavingCertificateAuditsId, int StudentId, bool makeAsDuplicate)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _certificateService.LeavingCertificatePrintSelect(LeavingCertificateAuditsId, StudentId);
                if (result?.LeavingCertificateDetails?.BirthDate != null && result?.LeavingCertificateDetails?.BirthDate.Value.Year > 1500)
                {
                    result.LeavingCertificateDetails.ngbBirthDate = new SchoolNgbDateModel
                    {
                        year = result.LeavingCertificateDetails.BirthDate.Value.Year,
                        month = result.LeavingCertificateDetails.BirthDate.Value.Month,
                        day = result.LeavingCertificateDetails.BirthDate.Value.Day
                    };

                }

                if (result?.LeavingCertificateDetails?.DateOfAdmission != null && result.LeavingCertificateDetails?.DateOfAdmission.Value.Year > 1500)
                {
                    result.LeavingCertificateDetails.ngbDateOfAdmission = new SchoolNgbDateModel
                    {
                        year = result.LeavingCertificateDetails.DateOfAdmission.Value.Year,
                        month = result.LeavingCertificateDetails.DateOfAdmission.Value.Month,
                        day = result.LeavingCertificateDetails.DateOfAdmission.Value.Day
                    };
                }

                if (result?.LeavingCertificateDetails?.DateOfLeavingLastSchool != null && result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Year > 1500)
                {
                    result.LeavingCertificateDetails.ngbDateOfLeavingLastSchool = new SchoolNgbDateModel
                    {
                        year = result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Year,
                        month = result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Month,
                        day = result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Day
                    };
                }

                string imagePath = $"{_hostingEnvironment.ContentRootPath}/Uploads/school/" + result?.LeavingCertificateDetails?.LogoUrl;
                if (System.IO.File.Exists(imagePath))
                {
                    result.LeavingCertificateDetails.LogoImageContentType = ImageHelper.GetMimeType(imagePath);
                    byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);

                    result.LeavingCertificateDetails.LogoImage = $"data:{result.LeavingCertificateDetails.LogoImageContentType};base64,{Convert.ToBase64String(imageBytes)}";
                }
                result.LeavingCertificateDetails.LogoUrl = "/Uploads/school/" + result?.LeavingCertificateDetails?.LogoUrl;
                if (makeAsDuplicate)
                {
                    result.LeavingCertificateDetails.SerialNumber = null;
                }
                return Ok(result);
            }
            return Ok(await Task.FromResult(new CertificateDto()));
        }

        [Authorize]
        [HttpPost]
        [Route("LeavingCertificateStatusUpdate")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> LeavingCertificateStatusUpdate(int LeavingCertificateAuditsId, int StudentId, int StatusId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _certificateService.LeavingCertificateStatusUpdate(LeavingCertificateAuditsId, StudentId, StatusId, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        [Authorize]
        [HttpPost]
        [Route("LeavingCertificateGenerateAsDuplicate")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> LeavingCertificateGenerateAsDuplicate(int LeavingCertificateAuditsId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _certificateService.LeavingCertificateGenerateAsDuplicate(LeavingCertificateAuditsId, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        [Authorize]
        [HttpPost]
        [Route("LeavingCertificateUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<long>> LeavingCertificateUpsert(LeavingCertificateDto model)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                if (model.ngbDateOfLeavingSchoolCurrent != null && model.ngbDateOfLeavingSchoolCurrent.day > 0)
                    model.DateOfLeavingSchoolCurrent = new DateTime(model.ngbDateOfLeavingSchoolCurrent.year,
                                        model.ngbDateOfLeavingSchoolCurrent.month,
                                        model.ngbDateOfLeavingSchoolCurrent.day);
                if (model.ngbDateSignCurrent != null && model.ngbDateSignCurrent.day > 0)
                    model.DateSignCurrent = new DateTime(model.ngbDateSignCurrent.year,
                                        model.ngbDateSignCurrent.month,
                                        model.ngbDateSignCurrent.day);
                return Ok(await _certificateService.LeavingCertificateUpsert(model, userId));
            }
            return Ok(await Task.FromResult(new long()));
        }

        [Authorize]
        [HttpGet("LeavingCertificateSelect")]
        public async Task<ActionResult<CertificateDto>> LeavingCertificateSelect(Int16 AcademicYearId, Int16 GradeId, Int16 DivisionId, Int16 StudentId)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var result = await _certificateService.LeavingCertificateSelect(AcademicYearId, GradeId, DivisionId, StudentId);
                if (result?.LeavingCertificateDetails?.BirthDate != null && result?.LeavingCertificateDetails?.BirthDate.Value.Year > 1500)
                {
                    result.LeavingCertificateDetails.ngbBirthDate = new SchoolNgbDateModel
                    {
                        year = result.LeavingCertificateDetails.BirthDate.Value.Year,
                        month = result.LeavingCertificateDetails.BirthDate.Value.Month,
                        day = result.LeavingCertificateDetails.BirthDate.Value.Day
                    };

                }

                if (result?.LeavingCertificateDetails?.DateOfAdmission != null && result.LeavingCertificateDetails?.DateOfAdmission.Value.Year > 1500)
                {
                    result.LeavingCertificateDetails.ngbDateOfAdmission = new SchoolNgbDateModel
                    {
                        year = result.LeavingCertificateDetails.DateOfAdmission.Value.Year,
                        month = result.LeavingCertificateDetails.DateOfAdmission.Value.Month,
                        day = result.LeavingCertificateDetails.DateOfAdmission.Value.Day
                    };
                }

                if (result?.LeavingCertificateDetails?.DateOfLeavingLastSchool != null && result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Year > 1500)
                {
                    result.LeavingCertificateDetails.ngbDateOfLeavingLastSchool = new SchoolNgbDateModel
                    {
                        year = result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Year,
                        month = result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Month,
                        day = result.LeavingCertificateDetails.DateOfLeavingLastSchool.Value.Day
                    };
                }
                string imagePath = $"{_hostingEnvironment.ContentRootPath}/Uploads/school/" + result?.LeavingCertificateDetails?.LogoUrl;
                if (System.IO.File.Exists(imagePath))
                {
                    result.LeavingCertificateDetails.LogoImageContentType = ImageHelper.GetMimeType(imagePath);
                    byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);

                    result.LeavingCertificateDetails.LogoImage = $"data:{result.LeavingCertificateDetails.LogoImageContentType};base64,{Convert.ToBase64String(imageBytes)}";
                }
                result.LeavingCertificateDetails.LogoUrl = "/Uploads/school/" + result?.LeavingCertificateDetails?.LogoUrl;
                return Ok(result);
            }
            return Ok(await Task.FromResult(new CertificateDto()));
        }

        //[Authorize]
        //[HttpGet("ListLeavingCertificateSelect")]
        //public async Task<ActionResult<ViewLeavingCertificateResponseDto>> ListLeavingCertificateSelect()
        //{
        //    var result = await _certificateService.ListLeavingCertificateSelect();

        //    foreach (var certificateDetails in result.ListLeavingCertifiacte)
        //    {
        //        if (certificateDetails.DateSignCurrent.HasValue && certificateDetails.DateSignCurrent.Value.Day > 0)
        //        {
        //            certificateDetails.ngbDateSignCurrent = new SchoolNgbDateModel
        //            {
        //                year = certificateDetails.DateSignCurrent.Value.Year,
        //                month = certificateDetails.DateSignCurrent.Value.Month,
        //                day = certificateDetails.DateSignCurrent.Value.Day
        //            };
        //        }

        //        if (certificateDetails.CreatedDate.HasValue && certificateDetails.CreatedDate.Value.Day > 0)
        //        {
        //            certificateDetails.ngbCreatedDate = new SchoolNgbDateModel
        //            {
        //                year = certificateDetails.CreatedDate.Value.Year,
        //                month = certificateDetails.CreatedDate.Value.Month,
        //                day = certificateDetails.CreatedDate.Value.Day
        //            };
        //        }

        //        if (certificateDetails.DateOfLeavingTheSchool.HasValue && certificateDetails.DateOfLeavingTheSchool.Value.Day > 0)
        //        {
        //            certificateDetails.ngbDateOfLeavingTheSchooll = new SchoolNgbDateModel
        //            {
        //                year = certificateDetails.DateOfLeavingTheSchool.Value.Year,
        //                month = certificateDetails.DateOfLeavingTheSchool.Value.Month,
        //                day = certificateDetails.DateOfLeavingTheSchool.Value.Day
        //            };
        //        }
        //    }

        //    return Ok(result);
        //}

        [HttpPost]
        [Route("GetListLeavingCertificateSelect")]
        public async Task<ActionResult<DatatableResponseModel>> GetListLeavingCertificateSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                var certificateList = await _certificateService.GetListLeavingCertificateSelect(requestObjectWrapper);
                return Ok(certificateList);
            }
            return Ok(await Task.FromResult(new DatatableResponseModel()));
        }

    }
}