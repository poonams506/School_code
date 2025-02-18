using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.TeacherAppModule
{
    public class NoticeDto
    {
        public long NoticeId { get; set; } = 0;
        public string NoticeDescription { get; set; } = string.Empty;
        public int? NoticeToType { get; set; }
        public string NoticeTo { get; set; } = string.Empty;
        public bool IsImportant { get; set; }

        public DateTime EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsPublished { get; set; }
        public DateTime StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public string NoticeTitle { get; set; } = string.Empty;


        public string CreatedBy { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedDate { get; set; } = string.Empty;
        public string ModifiedDate { get; set; } = string.Empty;
    }
    public class NoticeListDto
    {
        public List<NoticeDto> NoticeList { get; set; } = new List<NoticeDto>();
    }
}
