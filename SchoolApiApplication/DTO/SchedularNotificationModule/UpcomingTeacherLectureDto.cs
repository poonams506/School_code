namespace SchoolApiApplication.DTO.SchedularNotificationModule
{
    public class UpcomingTeacherLectureDto
    {
        public int AcademicYearId { get; set; }
        public long TeacherId { get; set; }
        public string? SubjectName { get; set; }
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
    }

    public class UpcomingTeacherLectureResponseDto
    {
        public List<UpcomingTeacherLectureDto>? UpcomingTeacherLectureList { get; set; } = new List<UpcomingTeacherLectureDto>();
    }
}
