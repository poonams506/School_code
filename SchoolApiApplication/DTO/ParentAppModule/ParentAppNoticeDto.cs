using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class ParentAppNoticeDto
    {
        public long NoticeId { get; set; } = 0;
        public long StudentId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public bool IsImportant { get; set; }
        public int NoticeToType { get; set; }
        public string NoticeTitle { get; set; } = string.Empty;
        public string NoticeDescription { get; set; } = string.Empty;
      
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public bool IsPublished { get; set; }
       
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string RoleKey { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string  RoleName { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public List<ParentAppNoticeDetailDto> LstNoticeDetail { get; set; }=new List<ParentAppNoticeDetailDto>();
        public List<NoticetMediaContentDto> LstNoticeMediaDetail { get; set; }=new List<NoticetMediaContentDto>();


    }

    public class ParentAppNoticeDetailDto
    {
        public int NoticeId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set;} = string.Empty; 
        public string ContentUrl { get; set; } = string.Empty;

    }

    public class NoticetMediaContentDto
    {
        public int NoticeId { get; set; }

        public string ContentUrl { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string FullPath { get; set; } = string.Empty;


    }



    public class ParentAppNoticeResponseDto
    {
       
        public List<ParentAppNoticeDto> NoticeList { get; set; } = new List<ParentAppNoticeDto>();
    }

    public class ParentAppNoticeRequestDto
    {
        public int AcademicYearId { get; set; }
        public int StudentId { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }

}
