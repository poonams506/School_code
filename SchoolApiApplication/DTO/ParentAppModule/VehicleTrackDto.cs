using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.VariantTypes;
using SchoolApiApplication.DTO.HomeworkModule;
using System;

namespace SchoolApiApplication.DTO.ParentAppModule
{
    public class VehicleTrackDto
    {
        public string Lat { get; set; } = string.Empty;
        public string Lng { get; set; } = string.Empty;
        public string VehicleNo { get; set; } = string.Empty;
        public String RegistrationNo { get; set; } = string.Empty;
        public string StopName { get; set; } = string.Empty;
        public int OrderNo { get; set; }

      
    }

    public class VehicleTrackResponseDto
    {
        public List<VehicleTrackDto> VehicleTrackList { get; set; } = new List<VehicleTrackDto>();
    }

    public class StoppageTrackResponseDto
    {
        public List<VehicleTrackDto> StoppageTrackList { get; set; } = new List<VehicleTrackDto>();
    }
}
