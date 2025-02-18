namespace SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule
{
    public interface IStudentAttendanceDateWiseReportService
    {
        public Task<DatatableResponseModel> StudentAttendanceReportDateWise(DatatableRequestWrapper requestObjectWrapper);

    }
}
