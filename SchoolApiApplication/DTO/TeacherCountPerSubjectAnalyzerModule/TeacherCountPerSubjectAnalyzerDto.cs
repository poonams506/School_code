namespace SchoolApiApplication.DTO.TeacherCountPerSubjectAnalyzerModule
{
    public class TeacherCountPerSubjectAnalyzerDto
    {
        public short AcademicYearId { get; set; } = 0;
        public string SubjectName { get; set; } = string.Empty;
        public int TeacherCount { get; set; } = 0;

    }
    public class TeacherCountPerSubjectAnalyzerResponseDto
    {
        public List<TeacherCountPerSubjectAnalyzerDto> GetTeacherCountPerSubjects { get; set; } = new List<TeacherCountPerSubjectAnalyzerDto>();

    }


}
