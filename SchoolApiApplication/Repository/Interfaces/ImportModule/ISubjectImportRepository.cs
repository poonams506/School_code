using SchoolApiApplication.DTO.ImportModule;

namespace SchoolApiApplication.Repository.Interfaces.ImportModule
{
    public interface ISubjectImportRepository
    {
        public Task<int> UploadSubjectData(List<ImportSubjectDataDto> importSubjectDataDto, int UserId, string schoolCode);

    }
}
