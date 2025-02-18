using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule
{
    public interface IStudentAttendanceService
    {
        public Task<StudentAttendanceGridResponseDto> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto);
        public Task<int> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto saudObj, int UserId);
        public Task<TeacherDropdownResponseDto> GetAllTeacherForDropDown();
        public Task<StudentAttendanceMobileResponseDto> GetAttendanceDetailByStudentId(long StudentId, int AcademicYearId);
    }

}
