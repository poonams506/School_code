using SchoolApiApplication.DTO.ClassWiseTeacherAndStudentDto;
using SchoolApiApplication.DTO.SchoolCalendarModule;

namespace SchoolApiApplication.Repository.Interfaces.ClassWiseTeacherAndStudentModule
{
    public interface IClassWiseTeacherAndStudentRepository
    {
        public Task<ClassTeacherResponseDto> ClassTeacherSelect(int AcademicYearId);
        public Task<ClassWiseStudentResponseDto> ClassWiseStudentSelect(int AcademicYearId,int ClassTeacherId);
    }
}
