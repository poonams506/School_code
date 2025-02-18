using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.StudentModule;
using SchoolApiApplication.Repository.Services.StudentAttendanceModule;
using SchoolApiApplication.Repository.Services.StudentAttendanceModuleModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule
{
    public class StudentAttendanceReportService : IStudentAttendanceReportService
    {
        private readonly IStudentAttendanceReportRepository _studentAttendanceReportRepository;
        public StudentAttendanceReportService(IStudentAttendanceReportRepository studentAttendanceReportRepository)
        {
            _studentAttendanceReportRepository = studentAttendanceReportRepository;
        }
        public async Task<DatatableResponseModel> GetStudentAttendanceReportGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _studentAttendanceReportRepository.GetStudentAttendanceReportGridList(requestObjectWrapper);
        }
    }
}
