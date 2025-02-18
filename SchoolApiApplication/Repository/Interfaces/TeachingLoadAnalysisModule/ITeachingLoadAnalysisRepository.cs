using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;

namespace SchoolApiApplication.Repository.Interfaces.TeachingLoadAnalysisModule
{
    public interface ITeachingLoadAnalysisRepository
    {

        public Task<TeachingLoadAnalysisResponseDto> TeacherPercentageSelect(int AcademicYearId);

    }
}
