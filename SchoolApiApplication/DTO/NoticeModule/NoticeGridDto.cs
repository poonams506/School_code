using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.NoticeModule
{
    public class NoticeGridDto
    {
        public long NoticeId { get; set; } = 0;
        public string NoticeDescription { get; set; } = string.Empty;
        public int? NoticeToType { get; set; }
        public DateTime EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsPublished { get; set; }
        public DateTime StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public string NoticeTitle { get; set; } = string.Empty;

        public string SubjectName { get; set; } = string.Empty;

        public string CreatedBy { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedDate { get; set; } = string.Empty;
        public string ModifiedDate { get; set; } = string.Empty;
    }
}
