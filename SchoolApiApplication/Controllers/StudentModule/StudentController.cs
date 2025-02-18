using BinaryKits.Zpl.Label.Elements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.Helper;
using System.Security.Claims;


namespace SchoolApiApplication.Controllers.StudentModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
   
        private readonly IStudentService _studentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IStorageService _storageService;
        private readonly IZplHelper _zplHelper;
        public StudentController(IWebHostEnvironment hostingEnvironment,
            IHttpContextAccessor httpContextAccessor, 
            IStudentService studentService, IStorageService storageService,
            IZplHelper zplHelper)
        {
            
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _studentService = studentService;
            _storageService = storageService;
            _zplHelper = zplHelper;
        }

        private string GetUploadFolderPath()
        {
            string folderName = "Uploads/student";
            string webRootPath = _hostingEnvironment.WebRootPath;
            return Path.Combine(webRootPath, folderName);
        }

        [Authorize]
        [HttpGet("GetStudentProfile")]
        public async Task<ActionResult<StudentDto>> GetStudentProfile(long? studentId, int academicYearId)
        {
           
                var result = await _studentService.GetStudentProfile(studentId, academicYearId);
                if (result != null)
                {
                if (!string.IsNullOrEmpty(result.ProfileImageURL))
                {
                    var studentImage = await _storageService.ReadImageFileAsync(UploadFileType.STUDENT_UPLOAD, result.ProfileImageURL);
                    if (studentImage.IsSuccess)
                    {
                        result.ProfileImageContentType = studentImage.LogoImageContentType;
                        result.ProfileBase64Image = studentImage.Base64LogoImage;
                    }

                }

                if (result.BirthDate != null && result.BirthDate.Value.Day > 0)
                    {
                        result.ngbBirthDate = new SchoolNgbDateModel
                        {
                            year = result.BirthDate.Value.Year,
                            month = result.BirthDate.Value.Month,
                            day = result.BirthDate.Value.Day
                        };
                    }
                    
                    if (result.DateOfAdmission != null && result.DateOfAdmission.Value.Day > 0)
                    {
                        result.ngbDateOfAdmission = new SchoolNgbDateModel
                        {
                            year = result.DateOfAdmission.Value.Year,
                            month = result.DateOfAdmission.Value.Month,
                            day = result.DateOfAdmission.Value.Day
                        };
                    }
                      
                    if (result.DateOfLeavingLastSchool != null && result.DateOfLeavingLastSchool.Value.Day > 0)
                    {
                        result.ngbDateOfLeavingLastSchool = new SchoolNgbDateModel
                        {
                            year = result.DateOfLeavingLastSchool.Value.Year,
                            month = result.DateOfLeavingLastSchool.Value.Month,
                            day = result.DateOfLeavingLastSchool.Value.Day
                        };
                    }
                }
                return Ok(result);
           

        }
        [Authorize]
        [HttpPost]
        [Route("StudentProfileUpsert")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<StudentIdModelResponse>> StudentProfileUpsert()
        {
           
                int userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                StudentDto studentModel = JsonConvert.DeserializeObject<StudentDto>(Request.Form["studentProfile"], new TrimmingConverter());
                if (studentModel.ngbBirthDate != null && studentModel.ngbBirthDate.day > 0)
                    studentModel.BirthDate = new DateTime(studentModel.ngbBirthDate.year,
                                        studentModel.ngbBirthDate.month,
                                        studentModel.ngbBirthDate.day);
                if (studentModel.ngbDateOfAdmission != null && studentModel.ngbDateOfAdmission.day > 0)
                    studentModel.DateOfAdmission = new DateTime(studentModel.ngbDateOfAdmission.year,
                                        studentModel.ngbDateOfAdmission.month,
                                        studentModel.ngbDateOfAdmission.day);
                if(studentModel.ngbDateOfLeavingLastSchool != null && studentModel.ngbDateOfLeavingLastSchool.day > 0)
                studentModel.DateOfLeavingLastSchool = new DateTime(studentModel.ngbDateOfLeavingLastSchool.year,
                                        studentModel.ngbDateOfLeavingLastSchool.month,
                                        studentModel.ngbDateOfLeavingLastSchool.day);
                

                IFormFileCollection files = Request.Form.Files;
                if (files?.Count() > 0)
                {
                   await ProcessStudentProfileImage(files, studentModel);
                }
                return Ok(await _studentService.StudentProfileUpsert(studentModel, userId));
           
        }
        private async Task ProcessStudentProfileImage(IFormFileCollection files, StudentDto studentModel)
        {
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    studentModel.ProfileImageURL =  await _storageService.UploadFileAsync(UploadFileType.STUDENT_UPLOAD, file);
                }
            }
        }

        [Authorize]
        [HttpPost]
        [Route("GetStudentList")]
        public async Task<ActionResult<DatatableResponseModel>> GetStudentList(DatatableRequestWrapper requestObjectWrapper)
        {
            
                var studentList = await _studentService.GetStudentList(requestObjectWrapper);
                return Ok(studentList);
            
        }

        [Authorize]
        [HttpDelete]
        [Route("StudentProfileDelete")]
        public async Task<ActionResult<StudentDeleteRespose>> StudentProfileDelete(long studentId, int academicYearId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _studentService.StudentProfileDelete(studentId, academicYearId, userId));
        }

        [Authorize]
        [HttpGet]
        [Route("GetQRCodeDetailByStudentId")]
        public async Task<ActionResult<string>> GetQRCodeByStudentId(long StudentId, int AcademicYearId)
        {
            string schoolCode= User.Claims.FirstOrDefault(x => x.Type == "SchoolCode").Value;
            var studentQRDetail = await _studentService.GetQRCodeDetailByStudentId(StudentId, AcademicYearId);
            var lstStudent = new List<StudentQRSelectResponse>() { studentQRDetail };
            var chunkedLstStudent = lstStudent.Chunk(1);
            List<string> lstImagePath = new List<string>();
            foreach (var students in chunkedLstStudent)
            {
                string zplCommand = _zplHelper.GenerateZplForStudents(students.ToList(), schoolCode);
                string imagePath = await _zplHelper.GetZPLImagePath(zplCommand);
                lstImagePath.Add(imagePath);
            }
            var pdfFilePath =await _zplHelper.GeneratePdfFromImages(lstImagePath);
            var blobFilePath = await _storageService.UploadFileAsync(UploadFileType.STUDENT_QR_UPLOAD, pdfFilePath);
            RemoveFiles(lstImagePath);
            RemoveFiles(new List<string> { pdfFilePath });
            return Ok(blobFilePath);
        }

        [Authorize]
        [HttpGet]
        [Route("GetQRCodeDetailForAllStudent")]
        public async Task<ActionResult<string>> GetQRCodeDetailForAllStudent(int AcademicYearId,int ClassId)
        {
            string schoolCode = User.Claims.FirstOrDefault(x => x.Type == "SchoolCode").Value;
            var studentCount = await _studentService.GetStudentCountByClass(AcademicYearId, ClassId);
            var lstStudent = Enumerable.Range(1, studentCount).Select(x=> (x,Guid.NewGuid()));
            var chunkedLstStudent=  lstStudent.Chunk(16);
            List<string> lstImagePath = new List<string>();
            foreach (var students in chunkedLstStudent)
            {
               string zplCommand= _zplHelper.GenerateZplByStudentCount(students.ToList(), schoolCode);
               string imagePath= await _zplHelper.GetZPLImagePath(zplCommand);
               lstImagePath.Add(imagePath);
            }
            var pdfFilePath = await _zplHelper.GeneratePdfFromImages(lstImagePath);
            var blobFilePath= await _storageService.UploadFileAsync(UploadFileType.STUDENT_QR_UPLOAD, pdfFilePath);
            RemoveFiles(lstImagePath);
            RemoveFiles(new List<string> { pdfFilePath });
            return Ok(blobFilePath);
        }

        private void RemoveFiles(List<string> lstFilePath)
        {
            foreach (var file in lstFilePath)
            {
                if (System.IO.File.Exists(file))
                {
                    System.IO.File.Delete(file);
                }
            }
        }
    }
}
