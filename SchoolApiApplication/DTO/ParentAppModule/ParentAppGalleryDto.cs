using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class ParentAppGalleryDto
    {
        public long GalleryId { get; set; } = 0;
        public long StudentId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public int? GalleryToType { get; set; }
        public string GalleryTitle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public bool IsPublished { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string RoleKey { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }

        public List<ParentAppGalleryDetailDto> LstGalleryDetail { get; set; } = new List<ParentAppGalleryDetailDto>();

        public List<MediaGalleryContentDto> LstGalleryMediaDetail { get; set; } = new List<MediaGalleryContentDto>();



    }

    public class ParentAppGalleryDetailDto
    {
        public long GalleryId { get; set; } = 0;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;
        //public string ContentUrl { get; set; } = string.Empty;

    }

    public class MediaGalleryContentDto
    {
        public long GalleryId { get; set; } = 0;
        public string ContentUrl { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;

        public int FileType { get; set; }

        public string FullPath { get; set; } = string.Empty;


    }



    public class ParentAppGalleryResponseDto
    {

        public List<ParentAppGalleryDto> GalleryList { get; set; } = new List<ParentAppGalleryDto>();
    }

    public class ParentAppGalleryRequestDto
    {
        public int AcademicYearId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime TillDate { get; set; }
        public int StudentId { get; set; }
    }
}
