using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.DTO.BulkAttendanceUpdateModule
{
    public class BulkAttendanceUpdateDto
    {
        public int? AcademicYearId { get; set; }
        public DateTime? AcademicYearStartMonth { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        public int? DivisionId { get; set; }
        public string DivisionName { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public int? MonthId { get; set; }
        public int? Year { get; set; }
        public int? YearId { get; set; }
        public string Month { get; set; } = string.Empty;
        public int? StatusId { get; set; }
        public int? StudentId { get; set; }
        public string AttendanceStatus { get; set; } = string.Empty;

        public DateTime? AttendanceDateTime { get; set; }
        public SchoolNgbDateModel? ngbAttendanceDateTime { get; set; }
        public int? UserId { get; set; }
        public List<BulkAttendanceUpdateUpsertDto> AttendanceStatusList { get; set; } = new List<BulkAttendanceUpdateUpsertDto>();
    }

    public class BulkAttentanceStudentDto
    {
        public int StudentId { get; set; } = 0;
        public string StudentName { get; set; } = string.Empty;
        public string RollNumber { get; set; } = string.Empty;

    }

    public class BulkSelectResponseDto
    {
        public List<StudentAttendanceStatusUpdateDTO> HeaderAttendanceStatusList { get; set; } = new List<StudentAttendanceStatusUpdateDTO>();
        public List<BulkAttentanceStudentDto> BulkStudentList { get; set; } = new List<BulkAttentanceStudentDto>();
        public List<StudentAttendanceStatusUpdateDTO> BulkList { get; set; } = new List<StudentAttendanceStatusUpdateDTO>();
    }

    public class StudentAttendanceStatusUpdateDTO
    {
        public int StudentId { get; set; } = 0;
        public string StudentName { get; set; } = string.Empty;
        public int? StatusId { get; set; }
        public DateTime? AttendanceDateTime { get; set; }
        public SchoolNgbDateModel? ngbAttendanceDateTime { get; set; }
        public string Month { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public string RollNumber { get; set; } = string.Empty;

    }

    public class StudentAttendanceUpdateRequestDto
    {
        public int AcademicYearId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public int? MonthId { get; set; }
        public int? YearId { get; set; }
    }

    public class BulkAttendanceUpdateUpsertDto
    {
        public int StudentId { get; set; } = 0;
        public int? StatusId { get; set; }
        public DateTime? AttendanceDateTime { get; set; }
        public SchoolNgbDateModel? ngbAttendanceDateTime { get; set; }

    }

    public class StudentAttendanceSummaryDto
    {
        public int StudentId { get; set; }
        public string RollNumber { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;
        public int PresentDays { get; set; }
        public int AbsentDays { get; set; }
        public string AttendanceStatus { get; set; } = string.Empty;
        public string Month { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;

        public int GradeId { get; set; }
        public int DivisionId { get; set; }
        public int MonthId { get; set; }
        public int YearId { get; set; }
    }


    public class AttendanceSummaryBulkResponseDto
    {
        public List<StudentAttendanceSummaryDto> AttendanceSummaryList { get; set; } = new List<StudentAttendanceSummaryDto>();
   
    }

    public class StudentAttendanceStatusInsertDto
    {
        public int AcademicYearId { get; set; } = 0;
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
        public int? MonthId { get; set; }
        public int? YearId { get; set; }

    }
}
