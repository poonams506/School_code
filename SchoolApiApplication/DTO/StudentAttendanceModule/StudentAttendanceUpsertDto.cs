using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.StudentAttendanceModule
{
    public class StudentAttendanceUpsertDto
    {
        public Int16 AcademicYearId { get; set; } = 0;
        public Int16 GradeId { get; set; } = 0;
        public Int16 DivisionId { get; set; } = 0;
        public DateTime AttendanceDate { get; set; }
        public SchoolNgbDateModel? ngbAttendanceDate { get; set; }
        public Int32 UserId { get; set; } = 0;
       

        public List<StudentAttendanceUpsertListDto> StudentAttendanceUpsertLists { get; set; } = new List<StudentAttendanceUpsertListDto>();
    }
    public class StudentAttendanceUpsertResponseDto
    {
        public int Success { get; set; } =0;
        public int IsSchoolHoliday { get; set; } = 0;

    }
}