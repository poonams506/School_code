namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class StudentGradeDivisionParentAppDto
    {
        public int AcademicYearId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public string GradeName { get; set; } = string.Empty;
        public int DivisionId { get; set; } = 0;
        public string DivisionName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public int StudentId { get; set; } = 0;
        public int ParentId { get; set; } = 0;
    }
}
