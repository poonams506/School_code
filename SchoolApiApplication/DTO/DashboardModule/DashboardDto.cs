namespace SchoolApiApplication.DTO.DashboardModule
{
    public class DashboardCountDto
    {
        public int StudentCount { get; set; }
        public int TeacherCount { get; set; }
        public int CabDriverCount { get; set; }
        public int StaffCount { get; set; }
       
    }

    public class AdminDashboardCountDto
    {
        public AddmissionCount AddmissionCount { get; set; } = new AddmissionCount();
        public AttendancePercentage AttendancePercentage { get; set; } = new AttendancePercentage();
        public GirlsBoysCount GirlsBoysCount { get; set; } = new GirlsBoysCount();
        public FeeCollectionPercentage FeeCollectionPercentage { get; set; } = new FeeCollectionPercentage();
    }
    public class TeacherDashboardCountDto
    {
        public GirlsBoysCount GirlsBoysCount { get; set; } = new GirlsBoysCount();
        public AttendancePercentage AttendancePercentage { get; set; } = new AttendancePercentage();
    }
    public class FeeCollectionPercentage
    {
        public decimal TodaysCollection { get; set; }
        public decimal MonthlyCollection { get; set; }
        public decimal TillDateCollection { get; set; }

    }
    public class AttendancePercentage
    {
        public decimal TodaysAttendance { get; set; }
        public decimal MonthlyAttendance { get; set; }
        public decimal TillDateAttendance { get; set; }

    }
    public class AddmissionCount
    {
        public decimal TodaysAddmissions { get; set; }
        public decimal MonthlyAddmissions { get; set; }
        public decimal TillDateAddmissions { get; set; }

    }
    public class GirlsBoysCountDto
    {
        public List<GirlsBoysCount> GirlsBoysCount { get; set; }
    }
    public class GirlsBoysCount
    {
        public int TotalCount { get; set; }
        public int GirlsCount { get; set; }
        public int BoysCount { get; set; }
    }

    public class DashBoardStaffDetailsDto
    {
        public List<DashBoardStaffDetails> DashBoardStaffDetails { get; set; }
    }

    public class DashBoardStaffDetails
    {
        public string StaffName { get; set; }
        public string Role { get; set; }
        public string MobileNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
    }

}
