using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.GalleryModule
{
    public class GalleryGridDto
    {
        public long GalleryId { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
        public int? GalleryToType { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsPublished { get; set; }
        public DateTime StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public string GalleryTitle { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedDate { get; set; } = string.Empty;
        public string ModifiedDate { get; set; } = string.Empty;
    }
}
