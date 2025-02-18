using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.TransportModule
{
    public class RouteDto
    {
        public long RouteId { get; set; } = 0;
        public string RouteName { get; set; } = string.Empty;
        public DateTime? FirstPickUpTime { get; set; }
        public string FormattedFirstPickUpTime { get; set; } = string.Empty;
        public DateTime? LastPickUpTime { get; set; }
        public string FormattedLastPickUpTime { get; set; } = string.Empty;
        public SchoolNgbTimeModel? ngbFirstPickUpTime { get; set; }
        public SchoolNgbTimeModel? ngbLastPickUpTime { get; set; }
        public string? CoOrdinatorId { get; set; }
        public string CoOrdinatorName { get; set; } = string.Empty;
        public int CoOrdinatorRoleId { get; set; } = 0;
        public int VehicleId { get; set; } = 0;
        public bool IsSharedVehicle { get; set; }
        public string SharedRouteId { get; set; } = string.Empty;
        public int AcademicYearId { get; set; } = 0;
        public string VehicleNumber { get; set; } = string.Empty;
        public string RagistrationNumber { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int TotalSeats { get; set; } = 0;
        public int AvailableSeat { get; set; } = 0;
    }
    public class RouteListResponse
    {
        public List<RouteDto>? RouteList { get; set; } = new List<RouteDto>();
    }
    public class RouteDeleteRespose
    {
        public int AffectedRows { get; set; }
    }

    public class RouteGridInputRequestDto
    {
        public int AcademicYearId { get; set; }
        public string ConsumerName { get; set; } = string.Empty;
    }
}
