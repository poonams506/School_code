using SchoolApiApplication.DTO.ImportModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ImportModule
{
    public interface ISubjectImportService
    {
        public Task<int> UploadSubjectData(List<ImportSubjectDataDto> importSubjectDataDto, int UserId, string schoolCode);

    }
}
