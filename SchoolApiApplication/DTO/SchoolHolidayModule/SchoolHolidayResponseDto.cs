using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolEventModule;

namespace SchoolApiApplication.DTO.SchoolHolidayModule
{
    public class SchoolHolidayResponseDto
    {

        public int AcademicYearId { get; set; } = 0;
        public int UserId { get; set; }

        public List<SchoolHolidayDetailDto>? HolidayTypeDetailsList { get; set; } = new List<SchoolHolidayDetailDto>();
    }
    public class SchoolHolidayDetailDto

    {
        public int SchoolHolidayId { get; set; }
        public int AcademicYearId { get; set; } = 0;
        public int DayNo { get; set; }
        public DateTime? CalendarDate { get; set; }
        public SchoolNgbDateModel? ngbCalendarDate { get; set; }
        public string HolidayReason { get; set; } = string.Empty;
    }

    public class ScoolHolidayListDto
    {
        public int? AcademicYearId { get; set; }
        public int SchoolHolidayId { get; set; }
        public int DayNo { get; set; }
        public DateTime? CalendarDate { get; set; }
        public SchoolNgbDateModel? ngbCalendarDate { get; set; }
        public string HolidayReason { get; set; } = string.Empty;

    }

    public class ExistResposeDto
    {
        public int? AcademicYearId { get; set; }
        public DateTime? CalendarDate { get; set; }
        public int? Exist { get; set; } 
    }
    public class CalendarDateRequestDto
    {
        public DateTime? CalendarDate { get; set; }
        public SchoolNgbDateModel? ngbCalendarDate { get; set; }
    }
}
