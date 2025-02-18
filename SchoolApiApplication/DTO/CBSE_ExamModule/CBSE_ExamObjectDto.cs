namespace SchoolApiApplication.DTO.CBSE_ExamModule
{
    public class CBSE_ExamObjectDto
    {
        public long ExamObjectId { get; set; } = 0;
        public long ExamMasterId { get; set; } = 0;
        public int SubjectMasterId { get; set; } = 0;
        public int? AcademicYearId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string ObjectName { get; set; } = string.Empty;
        public string OutOfMarks { get; set; } = string.Empty;
        public String Status { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public List<ExamObjectTypeDetailsDto>? ObjectNameDetailsList { get; set; } = new List<ExamObjectTypeDetailsDto>();


    }

    public class CBSE_ExamTypeDto
    {
        public long ExamTypeId { get; set; } = 0;
        public string ExamTypeName { get; set; } = string.Empty;

    }

    public class CBSE_TermDto
    {
        public long TermId { get; set; } = 0;
        public string TermName { get; set; } = string.Empty;

    }
    public class CBSE_ResponseDto
    {
        public List<CBSE_TermDto> TermList { get; set; } = new List<CBSE_TermDto>();
        public List<CBSE_ExamTypeDto> ExamTypeList { get; set; } = new List<CBSE_ExamTypeDto>();

    }

    public class PublishUnpublishExamObjectDto
    {
        public long ExamObjectId { get; set; }
        public bool IsPublished { get; set; }
        public int? ClassId { get; set; }

    }

    public class ExamObjectTypeDetailsDto
    {
        public long ExamObjectId { get; set; } = 0;
        public string ObjectName { get; set; } = string.Empty;
        public string OutOfMarks { get; set; } = string.Empty;
    }
    public class ExamObjectExistResponseDto
    {
        public int ObjectExist { get; set; } = 0;
        public string ObjectNames { get; set; } = string.Empty;

        public List<ExamObjectTypeDetailsDto> DublicateObjects { get; set; }=new List<ExamObjectTypeDetailsDto>();
       
    }

    public class ExamObjectDeleteRespose
    {
        public int AffectedRows { get; set; }
    }


    public class ExamObjectDeleteRequestDto
    {
        public long ExamObjectId { get; set; }
        public long ExamMasterId { get; set; }
        public long SubjectMasterId { get; set; }
        public int AcademicYearId { get; set; }
        //public int UserId { get; set; }
    }


    public class ExamObjectDeleteResponseDto
    {

        public int OperationStatus { get; set; } 
    }

}
