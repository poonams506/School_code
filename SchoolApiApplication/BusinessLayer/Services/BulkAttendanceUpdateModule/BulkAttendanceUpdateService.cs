using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.BulkAttendanceUpdateModule;
using SchoolApiApplication.DTO.BulkAttendanceUpdateModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.BulkAttendanceUpdateModule;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamModule;

namespace SchoolApiApplication.BusinessLayer.Services.BulkAttendanceUpdateModule
{
    public class BulkAttendanceUpdateService : IBulkAttendanceUpdateService
    {
        private readonly IBulkAttendanceUpdateRepository _bulkAttendanceUpdateRepository;
            
        public BulkAttendanceUpdateService( IBulkAttendanceUpdateRepository  bulkAttendanceUpdateRepository)
        {
            _bulkAttendanceUpdateRepository = bulkAttendanceUpdateRepository;
        }

        public async Task<DatatableResponseModel> ClassAttendanceStatusGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _bulkAttendanceUpdateRepository.ClassAttendanceStatusGridSelect(requestObjectWrapper);

        }

        public async Task<BulkSelectResponseDto> GetStudentAttendanceByMonthSelect(StudentAttendanceUpdateRequestDto obj)
        {
            return await _bulkAttendanceUpdateRepository.GetStudentAttendanceByMonthSelect(obj);
        }

        public async Task<int?> StudentAttendanceByMonthUpsert(BulkAttendanceUpdateDto obj, int UserId)
        {
            return await _bulkAttendanceUpdateRepository.StudentAttendanceByMonthUpsert(obj, UserId);
        }


        public async Task<AttendanceSummaryBulkResponseDto> GetAttendanceSummaryByMonthAsync(StudentAttendanceUpdateRequestDto request)
        {
            return await _bulkAttendanceUpdateRepository.GetAttendanceSummaryByMonthAsync(request);
        }

        public async Task<int?> StatusInsert(StudentAttendanceStatusInsertDto obj, int UserId)
        {
            return await _bulkAttendanceUpdateRepository.StatusInsert(obj, UserId);
        }
    }
}