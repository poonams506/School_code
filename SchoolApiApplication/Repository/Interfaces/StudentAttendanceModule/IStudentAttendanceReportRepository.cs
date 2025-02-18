using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule
{
    public interface IStudentAttendanceReportRepository
    {
        public Task<DatatableResponseModel> GetStudentAttendanceReportGridList(DatatableRequestWrapper requestObjectWrapper);
    
    }
}
