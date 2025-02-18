using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.TeacherAppModule
{
    public class HomeworkDto
    {
        public long HomeworkId { get; set; } = 0;
        public string HomeworkDescription { get; set; } = string.Empty;
        public int? ClassId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public string? DivisionName { get; set; } = string.Empty;
        public DateTime EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }

        public string Status { get; set; } = string.Empty;

        public bool IsPublished { get; set; }
        public DateTime StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public string HomeworkTitle { get; set; } = string.Empty;

        public string SubjectName { get; set; } = string.Empty;

        public string CreatedBy { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedDate { get; set; } = string.Empty;
        public string ModifiedDate { get; set; } = string.Empty;
    }

    public class HomeworkListDto
    {
        public List<HomeworkDto> HomeworkList { get; set; } = new List<HomeworkDto>();
    }
}
