
namespace SchoolApiApplication.DTO.TransportModule
{
    public class ActiveTripDto
    {
        public Int16 CabDriverTripCurrentLocationId { get; set; } = 0;
        public Int16 TripId { get; set; } = 0;
        public string Lat { get; set; } = string.Empty;
        public string Long { get; set; } = string.Empty;
        public Int16 RouteId { get; set; } = 0;
        public string RouteName { get; set; } = string.Empty;
        public Int16 VehicleId { get; set; } = 0;
        public string VehicleNumber { get; set; } = string.Empty;
        public String RagistrationNumber { get; set; } = string.Empty;

    }
    public class ActiveTripResponseDto
    {
        public List<ActiveTripDto> ActiveTripList { get; set; } = new List<ActiveTripDto>();
    }

}
