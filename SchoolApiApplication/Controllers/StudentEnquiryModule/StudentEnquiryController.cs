using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentEnquiryModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.StudentEnquiryModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TransportModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.StudentEnquiryModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentEnquiryController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IStudentEnquiryService _studentEnquiryService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IStorageService _storageService;
        private IWebHostEnvironment _hostingEnvironment;
        private readonly IUserService _userService;


        public StudentEnquiryController(IWebHostEnvironment hostingEnvironment, IConfiguration config,
            IHttpContextAccessor httpContextAccessor, IStudentEnquiryService studentEnquiryService,
            IEmailSender emailSender, IStorageService storageService, IUserService userService)
        {
            _config = config;
            _studentEnquiryService = studentEnquiryService;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _emailSender = emailSender;
            _storageService = storageService;
            _userService = userService;

        }

        [Authorize]
        [HttpGet("StudentEnquirySelect")]
        public async Task<ActionResult<StudentEnquiryDto>> StudentEnquirySelect(int StudentEnquiryId)
        {
            var result = await _studentEnquiryService.StudentEnquirySelect(StudentEnquiryId);

           if (result != null)
           {
                if (result.BirthDate != null && result.BirthDate.Value.Day > 0)
             { 
                result.ngbBirthDate = new SchoolNgbDateModel
                {
                    year = result.BirthDate.Value.Year,
                    month = result.BirthDate.Value.Month,
                    day = result.BirthDate.Value.Day
                };
             }

            if (result.EnquiryDate != null && result.EnquiryDate.Value.Day > 0)
            {
                result.ngbEnquiryDate = new SchoolNgbDateModel
                {
                    year = result.EnquiryDate.Value.Year,
                    month = result.EnquiryDate.Value.Month,
                    day = result.EnquiryDate.Value.Day
                };
            }
            }
            else
            {
                result = new StudentEnquiryDto() { };
            }
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("StudentEnquiryGridSelect")]
        public async Task<ActionResult<DatatableResponseModel>> StudentEnquiryGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var StudentEnquiryList = await _studentEnquiryService.StudentEnquiryGridSelect(requestObjectWrapper, userId);
            return Ok(StudentEnquiryList);
        }

        [Authorize]
        [HttpPost]
        [Route("StudentEnquiryUpsert")]
        public async Task<ActionResult<StudentEnquiryIdModelResponse>> StudentEnquiryUpsert()
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            StudentEnquiryDto obj = JsonConvert.DeserializeObject<StudentEnquiryDto>(Request.Form["studentEnquiry"], new TrimmingConverter());
            if (obj.ngbEnquiryDate != null && obj.ngbEnquiryDate.day > 0)
            {
                obj.EnquiryDate = new DateTime
                (obj.ngbEnquiryDate.year,
                 obj.ngbEnquiryDate.month,
                 obj.ngbEnquiryDate.day);
            }
            if (obj.ngbBirthDate != null && obj.ngbBirthDate.day > 0)
            {
                obj.BirthDate = new DateTime
                (obj.ngbBirthDate.year,
                 obj.ngbBirthDate.month,
                 obj.ngbBirthDate.day);
            }
            return Ok(await _studentEnquiryService.StudentEnquiryUpsert(obj, userId));
        }

        [Authorize]
        [HttpDelete]
        [Route("StudentEnquiryDelete")]
        public async Task<ActionResult<StudentEnquiryIdModelResponse>> StudentEnquiryDelete(int StudentEnquiryId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _studentEnquiryService.StudentEnquirydelete(StudentEnquiryId, userId));
        }

        [HttpGet]
        [Route("GetEnquiryStatusDropDown")]
        public async Task<ActionResult<StudentEnquiryDto>> GetEnquiryStatusDropDown()
        {
            return Ok(await _studentEnquiryService.GetEnquiryStatusDropDown());
        }

        [HttpGet]
        [Route("GetEnquiryTypeDropDown")]
        public async Task<ActionResult<StudentEnquiryDto>> GetEnquiryTypeDropDown()
        {
            return Ok(await _studentEnquiryService.GetEnquiryTypeDropDown());
        }

    }

}
