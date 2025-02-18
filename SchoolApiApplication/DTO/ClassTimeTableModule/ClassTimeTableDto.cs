
using DocumentFormat.OpenXml.Wordprocessing;

namespace SchoolApiApplication.DTO.ClassTimeTableModule
{
    public class StudentClassTimeTableRequestDto
    {
        public int ClassId { get; set; }
        public int AcademicYearId { get; set; }
    }
    public class TeacherClassTimeTableRequestDto
    {
        public int TeacherId { get; set; }
        public List<int> ClassId { get; set; } = new List<int>();
        public int AcademicYearId { get; set; }
    }
    public class ClassTimeTableSelectResponseDto
    {
        public int? ClassId { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public int? GradeId { get; set; }
        public int? DivisionId { get; set; }
        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public List<ClassTimeTableDto> ClassTimeTable { get; set; }=new List<ClassTimeTableDto>();  
    }

    public class ClassTimeTableDto
    {
        public int ClassTimeTableId { get;set; }
        public int ClassId { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public string ClassTimeTableName { get; set; } = string.Empty;
        public int UserId { get; set; }
        public int AcademicYearId { get; set; }
        public bool IsSkipTimeTableValidation { get; set; }
        public List<ClassTimeTableRowDetailDto> LstClassTimeTableRow { get; set; } = new List<ClassTimeTableRowDetailDto>();
         
        public bool IsActive { get; set; }
    }
    public class ClassTimeTableRowDetailDto
    {
        public int ClassTimeTableId { get; set; }
        public int PeriodTypeId { get; set; }
        public int StartingHour { get; set; }
        public int StartingMinute { get; set; }
        public int EndingHour { get; set; }
        public int EndingMinute { get; set; }
        public int SequenceId { get; set; }
        public List<ClassTimeTableColumnDetailDto> LstClassTimeTableColumn { get; set; } = new List<ClassTimeTableColumnDetailDto>();
    }

    public class ClassTimeTableColumnDetailDto
    {
        public int ClassTimeTableId { get; set; }
        public int Day { get; set; }
        public string DayName { get; set; } = string.Empty;
        public int? SubjectId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public string TeacherName { get; set; } = string.Empty;
        public int? TeacherId { get; set; }
        public int SequenceId { get; set; }
        public string ClassName { get; set;} = string.Empty;    
    }

    public class CreateTimeTableResponse
    {
        public bool IsSuccess { get; set; } = true;
        public List<TeacherOverlapComparisonErrorDto> lstOverlapPeriod { get; set; } = new List<TeacherOverlapComparisonErrorDto>();
    }

    public class TeacherOverlapComparisonErrorDto
    {
        public int? TeacherId { get; set; }
        public string TeacherName { get; set;}=string.Empty;
       
        public int Day { get; set;}
        public string DayName { get; set;} = string.Empty;
        public int SubjectIdToSave { get; set; }
        public string SubjectNameToSave { get; set;} = string.Empty;  
        public int ExistingSubjectId { get; set; }
        public string ExistingSubjectName { get;set; } = string.Empty;
        public int StartingHour { get; set; }
        public int StartingMinute { get; set; }
        public int EndingHour { get; set; }
        public int EndingMinute { get; set; }
        public string ClassName { get; set;} = string.Empty;
    }

    public class TeacherOverlapComparisonPeriodDto
    {
        public int TeacherId { get; set; }
        public string TeacherName { get; set; } = string.Empty;
        public DateTime StartDate { get;set; }
        public DateTime EndDate { get;set; } 
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }=string.Empty;
        public int Day { get; set; }
        public string DayName { get; set; } = string.Empty;
        public int StartingHour { get; set; }
        public int StartingMinute { get; set; }
        public int EndingHour { get; set; }
        public int EndingMinute { get; set; }

        public int AcademicYearId { get; set;}
        public int ClassTimeTableId { get; set; }
        public string ClassName { get; set; } = string.Empty;

    }

    
    public class MarkTimeTableActiveRequestModel
    { 
        public  List<MarkTimeTableActiveSelectModel> LstActiveTimeTableId { get; set; }=new List<MarkTimeTableActiveSelectModel>();
    }

    public class MarkTimeTableActiveSelectModel
    {
        public int ClassTimeTableId { get; set; }
        public bool IsActive { get; set; }
    }
     
  

}

