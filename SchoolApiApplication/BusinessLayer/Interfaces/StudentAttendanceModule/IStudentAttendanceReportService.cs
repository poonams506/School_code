using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule
{
    public interface IStudentAttendanceReportService
    {
        public Task<DatatableResponseModel> GetStudentAttendanceReportGridList(DatatableRequestWrapper requestObjectWrapper);
        
    }
}
