using SchoolApiApplication.BusinessLayer.Interfaces.ClassTeacherAttendanceModule;
using SchoolApiApplication.DTO.ClassTeacherDataModule;
using SchoolApiApplication.Repository.Interfaces.ClassTeacherAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.TeacherModule;
using SchoolApiApplication.Repository.Services.TeacherModule;

namespace SchoolApiApplication.BusinessLayer.Services.ClassTeacherAttendanceModule
{
    public class ClassTeacherAttendanceService : IClassTeacherDataService
    {
        private readonly IClassTeacherDataRepository _classTeacherAttendanceRepository;

        public ClassTeacherAttendanceService(IClassTeacherDataRepository ClassTeacherAttendanceRepository)
        {
            _classTeacherAttendanceRepository = ClassTeacherAttendanceRepository;
        }

        public async Task<ClassTeacherDataDto> GetClassTeacherData(int AcademicYearId, int UserId)
        {
            return await _classTeacherAttendanceRepository.GetClassTeacherData(AcademicYearId, UserId);
        }
    }
}
