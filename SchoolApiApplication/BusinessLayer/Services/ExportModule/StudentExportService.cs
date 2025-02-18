using SchoolApiApplication.BusinessLayer.Interfaces.ExportModule;
using SchoolApiApplication.DTO.ExportModule;
using SchoolApiApplication.Repository.Interfaces.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Services.ExportModule
{
    public class StudentExportService : IStudentExportService
    {
        private readonly IStudentExportRepository _studentExportRepository;
        public StudentExportService(IStudentExportRepository studentExportRepository)
        {
            _studentExportRepository = studentExportRepository;
        }

        public async Task<ResponseExportStudentDataDto> ExportStudentData(int AcademicYearId)
        {
            return await _studentExportRepository.ExportStudentData(AcademicYearId);
        }
    }
}
