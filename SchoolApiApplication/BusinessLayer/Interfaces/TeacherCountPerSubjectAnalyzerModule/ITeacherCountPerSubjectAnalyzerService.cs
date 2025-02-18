using SchoolApiApplication.DTO.TeacherCountPerSubjectAnalyzerModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.TeacherCountPerSubjectAnalyzerModule
{
    public interface ITeacherCountPerSubjectAnalyzerService
    {
        public Task<TeacherCountPerSubjectAnalyzerResponseDto> TeacherCountPerSubjectSelect(int AcademicYearId);

    }
}
