namespace SchoolApiApplication.DTO.Certificate_Module
{
    public class StudentNameDto
    {
         
        public long? StudentId { get; set; }
        public Int16? GradeId { get; set; }
        public Int16? DivisionId { get; set; }
        public Int16? AcademicYearId { get; set; }
        public string? FullName { get; set; }
    }
    public class StudentNameModelResponse
    {
        public List<StudentNameDto> StudentNames { get; set; } = new List<StudentNameDto>();


    }
}

