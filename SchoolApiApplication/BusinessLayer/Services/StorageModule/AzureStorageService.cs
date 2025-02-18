using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using System.Net.Http.Headers;

namespace SchoolApiApplication.BusinessLayer.Services.StorageModule
{
    public class AzureStorageService : IStorageService
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AzureStorageService(IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {

            _config = config;
            _httpContextAccessor = httpContextAccessor;

        }
        public async Task<string> GetFullPath(UploadFileType fileType, string fileName)
        {
            var fullPath=  new Uri(_config["AzureBlobUpload:AzureBlobBaseUrl"]).Append(
                GetSchoolCode(),
                _config["AzureBlobUpload:" + fileType.ToString() + ":UPLOAD_PATH"], 
                fileName).AbsoluteUri;
            return await Task.FromResult(fullPath);
        }
        public string GetSchoolCode()
        {
            return _httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == "SchoolCode").Value.ToLower();
        }
        public async Task<string> UploadFileAsync(UploadFileType fileType, IFormFile file)
        {
            BlobContainerClient containerClient = await GetBlobServiceClient();

            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            FileInfo finfo = new FileInfo(fileName);
            fileName = Guid.NewGuid().ToString() + finfo.Extension;

            BlobClient blobClient = containerClient.GetBlobClient(Path.Combine(await GetFolderPath(fileType), fileName));

            using (Stream stream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, true);
            }
            return await Task.FromResult(fileName);
        }
        public async  Task<string> UploadFileAsync(UploadFileType fileType, string FilePath)
        {
            BlobContainerClient containerClient = await GetBlobServiceClient();
            BlobClient blobClient = containerClient.GetBlobClient(Path.Combine(await GetFolderPath(fileType), Path.GetFileName(FilePath)));

            using (FileStream fileStream = File.OpenRead(FilePath))
            {
                var blobHttpHeaders = new BlobHttpHeaders { ContentType = GetContentType(FilePath) };
                await blobClient.UploadAsync(fileStream, blobHttpHeaders);
               
            }
            return blobClient.Uri.ToString();
        }


        private  string GetContentType(string filePath)
        {
            var extension = Path.GetExtension(filePath).ToLowerInvariant();
            return extension switch
            {
                ".txt" => "text/plain",
                ".jpg" => "image/jpeg",
                ".png" => "image/png",
                ".pdf" => "application/pdf",
                ".doc" => "application/msword",
                ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ".xls" => "application/vnd.ms-excel",
                ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                _ => "application/octet-stream",
            };
        }


        public async Task<bool> DownloadFileAsync(UploadFileType fileType, string fileName, string destinationPath)
        {
            BlobContainerClient containerClient = await GetBlobServiceClient();
            BlobClient blobClient = containerClient.GetBlobClient(Path.Combine(await GetFolderPath(fileType), fileName));

           if( await blobClient.ExistsAsync())
            {
                FileInfo fileInfo = new FileInfo(destinationPath);
                string directoryFullPath = fileInfo.DirectoryName;

                if (!Directory.Exists(directoryFullPath))
                {
                    Directory.CreateDirectory(directoryFullPath);
                }

                BlobDownloadInfo blobDownloadInfo = await blobClient.DownloadAsync();
                using (FileStream fileStream = File.OpenWrite(destinationPath))
                {
                    await blobDownloadInfo.Content.CopyToAsync(fileStream);
                }
                return true;
            }
            else
            {
                return false;
            }

           
        }
        public async Task<CommonImageFileDto> ReadImageFileAsync(UploadFileType fileType, string fileName)
        {
            BlobContainerClient containerClient = await GetBlobServiceClient();
            BlobClient blobClient = containerClient.GetBlobClient(Path.Combine(await GetFolderPath(fileType), fileName));
            CommonImageFileDto imageFileDto = new CommonImageFileDto();
            if (await blobClient.ExistsAsync())
            {
                BlobDownloadInfo download = await blobClient.DownloadAsync();
                using (MemoryStream ms = new MemoryStream())
                {
                    await download.Content.CopyToAsync(ms);
                    imageFileDto.LogoImageContentType = ImageHelper.GetMimeType(Path.Combine(await GetFolderPath(fileType), fileName));
                    imageFileDto.ImageBytes = ms.ToArray();
                    imageFileDto.Base64LogoImage = $"data:{imageFileDto.LogoImageContentType};base64,{Convert.ToBase64String(imageFileDto.ImageBytes)}";

                }
            }
            else
            {
                imageFileDto.IsSuccess = false;
            }
            return imageFileDto;

        }
        public async Task<bool> DeleteFileAsync(UploadFileType fileType, string fileName)
        {
            BlobContainerClient containerClient = await GetBlobServiceClient();
            BlobClient blobClient = containerClient.GetBlobClient(Path.Combine(await GetFolderPath(fileType), fileName));
           
            return await blobClient.DeleteIfExistsAsync();
        }

        private async Task<BlobContainerClient> GetBlobServiceClient()
        {
            string connectionString = _config["AzureBlobUpload:ConnectionString"];
            string containerName = GetSchoolCode();

            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            await containerClient.CreateIfNotExistsAsync(publicAccessType:PublicAccessType.Blob);
            return containerClient;
        }

        private async Task<string> GetFolderPath(UploadFileType fileType)
        {
            var folderPath = await Task.FromResult(Path.Combine(
                _config["AzureBlobUpload:" + fileType.ToString() + ":UPLOAD_PATH"]));
           return folderPath;
        }
    }
}
