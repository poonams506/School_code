namespace SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule
{
    public class TeacherGradeDivisionMappingDto
    {
        public int TeacherGradeDivisionMappingId { get; set; } = 0;
        public int AcademicYearId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public string ClassName { get; set; } = string.Empty;
        public string TeacherIds { get; set; } = string.Empty; 
        public int UserId { get; set; } = 0;
        public List<int> TeacherList { get; set; } = new List<int>();

    }
    public class TeacherSelectDto
    {
        public int TeacherId { get; set; } = 0;
        public string FullName { get; set; } = string.Empty;

    }
}
