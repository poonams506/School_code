using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.Repository.Interfaces.TeacherCountPerSubjectAnalyzerModule;

namespace SchoolApiApplication.Repository.Interfaces.TeacherCountPerSubjectAnalyzerModule
{
    public interface ITeacherCountPerSubjectAnalyzerRepository
    {
        public Task<TeacherCountPerSubjectAnalyzerResponseDto> TeacherCountPerSubjectSelect(int AcademicYearId);

    }
}
