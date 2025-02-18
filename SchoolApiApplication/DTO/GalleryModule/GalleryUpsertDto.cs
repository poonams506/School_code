using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.GalleryModule
{
    public class GalleryUpsertDto
    {
        public long GalleryId { get; set; } = 0;

        public int? AcademicYearId { get; set; }
        public int? GalleryToType { get; set; }
        public List<int?> ClassId { get; set; } = new List<int?>();
        public List<int?> StudentId { get; set; } = new List<int?>();
        public List<int?> TeacherId { get; set; } = new List<int?>();
        public List<int?> CabDriverId { get; set; } = new List<int?>();
        public List<int?> ClerkId { get; set; } = new List<int?>();
        public string GalleryTitle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public bool IsPublished { get; set; }
        public int? UserId { get; set; }

        public MediaContentType FileType { get; set; }

        public List<GalleryFileDto> GalleryTextFileArray { get; set; } = new List<GalleryFileDto>();

       // public List<GalleryFileDto> GalleryMediaFileArray { get; set; } = new List<GalleryFileDto>();

        public List<GalleryMediaContentDto> GalleryVideoText { get; set; } = new List<GalleryMediaContentDto>();

    }
    public class GalleryFileDto
    {
        public string Base64Image { get; set; } = string.Empty;
        public string ImageContentType { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;
    }
    public class GalleryMappingDto
    {
        public int? GalleryId { get; set; }
        public int? StudentId { get; set; }
        public int? ClassId { get; set; }
        public int? TeacherId { get; set; }
        public int? ClerkId { get; set; }
        public int? CabDriverId { get; set; }
    }
    public class PublishUnpublishGalleryDto
    {
        public long GalleryId { get; set; }
        public bool IsPublished { get; set; }

    }

    public enum MediaContentType
    {
        IMAGE = 1,
        VIDEO = 2
        // TEXT = 3
    }

    public class GalleryMediaContentDto
    {
        public string ContentUrl { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public int FileType { get; set; }
        public string FullPath { get; set; } = string.Empty;
    }
}
