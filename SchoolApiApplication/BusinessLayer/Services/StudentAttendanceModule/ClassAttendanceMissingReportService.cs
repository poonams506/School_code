using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule
{
    public class ClassAttendanceMissingReportService : IClassAttendanceMissingReportService
    {
        private readonly IClassAttendanceMissingReportRepository _classAttendanceMissingReportRepository;
        public ClassAttendanceMissingReportService(IClassAttendanceMissingReportRepository classAttendanceMissingReportRepository)
        {
            _classAttendanceMissingReportRepository = classAttendanceMissingReportRepository;
        }
        public async Task<ClassAttendanceMissingReportResponseDto> ClassAttendanceMissingReport(int AcademicYearId, int RefId, int RoleId)
        {
            return await _classAttendanceMissingReportRepository.ClassAttendanceMissingReport(AcademicYearId, RefId, RoleId);

        }
    }
}
