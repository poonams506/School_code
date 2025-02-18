using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.TeacherAppModule
{
    public class GalleryDto
    {
        public long GalleryId { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
        public int? GalleryToType { get; set; }
        public string GalleryTo { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsPublished { get; set; }
        public string GalleryTitle { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public string ModifiedBy { get; set; } = string.Empty;
        public string CreatedDate { get; set; } = string.Empty;
        public string ModifiedDate { get; set; } = string.Empty;
    }
    public class GalleryListDto
    {
        public List<GalleryDto> GalleryList { get; set; } = new List<GalleryDto>();
    }
}
