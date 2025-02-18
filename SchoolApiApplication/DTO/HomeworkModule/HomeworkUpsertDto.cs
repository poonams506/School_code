using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.HomeworkModule
{

    public class HomeworkUpsertDto
    {
        public long HomeworkId { get; set; } = 0;

        public int? AcademicYearId { get; set; } 

        public Int16 GradeId { get; set; } 

        public Int16 DivisionId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public string? DivisionName { get; set; } = string.Empty;
        public int? ClassId { get; set; } 

        public Int16 SubjectId { get; set; }
        public string SubjectName { get; set;} = string.Empty;
        public string HomeworkTitle { get; set; } = string.Empty;
        public string HomeworkDescription { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public bool IsPublished { get; set; }

        public Int32 UserId { get; set; }

        public MediaContentType FileType { get; set; }


        public List<HomeworkFileDto> HomeworkTextFileArray { get; set; } = new List<HomeworkFileDto>();

        public List<HomeworkFileDto> HomeworkMediaFileArray { get; set; } = new List<HomeworkFileDto>();

        public List<HomeworkMediaContentDto> MediaVideoText { get; set; } = new List<HomeworkMediaContentDto>();

    }

    public class HomeworkMediaContentDto
    {
        public string ContentUrl { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;
    }
    public enum MediaContentType
    {
        IMAGE = 1,
        VIDEO = 2
        // TEXT = 3
    }


    public class HomeworkFileDto
    {
        public string Base64Image { get; set; } = string.Empty;
        public string ImageContentType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; }= string.Empty;
    }

    public class PublishUnpublishHomeworkDto
    {
        public long HomeworkId { get; set; } 
        public bool IsPublished { get; set; }

    }
    public class SubjectMappingDropdownDto
    {
        public int? GradeId { get; set; }
        public int? DivisionId { get; set; }
        public int SubjectId { get; set; }
        public int? AcademicYearId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
    }
    public class SubjectMappingDropdownResponseDto
    {
        public List<SubjectMappingDropdownDto> SubjectsList { get; set; } = new List<SubjectMappingDropdownDto>();
    }



}
