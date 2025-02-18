using SchoolApiApplication.DTO.ImportModule;

namespace SchoolApiApplication.Repository.Interfaces.ImportModule
{
    public interface ITeacherImportRepository
    {
        public Task<ResponseImportTeacherDataDto> UploadTeacherData(List<ImportTeacherDataDto> importTeacherDataDto, int UserId, string schoolCode);
    }
}
