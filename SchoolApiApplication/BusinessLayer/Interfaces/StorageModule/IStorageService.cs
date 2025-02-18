using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.StorageModule
{
    public interface IStorageService
    {
        Task<string> GetFullPath(UploadFileType fileType, string fileName);
        Task<string> UploadFileAsync(UploadFileType fileType, IFormFile file);
        Task<string> UploadFileAsync(UploadFileType fileType, string FilePath);
        Task<bool> DownloadFileAsync(UploadFileType fileType, string fileName, string destinationPath);
        Task<CommonImageFileDto> ReadImageFileAsync(UploadFileType fileType, string fileName);
        Task<bool> DeleteFileAsync(UploadFileType fileType, string fileName);
    }
}
