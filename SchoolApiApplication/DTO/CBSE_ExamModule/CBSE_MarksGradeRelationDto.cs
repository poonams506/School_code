using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.DTO.CBSE_ExamModule
{
    public class CBSE_MarksGradeRelationDto
    {
        public long MarksGradeRelationId { get; set; } = 0;
        public int? AcademicYearId { get; set; }
        public int MinMark { get; set; } = 0;
        public int MaxMark { get; set; } = 0;
        public string Grade { get; set; } = string.Empty;
        public int? UserId { get; set; } 
    }
    public class MarksGradeRelationDeleteRespose
    {
        public int AffectedRows { get; set; }
    }
}
