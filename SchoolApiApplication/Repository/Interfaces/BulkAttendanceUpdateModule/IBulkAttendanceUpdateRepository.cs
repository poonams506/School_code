using SchoolApiApplication.DTO.BulkAttendanceUpdateModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.Repository.Interfaces.BulkAttendanceUpdateModule
{
    public interface IBulkAttendanceUpdateRepository
    {
        public Task<DatatableResponseModel> ClassAttendanceStatusGridSelect(DatatableRequestWrapper requestObjectWrapper);

        public Task<BulkSelectResponseDto> GetStudentAttendanceByMonthSelect(StudentAttendanceUpdateRequestDto request);

        public Task<int?> StudentAttendanceByMonthUpsert(BulkAttendanceUpdateDto attendanceUpdate, int userId);

        public Task<AttendanceSummaryBulkResponseDto> GetAttendanceSummaryByMonthAsync(StudentAttendanceUpdateRequestDto request);

        public Task<int?> StatusInsert(StudentAttendanceStatusInsertDto obj, int UserId);
    }
}
