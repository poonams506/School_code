

namespace SchoolApiApplication.DTO.StudentDocumentModule
{
    public class StudentDocumentDto
    {
       
        public long StudentId { get; set; } = 0;
        public long DocumentId { get; set; } = 0;
        public string DocumentName { get; set; } = string.Empty;
        public string DocumentUrl { get; set; } = string.Empty;
        public string DocumentFileType { get; set; } = string.Empty;
        public string DocumentBase64Image { get; set; } = string.Empty;
        public string DocumentImageContentType { get; set; } = string.Empty;
        public List<StudentDocumentTypeDto> StudentDocuments { get; set; } = new List<StudentDocumentTypeDto>();
       

    }
    public class StudentDocumentTypeDto
    {
        public long DocumentId { get; set; } = 0;
        public string DocumentName { get; set; } = string.Empty;
        public string DocumentUrl { get; set; } = string.Empty;
        public string DocumentFileType { get; set; } = string.Empty;
        public string DocumentBase64Image { get; set; } = string.Empty;
        public string DocumentImageContentType { get; set; } = string.Empty;
        public DateTime UploadedDate { get; set; }

    }

}
