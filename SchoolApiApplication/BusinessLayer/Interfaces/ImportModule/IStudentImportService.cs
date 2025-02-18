using SchoolApiApplication.DTO.ImportModule;
using System.Data;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ImportModule
{
    public interface IStudentImportService
    {
        public Task<ResponseImportStudentDataDto> UploadStudentData(List<ImportStudentDataDto> importStudentDataDto, int UserId, string schoolCode);
       
        
    }
}
