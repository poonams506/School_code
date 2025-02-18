namespace SchoolApiApplication.DTO.PromoteModule
{
    public class PromoteUpsertDto
    {

        public Int16 AcademicYearId { get; set; } = 0;
        public string Class { get; set; } = string.Empty;


        public Int16 GradeId { get; set; } = 0;
        public string GradeName { get; set; } = string.Empty;

        public Int16 DivisionId { get; set; } = 0;
        public string DivisionName { get; set; } = string.Empty;

        public int StudentId { get; set; }
        public string FullName { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public Int32 UserId { get; set; }

    }
}
