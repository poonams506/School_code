namespace SchoolApiApplication.DTO.CadDriverAppModule
{
    public class CabDriverAppTripDetailsDto
    {
        public  long TripDetailId { get; set; }
        public long TripId { get; set; }
        public long StudentId { get; set; }
        public  DateTime PickUpDateTime { get; set;}
        public DateTime DropOffDateTime { get; set; }
       public string TripType { get; set; } = string.Empty;
    }
}
