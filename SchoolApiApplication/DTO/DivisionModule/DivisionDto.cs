using Microsoft.Identity.Client;
using NLog.LayoutRenderers;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolModule;

namespace SchoolApiApplication.DTO.DivisionModule
{
    public class DivisionDto
    {
        public int? DivisionId { get; set; }
        public string? DivisionName { get; set; }
    }
    public class DivisionDeleteRespose
    {
        public int AffectedRows { get; set; }
    }
    public class DivisionUpdateleteRespose
    {
        public int Exits { get; set; }
    }

}
