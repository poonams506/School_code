using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule
{
    public interface IClassAttendanceMissingReportService
    {
        public Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int RefId, int RoleId);
    }
}
