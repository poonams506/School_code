using SchoolApiApplication.DTO.BulkAttendanceUpdateModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.BulkAttendanceUpdateModule
{
    public interface IBulkAttendanceUpdateService
    {
        public Task<DatatableResponseModel> ClassAttendanceStatusGridSelect(DatatableRequestWrapper requestObjectWrapper);
        public Task<BulkSelectResponseDto> GetStudentAttendanceByMonthSelect(StudentAttendanceUpdateRequestDto request);

        public Task<int?> StudentAttendanceByMonthUpsert(BulkAttendanceUpdateDto attendanceUpdate, int UserId);

        public Task<AttendanceSummaryBulkResponseDto> GetAttendanceSummaryByMonthAsync(StudentAttendanceUpdateRequestDto request);

        public Task<int?> StatusInsert(StudentAttendanceStatusInsertDto obj, int UserId);


    }
}
