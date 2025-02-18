using SchoolApiApplication.BusinessLayer.Interfaces.ImportModule;
using SchoolApiApplication.DTO.ImportModule;
using SchoolApiApplication.Repository.Interfaces.ImportModule;
using SchoolApiApplication.Repository.Services.ImportModule;

namespace SchoolApiApplication.BusinessLayer.Services.ImportModule
{
    public class SubjectImportService : ISubjectImportService
    {
        private readonly ISubjectImportRepository _subjectImportRepository;
        public SubjectImportService(ISubjectImportRepository subjectImportRepository)
        {
            _subjectImportRepository = subjectImportRepository;
        }
        public async Task<int> UploadSubjectData(List<ImportSubjectDataDto> importSubjectDataDto, int UserId, string schoolCode)
        {
            return await _subjectImportRepository.UploadSubjectData(importSubjectDataDto, UserId, schoolCode);
        }
    }
}
