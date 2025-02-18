using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Repository.Interfaces.ExportModule;
using SchoolApiApplication.Repository.Services.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Services.ExportModule
{
    public class TeacherExportService : ITeacherExportService
    {
        private readonly ITeacherExportRepository _teacherExportRepository;
        public TeacherExportService(ITeacherExportRepository teacherExportRepository)
        {
            _teacherExportRepository = teacherExportRepository;
        }

        public async Task<ResponseExportTeacherDataDto> ExportTeacherData()
        {
            return await _teacherExportRepository.ExportTeacherData();
        }
    }
}
