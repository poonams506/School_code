using SchoolApiApplication.BusinessLayer.Interfaces.ImportModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.ImportModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.GradeModule;
using SchoolApiApplication.Repository.Interfaces.ImportModule;
using SchoolApiApplication.Repository.Services.GradeModule;
using System.Data;

namespace SchoolApiApplication.BusinessLayer.Services.ImportModule
{
    public class StudentImportService : IStudentImportService
    {
        private readonly IStudentImportRepository _studentImportRepository;
        public StudentImportService(IStudentImportRepository studentImportRepository)
        {
            _studentImportRepository = studentImportRepository;
        }

        public async Task<ResponseImportStudentDataDto> UploadStudentData(List<ImportStudentDataDto> importStudentDataDto, int UserId, string schoolCode)
        {
            return await _studentImportRepository.UploadStudentData(importStudentDataDto, UserId, schoolCode);
        }
        
    }
}
