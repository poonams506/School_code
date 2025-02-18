using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.Repository.Interfaces.ExportModule
{
    public interface ITeacherExportRepository
    {
        public Task<ResponseExportTeacherDataDto> ExportTeacherData();
    }
}
