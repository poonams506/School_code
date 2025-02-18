using SchoolApiApplication.DTO.ClassTeacherDataModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ClassTeacherAttendanceModule
{
    public interface IClassTeacherDataService
    {
        public Task<ClassTeacherDataDto> GetClassTeacherData(int AcademicYearId, int UserId);

    }
}
