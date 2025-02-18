using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.Repository.Services.StudentAttendanceModuleModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule
{
    public class StudentAttendanceDatewiseReportService: IStudentAttendanceDateWiseReportService
    {
        private readonly IStudentAttendanceDateWiseReportRepository _studentAttendanceDateWiseReportRepository;
        public StudentAttendanceDatewiseReportService(IStudentAttendanceDateWiseReportRepository studentAttendanceDateWiseReportRepository)
        {
            _studentAttendanceDateWiseReportRepository = studentAttendanceDateWiseReportRepository;
        }

        public async Task<DatatableResponseModel> StudentAttendanceReportDateWise(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _studentAttendanceDateWiseReportRepository.StudentAttendanceReportDateWise(requestObjectWrapper);
        }
    }
}
