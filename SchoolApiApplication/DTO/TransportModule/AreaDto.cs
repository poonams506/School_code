namespace SchoolApiApplication.DTO.TransportModule
{
    public class AreaDto
    {
        public long AreaId { get; set; } = 0;
        public string AreaName { get; set; } = string.Empty;
        public decimal PickPrice { get; set; } = 0;
        public decimal DropPrice { get; set; } = 0;
        public decimal PickAndDropPrice { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
        public int AcademicYearId { get; set; } = 0;
    }
    public class AreaDeleteRespose
    {
        public int AffectedRows { get; set; }
    }

}
