using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.NoticeModule;

namespace SchoolApiApplication.DTO.SurveyModule
{
    public class SurveyDto
    {
        public int? AcademicYearId { get; set; }
        public long SurveyId { get; set; } = 0;
        public string SurveyTitle { get; set; } = string.Empty;
        public int? SurveyToType { get; set; }
        public List<int?> ClassId { get; set; } = new List<int?>();
        public List<int?> StudentId { get; set; } = new List<int?>();
        public List<int?> TeacherId { get; set; } = new List<int?>();
        public int? ClassTeacherId { get; set; }
        public List<int?> CabDriverId { get; set; } = new List<int?>();
        public List<int?> ClerkId { get; set; } = new List<int?>();
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsPublished { get; set; }
        public bool IsImportant { get; set; }

      //  public int NoticeToType { get; set; }
        public string SurveyDescription { get; set; } = string.Empty;
        //public string SubjectName { get; set; } = string.Empty;

        public string CreatedBy { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedDate { get; set; } = string.Empty;
        public string ModifiedDate { get; set; } = string.Empty;

        public int UserId { get; set; }

        public List<SurveyFileDto> SurveyTextFileArray { get; set; } = new List<SurveyFileDto>();
        public List<SurveyQuestionDto> SurveyText { get; set; } = new List<SurveyQuestionDto>();
    }

    public class SurveyFileDto
    {
        public string Base64Image { get; set; } = string.Empty;
        public string ImageContentType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;

    }
    public class SurveyQuestionDto
    {
        public string SurveyQuestions { get; set; } = string.Empty;

    }
    public class SurveyMappingDto
    {
        public int? SurveyId { get; set; }
        public int? StudentId { get; set; }
        public int? ClassId { get; set; }
        public int? TeacherId { get; set; }
        public int? ClerkId { get; set; }
        public int? CabDriverId { get; set; }
        public int? ClassTeacherId { get; set; }
    }

    public class PublishUnpublishSurveyDto
    {
        public long SurveyId { get; set; }
        public bool IsPublished { get; set; }

    }
}
