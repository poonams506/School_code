using SchoolApiApplication.BusinessLayer.Interfaces.TeachingLoadAnalysisModule;
using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;
using SchoolApiApplication.Repository.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.Repository.Interfaces.TeachingLoadAnalysisModule;
using SchoolApiApplication.Repository.Services.SchoolHolidayModule;

namespace SchoolApiApplication.BusinessLayer.Services.TeachingLoadAnalysisModule
{
    public class TeachingLoadAnalysisService: ITeachingLoadAnalysisService
    {

        private readonly ITeachingLoadAnalysisRepository _teachingLoadAnalysisRepository;

        public TeachingLoadAnalysisService(ITeachingLoadAnalysisRepository teachingLoadAnalysisRepository)
        {

            _teachingLoadAnalysisRepository = teachingLoadAnalysisRepository;
        }

        public async Task<TeachingLoadAnalysisResponseDto> TeacherPercentageSelect(int AcademicYearId)
        {
            return await _teachingLoadAnalysisRepository.TeacherPercentageSelect(AcademicYearId);
        }
    }
}
