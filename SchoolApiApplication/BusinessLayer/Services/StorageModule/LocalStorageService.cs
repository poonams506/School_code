using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using System.Net.Http.Headers;

namespace SchoolApiApplication.BusinessLayer.Services.StorageModule
{
    public class  LocalStorageService:IStorageService
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public LocalStorageService(IConfiguration config, 
            IWebHostEnvironment hostingEnvironment,
            IHttpContextAccessor httpContextAccessor)
        {
            _config = config;
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor= httpContextAccessor;

        }

        public string GetSchoolCode()
        {
            return _httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == "SchoolCode").Value.ToLower();
        }


        public async  Task<string> GetFullPath(UploadFileType fileType, string fileName)
        {
            var fullPath = await Task.FromResult(
                Path.Combine(_config["LocalUpload:LocalBaseUrl"],
                _config["LocalUpload:" + fileType.ToString() + ":UPLOAD_PATH"], 
                fileName));
            fullPath = fullPath.Replace("{SCHOOL_CODE}", GetSchoolCode());
            return fullPath;
        }
        
        public  async Task<string> UploadFileAsync(UploadFileType fileType,IFormFile file)
        {
            var folderPath=await GetFolderPath(fileType);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            FileInfo finfo = new FileInfo(fileName);
            fileName = Guid.NewGuid().ToString() + finfo.Extension;
            string fullPath = Path.Combine(folderPath, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
              await  file.CopyToAsync(stream);
            }
            return await Task.FromResult(fileName);
        }

        public async Task<string> UploadFileAsync(UploadFileType fileType, string FilePath)
        {
            var folderPath = await GetFolderPath(fileType);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            string fileName = Path.GetFileName(FilePath);
            string fullPath = Path.Combine(folderPath, fileName);
            File.Move(FilePath, fullPath);
            return fullPath;
        }

        public async Task<bool> DownloadFileAsync(UploadFileType fileType, string fileName, string destinationPath)
        {
            var folderPath= await  GetFolderPath(fileType);
            if(File.Exists(Path.Combine(folderPath, fileName)))
            {
                FileInfo fileInfo = new FileInfo(destinationPath);
                string directoryFullPath = fileInfo.DirectoryName;

                if(!Directory.Exists(directoryFullPath))
                {
                    Directory.CreateDirectory(directoryFullPath);
                }

                await Task.Run(()=>  File.Copy(Path.Combine(folderPath, fileName), destinationPath));
              return true;
            }
            else
            {
                return false;
            }

        }


        public async  Task<CommonImageFileDto> ReadImageFileAsync(UploadFileType fileType, string fileName)
        {
            var folderPath = await GetFolderPath(fileType);
            CommonImageFileDto imageFileDto = new CommonImageFileDto();
            var imagePath= Path.Combine(folderPath, fileName);
            if (File.Exists(imagePath))
            {
                imageFileDto.LogoImageContentType = ImageHelper.GetMimeType(imagePath);
                imageFileDto.ImageBytes = await File.ReadAllBytesAsync(imagePath);
                imageFileDto.Base64LogoImage = $"data:{imageFileDto.LogoImageContentType};base64,{Convert.ToBase64String(imageFileDto.ImageBytes)}";
            }
            else
            {
                imageFileDto.IsSuccess = false;
            }
            return imageFileDto;
        }

        public async  Task<bool> DeleteFileAsync(UploadFileType fileType, string fileName)
        {
            var folderPath = await GetFolderPath(fileType);
            var fullPath=  Path.Combine(folderPath, fileName);
            if(File.Exists(fullPath))
            {
                await Task.Run(()=>File.Delete(fullPath));
                return true;
            }
            else
            {
                return false;
            }
        }

        private async Task<string> GetFolderPath(UploadFileType fileType)
        {
            var fullPath= await Task.FromResult(Path.Combine(_hostingEnvironment.WebRootPath,
                _config["LocalUpload:" + fileType.ToString() + ":UPLOAD_PATH"]));
            fullPath = fullPath.Replace("{SCHOOL_CODE}", GetSchoolCode());
            return fullPath;
        }
    }
}
