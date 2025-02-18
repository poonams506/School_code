using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.DTO.WeeklyDayOffModule
{
    public class WeeklyDayOffDto


    {
        public int AcademicYearId { get; set; } =0;

        public int WeeklyOffId { get; set; } = 0;

        public List<WeeklyDayOffListDto>? MultipleDayList { get; set; } = new List<WeeklyDayOffListDto>();


    }

    public class WeeklyDayOffListDto
    {
        public int DayNo { get; set; }

    }

}
