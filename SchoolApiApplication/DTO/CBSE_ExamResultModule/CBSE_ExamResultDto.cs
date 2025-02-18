using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.DTO.CBSE_ExamResultModule
{
    public class CBSE_ExamResultDto
    {
        public int? AcademicYearId { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; } = string.Empty;
        public decimal? Percentage { get; set; } = 0;
        public string ClassName { get; set; } = string.Empty;
        public string ExamName { get; set; } = string.Empty;
        public string SubjectName { get; set; } = string.Empty;
        public int SubjectMasterId { get; set; } = 0;
        public int ExamMasterId { get; set; } = 0;
        public Int32 UserId { get; set; }

        public List<CBSE_ExamResultStudentDto> StudentList { get; set; } = new List<CBSE_ExamResultStudentDto>();
        public List<CBSE_ExamResultObjectDto> HeaderObjectList { get; set; } = new List<CBSE_ExamResultObjectDto>();
        public List<CBSE_ExamResultUpsertListDto> CBSE_ExamResultList { get; set; } = new List<CBSE_ExamResultUpsertListDto>();


    }
    public class CBSE_ExamResultStudentDto
    {
        public string StudentName { get; set; } = string.Empty;
        public string RollNumber { get; set; } = string.Empty;
        public int StudentId { get; set; } = 0;
        public List<CBSE_ExamResultObjectDto> ObjectList { get; set; } = new List<CBSE_ExamResultObjectDto>();


    }
    public class CBSE_ExamResultObjectDto
    {
        public int StudentId { get; set; }
        public string ObjectName { get; set; } = string.Empty;
        public int ExamObjectId { get; set; } = 0;
        public int OutOfMarks { get; set; } = 0;
        public decimal? ActualMarks { get; set; }
        public decimal? TotalMarks { get; set; }
        public decimal? Percentage { get; set; }
        public string Grade { get; set; } = string.Empty;
    }
    public class CBSE_ExamResultRequestDto
    {
        public int AcademicYearId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public int ExamMasterId { get; set; } = 0;
        public int SubjectMasterId { get; set; } = 0;

    }
    public class CBSE_ExamResultUpsertListDto
    {
        public int StudentId { get; set; } = 0;
        public int ExamObjectId { get; set; } =0;
        public int OutOfMarks { get; set; } = 0;
        public decimal? ActualMarks { get; set; }
        public decimal? TotalMarks { get; set; }
        public decimal? Percentage { get; set; }
        public string Grade { get; set; } = string.Empty;

    }
    public class ExamNameDto
    {
      public int ExamMasterId { get; set; } = 0;
      public int ClassExamMappingId { get; set; } = 0;
      public string ExamName{ get; set; } = string.Empty;

    }
    public class SubjectNameDto
    {
        public int SubjectMasterId { get; set; } = 0;
        public string SubjectName { get; set; } = string.Empty;
    }

    public class ExamResultResponseDto
    {
        public List<ExamNameDto> ExamNameList { get; set; } = new List<ExamNameDto>();
        public List<SubjectNameDto> SubjectNameList { get; set; } = new List<SubjectNameDto>();
        public List<MarkGradeDto> MarkGradeList { get; set; } = new List<MarkGradeDto>();

    }
    public class MarkGradeDto
    {
        public int MinMark { get; set; } = 0;
        public int MaxMark { get; set; } = 0;
        public string Grade { get; set; } = string.Empty;
    }
}

