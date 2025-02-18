using Microsoft.Identity.Client;
using NLog.LayoutRenderers;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolModule;

namespace SchoolApiApplication.DTO.GradeModule
{
    public class GradeDto
    {
        public int? GradeId { get; set; }
        public string? GradeName { get; set; }
    }
    public class GradeDeleteRespose
    { 
    public int AffectedRows { get; set;}
    }
    public class GradeUpdateRespose
    {
        public int Exits { get; set; }
    }


}
