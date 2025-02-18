namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class TeacherOneDayLecturesParentAppDto
    {
        public int? AcademicYearId { get; set; }
        //public int? TeacherId { get; set; }
        public string TeacherName { get; set; } = string.Empty;
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public int? GradeId { get; set; }
        public int? ClassId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public int? DivisionId { get; set; }
        public string DivisionName { get; set; } = string.Empty;
        public int? DayNo { get; set; }
        public int? SubjectId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
    }
    public class TeacherOneDayLecturesParentAppResponseDto
    {
        public List<TeacherOneDayLecturesParentAppDto>? TeacherOneDayLectureList { get; set; } = new List<TeacherOneDayLecturesParentAppDto>();
    }

}
