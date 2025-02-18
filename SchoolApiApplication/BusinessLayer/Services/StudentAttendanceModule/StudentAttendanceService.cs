using SchoolApiApplication.BusinessLayer.Interfaces.StudentAttendanceModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;

namespace SchoolApiApplication.BusinessLayer.Services.StudentAttendanceModule
{
    public class StudentAttendanceService : IStudentAttendanceService
    {
        private readonly IStudentAttendanceRepository _studentAttendanceRepository;
        public StudentAttendanceService(IStudentAttendanceRepository studentAttendanceRepository)
        {
            _studentAttendanceRepository = studentAttendanceRepository;
        }

        public async Task<StudentAttendanceGridResponseDto> GetStudentAttendanceGridList(StudentAttendanceRequestDto requestDto)
        {
            return await _studentAttendanceRepository.GetStudentAttendanceGridList(requestDto);

        }

        public async Task<int> GetStudentAttendanceUpsert(StudentAttendanceUpsertDto saudObj, int UserId)
        {
            return await _studentAttendanceRepository.GetStudentAttendanceUpsert(saudObj , UserId);
        }

        public async Task<TeacherDropdownResponseDto> GetAllTeacherForDropDown()
        {
            return await _studentAttendanceRepository.GetAllTeacherForDropDown();
        }

        public async Task<StudentAttendanceMobileResponseDto> GetAttendanceDetailByStudentId(long StudentId, int AcademicYearId)
        {
            return await _studentAttendanceRepository.GetAttendanceDetailByStudentId(StudentId, AcademicYearId);

        }
    }
} 