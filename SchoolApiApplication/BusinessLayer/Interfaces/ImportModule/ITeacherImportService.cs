using SchoolApiApplication.DTO.ImportModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ImportModule
{
    public interface ITeacherImportService
    {
        public Task<ResponseImportTeacherDataDto> UploadTeacherData(List<ImportTeacherDataDto> importTeacherDataDto, int UserId, string schoolCode);

    }
}
