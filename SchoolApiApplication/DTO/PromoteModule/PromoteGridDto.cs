using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.DTO.PromoteModule
{
    public class PromoteGridDto
    {
        public Int16 AcademicYearId { get; set; } = 0;

        public int StudentId { get; set; }
        public string FullName { get; set; } = string.Empty;

        public string RollNumber { get; set; } = string.Empty;

        public Int32 UserId { get; set; }

        public bool? IsPassed { get; set; }
        public int? PromotedAcademicYearId { get; set; }
        public int? PromotedGradeId { get; set; }
        public int? PromotedDivisionId { get; set; }
        public int StatusId { get; set; }
        public bool? IsChecked { get; set; }
    }


    public class PromoteGridResponseDto
    {
        public List<PromoteGridDto>? PromoteList { get; set; }
    }



    public class PromoteGridRequestDto
    {
        public Int16 AcademicYearId { get; set; } = 0;

        public Int16 GradeId { get; set; } = 0;
        public Int16 DivisionId { get; set; } = 0;


    }

}
