using SchoolApiApplication.BusinessLayer.Interfaces.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.DTO.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.Repository.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.Repository.Interfaces.TeacherCountPerSubjectAnalyzerModule;
using SchoolApiApplication.Repository.Services.SchoolHolidayModule;

namespace SchoolApiApplication.BusinessLayer.Services.TeacherCountPerSubjectAnalyzerModule
{
    public class TeacherCountPerSubjectAnalyzerService: ITeacherCountPerSubjectAnalyzerService
    {
        private readonly ITeacherCountPerSubjectAnalyzerRepository _teacherCountPerSubjectAnalyzerRepository;

        public TeacherCountPerSubjectAnalyzerService(ITeacherCountPerSubjectAnalyzerRepository teacherCountPerSubjectAnalyzerRepository)
        {

            _teacherCountPerSubjectAnalyzerRepository = teacherCountPerSubjectAnalyzerRepository;
        }

        public async Task<TeacherCountPerSubjectAnalyzerResponseDto> TeacherCountPerSubjectSelect(int AcademicYearId)
        {
            return await _teacherCountPerSubjectAnalyzerRepository.TeacherCountPerSubjectSelect(AcademicYearId);
        }
    }
}
