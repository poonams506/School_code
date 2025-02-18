using SchoolApiApplication.DTO.ClassTeacherDataModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.Repository.Interfaces.ClassTeacherAttendanceModule
{
    public interface IClassTeacherDataRepository
    {
        public Task<ClassTeacherDataDto> GetClassTeacherData(int AcademicYearId, int UserId);

    }
}
