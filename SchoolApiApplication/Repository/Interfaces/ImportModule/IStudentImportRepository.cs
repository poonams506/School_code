using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.ImportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Interfaces.ImportModule
{
    public interface IStudentImportRepository
    {
        public Task<ResponseImportStudentDataDto> UploadStudentData(List<ImportStudentDataDto> importStudentDataDto, int UserId,string schoolCode);
     

    }
}
