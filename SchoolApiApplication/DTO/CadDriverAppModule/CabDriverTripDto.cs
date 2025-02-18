namespace SchoolApiApplication.DTO.CadDriverAppModule
{
    public class CabDriverTripDto
    {
        public long?  RouteId { get; set; }
        public long TripId { get; set; }
        public string? TripType { get; set;}
        public bool IsTripEnd { get; set; }
        public int? StudentId { get; set; }

    }

    public class CabDriverLocationDto
    {
        public long TripId { get; set; }
        public double? Lat { get; set; }
        public double? Long { get; set; }
    }

    public class CabDriverTripNotificationDto
    {
         public int? StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;

    }
    public class CabDriverTripNotificationResponceDto
    {
        public List<CabDriverTripNotificationDto>? NotificationStudentList { get; set; } = new List<CabDriverTripNotificationDto>();

    }

    public class CabDriverActiveTripRequestDto
    {
        public int UserId { get; set; }
        public int RouteId { get; set; }
        public string TripType { get; set; }
    }

    public class CabDriverActiveTripDto
    {
        public int TripId { get; set; }
        public string TripType { get; set; } = string.Empty;
        public string TripStatus { get; set; } = string.Empty;
        public int RouteId { get; set; }

    }

}
