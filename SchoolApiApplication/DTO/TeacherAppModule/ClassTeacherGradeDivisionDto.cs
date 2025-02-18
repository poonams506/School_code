using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.DTO.TeacherAppModule
{
  
    public class ClassTeacherGradeDivisionListDto
    {
        public List<SchoolGradeDivisionMatrixDto> ClassTeacherGradeDivisionList { get; set; } = new List<SchoolGradeDivisionMatrixDto>();
    }

    public class TeacherClassSubjectRequestDto
    {
        public int AcademicYearId { get; set; }
        public int TeacherId { get; set; }
        public int ClassId { get; set; }
    }

    public class TeacherClassSubjectResponseDto
    {
        public List<TeacherClassSubjectDto> LstSubject { get; set; }=new List<TeacherClassSubjectDto>();    
    }
    public class TeacherClassSubjectDto
    {
        public int SubjectMasterId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
    }
}
