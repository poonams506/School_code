using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.DTO.TransportModule
{
    public class StoppageLatLngDto
    {
        public string Lat { get; set; } = string.Empty;
        public string Lng { get; set; } = string.Empty;
        public string StopName { get; set; } = string.Empty;
        public int OrderNo { get; set; }
    }
    public class StoppageTrackResponseLisDto
    {
        public List<StoppageLatLngDto> StoppageTrackResponseList { get; set; } = new List<StoppageLatLngDto>();
    }


}
