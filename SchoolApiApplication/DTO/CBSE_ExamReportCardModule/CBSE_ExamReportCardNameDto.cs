namespace SchoolApiApplication.DTO.CBSE_ExamReportCard
{
    public class CBSE_ExamReportCardNameDto
    {
        public long ExamReportCardNameId { get; set; } = 0;
        public string ReportCardName { get; set; } = string.Empty;
        public int AcademicYearId { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
        public bool? IsTwoDifferentExamSection { get; set; }
        public string ExamNames { get; set; } =  string.Empty;
        public string ClassIds { get; set; } = string.Empty;
        public string ExamIds { get; set; } = string.Empty;
         public string ClassNames { get; set; } = string.Empty;
        public int TermId {  get; set; }= 0;
        public DateTime? CreatedDate { get; set; }


    }
    public class CBSE_ReportCardClassesDto
    {
        public long ReportCardClassesId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public int AcademicYearId { get; set; } = 0;
        public long ExamReportCardNameId { get; set; } = 0;

    }
    public class CBSE_ReportCardExamDto
    {
        public long ReportCardExamId { get; set; } = 0;
        public int ExamId { get; set; } = 0;
        public int TermId { get; set; } = 0;
        public int AcademicYearId { get; set; } = 0;
        public long ExamReportCardNameId { get; set; } = 0;
        public long ReportCardClassesId { get; set; } = 0;

    }
    public class ExamNameRequestDto {

        public int AcademicYearId { get; set; } = 0;
        public List<int> ClassId { get; set; } = new List<int>();
    }
    public class ExamReportCardUpsertDto {
        public long ExamReportCardNameId { get; set; } = 0;
        public string ReportCardName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool? IsTwoDifferentExamSection { get; set; }
        public List<int> ClassId { get; set; } =new List<int>() ;
        public List<int> ExamMasterId { get; set; } = new List<int>();
    }

}
