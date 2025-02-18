using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.SchoolVacationModule
{
    public class SchoolVacationDto
    {
        public long SchoolVacationId { get; set; } = 0;
        public int? AcademicYearId { get; set; }
        public string VacationName { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public SchoolNgbDateModel? ngbStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SchoolNgbDateModel? ngbEndDate { get; set; }
        public int UserId { get; set; }

    }
}
