namespace SchoolApiApplication.DTO.MasterModule
{
    public class MonthMasterResponse
    {
        public List<MonthMasterDto> MonthMasters{ get; set; }  = new List<MonthMasterDto>();
    }
    public class MonthMasterDto
    {
        public int MonthMasterId { get; set; }  
        public string? MonthName { get; set;}
        public string? MonthNameKey { get; set; }
    }
}
