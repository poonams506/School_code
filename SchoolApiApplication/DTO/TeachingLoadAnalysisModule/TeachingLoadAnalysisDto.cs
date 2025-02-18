using SchoolApiApplication.DTO.SchoolCalendarModule;

namespace SchoolApiApplication.DTO.TeachingLoadAnalysisModule
{
    public class TeachingLoadAnalysisDto
    {
        public int? AcademicYearId { get; set; }
        public int? TeacherId { get; set; }
        
        public string FullName { get; set; } = string.Empty;

        public int? ClassTimeTableId { get; set; }

        public int? ClassTimeTableCount { get; set; }

        public int? LecturePerWeek { get; set; }

        public string TeacherPercentage { get; set; } = string.Empty;

    }

    public class TeachingLoadAnalysisResponseDto
    {
        public List<TeachingLoadAnalysisDto>? TeacherPercentageList { get; set; } = new List<TeachingLoadAnalysisDto>();

    }

}
