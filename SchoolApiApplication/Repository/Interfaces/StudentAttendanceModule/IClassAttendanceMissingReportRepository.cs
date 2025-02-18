using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule
{
    public interface IClassAttendanceMissingReportRepository
    {
        public Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int RefId, int RoleId);

    }
}
