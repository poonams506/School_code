using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class ParentAppHomeworkDto
    {
        public long HomeworkId { get; set; } = 0;

        public int AcademicYearId { get; set; } = 0;

        public int GradeId { get; set; } = 0;

        public int DivisionId { get; set; } = 0;
        public int StudentId { get; set; } = 0;

        public int SubjectId { get; set; } = 0;

        public string SubjectName { get; set; } = string.Empty;
        public string HomeworkTitle { get; set; } = string.Empty;
        public string HomeworkDescription { get; set; } = string.Empty;
        public DateTime FromDate { get; set; }
        public SchoolNgbDateModel? ngbFromDate { get; set; }
        public DateTime TillDate { get; set; }
        public SchoolNgbDateModel? ngbTillDate { get; set; }
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public bool IsPublished { get; set; }
        public int UserId { get; set; }
        public MediaContentType FileType { get; set; }
        public List<ParentAppHomeworkMediaContentDto> LstMediaVideoText { get; set; } = new List<ParentAppHomeworkMediaContentDto>();

        public List<ParentAppHomeworkDetailDto> LstHomeworkDetail { get; set; } = new List<ParentAppHomeworkDetailDto>();


    }
    public class ParentAppHomeworkDetailDto
    {
        public int HomeworkId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;
    }
    public class ParentAppHomeworkResponseDto
    {
        public List<ParentAppHomeworkDto> HomeworkList { get; set; } = new List<ParentAppHomeworkDto>();
    }

    public class ParentAppHomeworkRequestDto
    {
        public int AcademicYearId { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int StudentId { get; set; }
    }

    public class ParentAppHomeworkMediaContentDto
    {
        public int HomeworkId { get; set; }

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


}
