using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.NoticeModule
{
    public class NoticeTeacherAppSelectDto
    {
        public long NoticeId { get; set; } = 0;
        public long StudentId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public bool IsImportant { get; set; }
        public int NoticeToType { get; set; }
        public string NoticeTitle { get; set; } = string.Empty;
        public string NoticeDescription { get; set; } = string.Empty;
        public DateTime FromDate { get; set; }
        public SchoolNgbDateModel? ngbFromDate { get; set; }
        public DateTime TillDate { get; set; }
        public SchoolNgbDateModel? ngbTillDate { get; set; }
        public DateTime StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public bool IsPublished { get; set; }
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public int UserId { get; set; }
    }
    public class NoticeTeacherAppSelectResponseDto
    {

        public List<NoticeTeacherAppSelectDto>? NoticeList { get; set; } = new List<NoticeTeacherAppSelectDto>();
    }
}
