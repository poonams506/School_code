using Microsoft.AspNetCore.Mvc;

namespace SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule
{
    public interface IStudentAttendanceDateWiseReportRepository
    {
        public Task<DatatableResponseModel> StudentAttendanceReportDateWise (DatatableRequestWrapper requestObjectWrapper);

      //  public Task<IActionResult> CheckAttendanceDateForHoliday (DateTime attendanceDateTime)

    }
}
