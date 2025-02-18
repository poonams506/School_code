using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.CBSE_ExamModule
{
    public class CBSE_ExamMasterDto
    {
        public long ExamMasterId { get; set; } = 0;
        public int? AcademicYearId { get; set; }
        public string ExamName { get; set; } = string.Empty;
        public int ExamTypeId { get; set; } = 0;
        public string ExamTypeName { get; set; } = string.Empty;
        public int TermId { get; set; } = 0;
        public string TermName { get; set; } = string.Empty;
        public int? UserId { get; set; }
       public DateTime? CreatedDate { get; set; }
       public SchoolNgbDateModel? ngbCalendarDate { get; set; }
    }
    public class ExamMasterDeleteResponceDto
    {
        public int AffectedRows { get; set; } = 0;
        public int ExamMappingCount { get; set; } = 0;
        public int ExamObjectCount { get; set; } = 0;
    }
}
