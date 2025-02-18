namespace SchoolApiApplication.DTO.CadDriverAppModule
{
    public class CabdriverAppStoppageStudentDto
    {
        public int? TripId { get; set; }
        public List<CabdriverAppStoppageDto>? CabDriverStoppageList { get; set; } = new List<CabdriverAppStoppageDto>();
        public List<CabdriverAppStudentDto>? CabDriverStudentList { get; set; } = new List<CabdriverAppStudentDto>();

    }

    public class CabdriverAppStoppageDto
    {
        public int? TripId { get; set; }
        public long? RouteId { get; set; }
        public String? StoppageName { get; set; }
        public long?  StoppageId { get; set; }
        public  int OrderNo { get; set; }
        public  int  TotalStudent { get; set; }

    }

    public class CabdriverAppStudentDto
    {
        public long? RouteId { get; set; }
        public string? StudentName { get; set; } = string.Empty;

        public string ClassName { get; set; } = string.Empty;
        public string EmergencyContactNumber { get; set;} = string.Empty;
        public string? Gender { get; set; }
        public long? ContactNumber { get; set; }
        public string? StoppageName { get; set; }
        public string? ProfileImageURL { get; set; }
        public long? StoppageId { get; set; }
        public long? ConsumerId { get; set; }
        public long? RoleId { get; set; }
        public long? StudentId { get; set; }
        public bool IsAlreadyPickedDropped { get; set; }

    }
}
