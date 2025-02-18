using System.Numerics;

namespace SchoolApiApplication.DTO.CBSE_ExamModule
{
    public class CBSE_ClassExamMappingDto
    {
        public long ClassExamMappingId { get; set; } = 0;
        public long ExamMasterId { get; set; } = 0;
        public string? ExamName { get; set; }
        public int? ExamTypeId { get; set; }
        public string? ExamTypeName { get; set; }
        public int? TermId { get; set; }
        public string? TermName { get; set; }
        public int? AcademicYearId { get; set; }
        public string ClassIds { get; set; } = string.Empty;
        public List<int> ClassList { get; set; } = new List<int>();
        public string ClassName { get; set; }=string.Empty;
        public int? UserId { get; set; } = 0;
        public string? ClassId { get; set; }
    
    }

    public class ClassSelectDto
    {
        public long Id { get; set; } = 0;
        public string ClassName { get; set; } = string.Empty;

    }
    public class CBSE_ExamNameSelectDto
    {
        public long ExamMasterId { get; set; } = 0;
        public string ExamName { get; set; } = string.Empty;
        public string ExamTypeName { get; set; } = string.Empty;
        public int TermId { get; set; } = 0;
        
    }

    public class CBSE_ExamNameResponseDto
    {
        public List<CBSE_ExamNameSelectDto> ExamNameList { get; set; } = new List<CBSE_ExamNameSelectDto>();
    }
}
