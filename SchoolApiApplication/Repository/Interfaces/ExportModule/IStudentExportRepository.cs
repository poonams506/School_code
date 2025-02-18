using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.Repository.Interfaces.ExportModule
{
    public interface IStudentExportRepository
    {
        public Task<ResponseExportStudentDataDto> ExportStudentData(int AcademicYearId);

    }
}
