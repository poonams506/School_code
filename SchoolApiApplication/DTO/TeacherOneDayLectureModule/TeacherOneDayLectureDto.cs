using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;

namespace SchoolApiApplication.DTO.TeacherOneDayLectureModule
{
    public class TeacherOneDayLectureDto
    {
        public int? AcademicYearId { get; set; }
        public int? TeacherId { get; set; }
        public string TeacherName { get; set; } = string.Empty;
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }    
        public int? GradeId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public int? DivisionId { get; set; }
        public string DivisionName { get; set; } = string.Empty;
        public int? DayNo { get; set; }
        public int? SubjectId { get; set; }
        public string SubjectName { get; set; }= string.Empty;

    }
    public class TeacherOneDayLectureResponseDto
    {
        public List<TeacherOneDayLectureDto>? TeacherOneDayLectureList { get; set; } = new List<TeacherOneDayLectureDto>();
    }

}
