using SchoolApiApplication.BusinessLayer.Interfaces.ImportModule;
using SchoolApiApplication.DTO.ImportModule;
using SchoolApiApplication.Repository.Interfaces.ImportModule;
using SchoolApiApplication.Repository.Services.ImportModule;

namespace SchoolApiApplication.BusinessLayer.Services.ImportModule
{
    public class TeacherImportService : ITeacherImportService
    {
        private readonly ITeacherImportRepository _teacherImportRepository;
        public TeacherImportService(ITeacherImportRepository teacherImportRepository)
        {
            _teacherImportRepository = teacherImportRepository;
        }

        public async Task<ResponseImportTeacherDataDto> UploadTeacherData(List<ImportTeacherDataDto> importTeacherDataDto, int UserId, string schoolCode)
        {
            return await _teacherImportRepository.UploadTeacherData(importTeacherDataDto, UserId, schoolCode);
        }
    }
}
