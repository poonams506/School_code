using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassWiseTeacherAndStudentModule;
using SchoolApiApplication.DTO.ClassWiseTeacherAndStudentDto;
using SchoolApiApplication.Repository.Interfaces.ClassTeacherAttendanceModule;
using SchoolApiApplication.Repository.Interfaces.ClassWiseTeacherAndStudentModule;

namespace SchoolApiApplication.BusinessLayer.Services.ClassWiseTeacherAndStudentModule
{
    public class ClassWiseTeacherAndStudentService : IClassWiseTeacherAndStudentService
    {
        private readonly IClassWiseTeacherAndStudentRepository _classWiseTeacherAndStudentRepository;

        public ClassWiseTeacherAndStudentService(IClassWiseTeacherAndStudentRepository ClassWiseTeacherAndStudentRepository)
        {
            _classWiseTeacherAndStudentRepository = ClassWiseTeacherAndStudentRepository;
        }

        public async Task<ClassTeacherResponseDto> ClassTeacherSelect(int AcademicYearId)
        {
            return await _classWiseTeacherAndStudentRepository.ClassTeacherSelect(AcademicYearId);
        }

        public async Task<ClassWiseStudentResponseDto> ClassWiseStudentSelect(int AcademicYearId, int ClassTeacherId)
        {
            return await _classWiseTeacherAndStudentRepository.ClassWiseStudentSelect(AcademicYearId, ClassTeacherId);
        }
    }
}
