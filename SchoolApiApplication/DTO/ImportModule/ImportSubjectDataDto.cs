namespace SchoolApiApplication.DTO.ImportModule
{
    public class ImportSubjectDataDto
    {
        public string Subject_Name { get; set; } = string.Empty;
    }
    public class ResponseImportSubjectDataDto
    {
        public List<ImportSubjectDataDto> Subjects { get; set; } = new List<ImportSubjectDataDto>();
        public int Suceess { get; set; }

    }
}
