using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SurveyModule;

namespace SchoolApiApplication.DTO.NoticeModule
{

    public class NoticeUpsertDto
    {
        public long NoticeId { get; set; } = 0;

        public int? AcademicYearId { get; set; }
        public bool IsImportant { get; set; }

        public int NoticeToType { get; set; }
        public List<int?> ClassId { get; set; } = new List<int?>();
        public List<int?> studentId { get; set; } = new List<int?>();
        public List<int?> teacherId { get; set; } = new List<int?>();
        public List<int?> cabDriverId { get; set; } = new List<int?>();
        public List<int?> clerkId { get; set; } = new List<int?>();
        public string NoticeTitle { get; set; } = string.Empty;
        public string NoticeDescription { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public bool IsPublished { get; set; }

        public int UserId { get; set; }


        public MediaContentType FileType { get; set; }

        public List<NoticeFileDto> NoticeTextFileArray { get; set; } = new List<NoticeFileDto>();

       // public List<NoticeFileDto> NoticeMediaFileArray { get; set; } = new List<NoticeFileDto>();

        public List<ProjectMediaContentDto> VideoText { get; set; } = new List<ProjectMediaContentDto>();



    }

    public class ProjectMediaContentDto
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


    public class NoticeFileDto
    {
        public string Base64Image { get; set; } = string.Empty;
        public string ImageContentType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;
    }

    public class NoticeMappingDto
    {
        public int? NoticeId { get; set; }
        public int? StudentId { get; set; }
        public int? ClassId { get; set; }
        public int? TeacherId { get; set; }
        public int? ClerkId { get; set; }
        public int? CabDriverId { get; set; }
    }

    public class PublishUnpublishNoticeDto
    {
        public long NoticeId { get; set; }
        public bool IsPublished { get; set; }

    }
}
