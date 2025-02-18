using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.SchoolEventModule
{
    public class SchoolEventDto
    {
        public long SchoolEventId { get; set; } = 0;
        public int? AcademicYearId { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; } = string.Empty;
        public List<int?> ClassId { get; set; } = new List<int?>();
        public string EventTitle { get; set; } = string.Empty;
        public string EventDescription { get; set; } = string.Empty;
        public decimal EventFess { get; set; }
        public string EventVenue { get; set; } = string.Empty;
        public string EventCoordinator { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public DateTime? StartTime { get; set; }
        public SchoolNgbTimeModel? ngbStartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public SchoolNgbTimeModel? ngbEndTime { get; set; }
       
        public bool IsCompulsory { get; set; }
        public bool IsPublished { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Remark { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedDate { get; set; } = string.Empty;
        public string ModifiedDate { get; set; } = string.Empty;
        public int UserId { get; set; }


        public List<SchoolEventFileDto> FileNameList{ get; set; } = new List<SchoolEventFileDto>();
        public List<SchoolEventFileDto> MediaFileArray { get; set; } = new List<SchoolEventFileDto>();
    }
    public class SchoolEventFileDto
    {
        public string Base64Image { get; set; } = string.Empty;
        public string ImageContentType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;
       
    }

    public class PublishUnpublishSchoolEventDto
    {
        public long SchoolEventId { get; set; }
        public bool IsPublished { get; set; }
        public int? ClassId { get; set; }

    }
}
