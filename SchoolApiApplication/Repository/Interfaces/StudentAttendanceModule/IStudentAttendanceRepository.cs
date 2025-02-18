using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule
{
    public interface IStudentAttendanceRepository
    {
        Task<StudentAttendanceGridResponseDto> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto);
        Task<int>GetStudentAttendanceUpsert(StudentAttendanceUpsertDto saudObj , int UserId);
        Task<TeacherDropdownResponseDto> GetAllTeacherForDropDown();
        Task<StudentAttendanceMobileResponseDto> GetAttendanceDetailByStudentId(long StudentId, int AcademicYearId);
    }
}
