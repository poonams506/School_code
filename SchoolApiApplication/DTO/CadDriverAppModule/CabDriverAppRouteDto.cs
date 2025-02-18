using SchoolApiApplication.DTO.TransportModule;

namespace SchoolApiApplication.DTO.CadDriverAppModule
{
    public class CabDriverAppRouteDto
    {
        public long? RouteId { get; set; }
        public string? RouteName { get; set; }
        public long CabDriverId { get; set; }
        public string? SchoolCode { get; set; }
    }

    public class CabDriverRouteListDto
    {
        public List<CabDriverAppRouteDto>? CabDriverRouteList { get; set; } = new List<CabDriverAppRouteDto>();
    }
}
