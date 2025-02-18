using SchoolApiApplication.DTO.ExportModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ExportModule
{
    public interface ITeacherExportService
    {
        public Task<ResponseExportTeacherDataDto> ExportTeacherData();
    }
}
