using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.TeachingLoadAnalysisModule
{
    public interface ITeachingLoadAnalysisService
    {
        public Task<TeachingLoadAnalysisResponseDto> TeacherPercentageSelect(int AcademicYearId);

    }
}
