
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StudentDocumentModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.Helper.Interfaces;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.StudentDocumentModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDocumentController : ControllerBase
    {


        private readonly IStudentDocumentService _studentDocumentService;
        private readonly IStorageService _storageService;

        public StudentDocumentController(
            IStudentDocumentService studentDocumentService,
            IStorageService storageService)
        {
            _studentDocumentService = studentDocumentService;
            _storageService = storageService;
        }
       

        [Authorize]
        [HttpGet("GetStudentDocumentSelect")]
        public async Task<ActionResult<StudentDocumentDto>> GetStudentDocumentSelect(long documentId)
        {
            var result = await _studentDocumentService.GetStudentDocumentSelect(documentId);
            var imageResult = await _storageService.ReadImageFileAsync(UploadFileType.STUDENT_UPLOAD, result.DocumentUrl);
            if (imageResult.IsSuccess)
            {
                result.DocumentImageContentType = imageResult.LogoImageContentType;
                result.DocumentBase64Image = imageResult.Base64LogoImage;
            }
                
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("GetStudentDocumentList")]
        public async Task<ActionResult<StudentDocumentDto>> GetStudentDocumentList(long studentId)
        {

            var studentDocumentList = await _studentDocumentService.GetStudentDocumentList(studentId);

            foreach (var document in studentDocumentList.StudentDocuments)
            {
                var imageResult = await _storageService.ReadImageFileAsync(UploadFileType.STUDENT_UPLOAD, document.DocumentUrl);
                if (imageResult.IsSuccess)
                {
                    document.DocumentImageContentType = imageResult.LogoImageContentType;
                    document.DocumentBase64Image = imageResult.Base64LogoImage;
                }

            }

            return Ok(studentDocumentList);

        }

        [Authorize]
        [HttpPost]
        [Route("StudentDocumentInsert")]
        [DisableRequestSizeLimit]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public async Task<ActionResult<int>> StudentDocumentInsert()
        {
            
                int UserId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                StudentDocumentDto documentModel = JsonConvert.DeserializeObject<StudentDocumentDto>(Request.Form["studentDocuments"], new TrimmingConverter());

                IFormFileCollection files = Request.Form.Files;
                List<string> labels = Request.Form["label[]"].ToList();
                if (files?.Count > 0)
                {
                  await  ProcessStudentDocument(files, labels, documentModel);
                }
                return Ok(await _studentDocumentService.StudentDocumentInsert(documentModel,UserId));
           
        }
        private async Task ProcessStudentDocument(IFormFileCollection files, List<string> labels, StudentDocumentDto documentModel)
        {
           
            for (int i = 0; i < files.Count; i++)
            {
                var file = files[i];
                var label = labels[i];
                if (file.Length > 0)
                {
                    string nameExtention = await _storageService.UploadFileAsync(UploadFileType.STUDENT_UPLOAD, file);
                    string documentName = label;
                    documentModel.StudentDocuments.Add(new StudentDocumentTypeDto
                    {
                        DocumentName = documentName,
                        DocumentUrl = nameExtention,
                        DocumentFileType = file.ContentType
                    });
                }
            }
        }

        [Authorize]
        [HttpGet("StudentDocumentDelete")]
        public async Task<ActionResult<int>> StudentDocumentDelete(long documentId)
        {
           
                int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
                return Ok(await _studentDocumentService.StudentDocumentDelete(documentId, userId));
            
        }


    }

}
