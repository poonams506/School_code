using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ExportModule
{
    public interface IStudentExportService
    {
        public Task<ResponseExportStudentDataDto> ExportStudentData(int AcademicYearId);
    }
}
