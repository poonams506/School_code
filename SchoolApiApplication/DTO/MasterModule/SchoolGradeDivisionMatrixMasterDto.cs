namespace SchoolApiApplication.DTO.MasterModule
{
    public class GradeDivisionMasterDto
    {
        public List<SchoolGradeDivisionMatrixDto>? SchoolGradeDivisionMatrixCascadeList { get; set; }
        public List<Grade>? Grades { get; set; }
        public List<Division>? Divisions { get; set; }

    }

    public class Grade
    {
        public int? GradeId { get; set; }
        public string? GradeName { get; set; }
    }
    public class Division
    {
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; }
    }
    public class SchoolGradeDivisionMatrixDto
    {
        public int? SchoolGradeDivisionMatrixId { get; set; }
        public int? GradeId { get; set; }
        public int? DivisionId { get; set; }
        public string ClassName { get; set; } = string.Empty;
    }
   
}
