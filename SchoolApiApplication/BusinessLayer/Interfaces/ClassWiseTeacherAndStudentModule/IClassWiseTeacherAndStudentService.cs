using SchoolApiApplication.DTO.ClassWiseTeacherAndStudentDto;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ClassWiseTeacherAndStudentModule
{
    public interface IClassWiseTeacherAndStudentService
    {
        public Task<ClassTeacherResponseDto> ClassTeacherSelect(int AcademicYearId);
        public Task<ClassWiseStudentResponseDto> ClassWiseStudentSelect(int AcademicYearId, int ClassTeacherId);
    }
}
