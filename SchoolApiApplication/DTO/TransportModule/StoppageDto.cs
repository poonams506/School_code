using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.ImportModule;

namespace SchoolApiApplication.DTO.TransportModule
{
    public class StoppageDto
    {
        public long StoppageId { get; set; } = 0;
        public int OrderNo { get; set; } = 0;
        public string StoppageName { get; set; } = string.Empty;
        public string AreaName { get; set; } = string.Empty;
        public int AreaId { get; set; } = 0;
        public decimal PickPrice { get; set; } = 0;
        public decimal DropPrice { get; set; } = 0;
        public decimal PickAndDropPrice { get; set; } = 0;
        public DateTime? PickUpTime { get; set; }
        public string FormattedPickUpTime { get; set; }=string.Empty;
        public SchoolNgbTimeModel? ngbPickUpTime { get; set; }
        public SchoolNgbTimeModel? ngbDropPickUpTime { get; set; }
        public DateTime? DropPickUpTime { get; set; }
        public string FormattedDropPickUpTime { get; set; } = string.Empty;
        public string KiloMeter { get; set; } = string.Empty;
        public int AcademicYearId { get; set; } = 0;
        public string StopLat { get; set; } = string.Empty;
        public string StopLng { get; set; } = string.Empty;


    }
    public class StoppageListResponse {
        public List<StoppageDto>? StoppageList { get; set; } = new List<StoppageDto>();
    }
    public class StoppageDeleteRespose
    {
        public int AffectedRows { get; set; }
    }

    public class StoppageGridInputDto
    {
        public int AcademicYearId { get; set; }
        public long RouteId { get; set; }
        public string ConsumerName { get; set; } = string.Empty;
    }
}
