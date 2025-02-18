using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.NoticeModule
{
    public class TeacherNoticeRequestDto
    {
        public Int16 AcademicYearId { get; set; } = 0;
        public Int16 RoleType { get; set; } = 0;
        public Int16 GradeId { get; set; } = 0;
        public Int16 DivisionId { get; set; } = 0;
        public int TeacherId { get; set; } = 0;
        public DateTime? FromDate { get; set; }
        public SchoolNgbDateModel? ngbfromDate { get; set; }
        public DateTime? TillDate { get; set; }
        public SchoolNgbDateModel? ngbtillDate { get; set; }
    }
}
