namespace SchoolApiApplication.DTO.CBSE_AcademicAssessmentReportModule
{
    public class ResultTempleteReportSearchDto
    {
        public string ReportCardName { get; set; } = string.Empty;
        public string ExamTypeName { get; set; } = string.Empty;
        public string ExamName { get; set; } = string.Empty;
        public string SubjectName { get; set; } = string.Empty;
        public string ObjectName { get; set; } = string.Empty;
        public int OutOfMarks { get; set; } = 0;
        public int ActualMarks { get; set; } = 0;
        public int TotalMarks { get; set; } = 0;
        public string Grade { get; set; } = string.Empty;
        public int TermId { get; set; } = 0;
        public string TermName { get; set; } = string.Empty;
        public int IndexNumber { get; set; } = 0;
        public int IsTwoDifferentExamSection { get; set; } = 0;




    }
    public class ResultTempleteReportSearchResponseDto
    {
        public List<ResultTempleteReportSearchDto> ExamResultListTerm1 { get; set; } = new List<ResultTempleteReportSearchDto>();
        public List<ResultTempleteReportSearchDto> ExamResultListTerm2 { get; set; } = new List<ResultTempleteReportSearchDto>();

    }

    public class StudentMonthlyAttendanceDto
    {
        public int StudentId { get; set; } = 0;
        public int MonthNumber { get; set; } = 0;
        public string MonthName { get; set; } = string.Empty;
        public int PresentDays { get; set; } = 0;
        public int TotalWorkingDays { get; set; } = 0;
    }
    public class StudentMonthlyAttendanceResponceDto
    {
        public List<StudentMonthlyAttendanceDto> StudentMonthlyAttendanceList { get; set; } = new List<StudentMonthlyAttendanceDto>();
    }
}