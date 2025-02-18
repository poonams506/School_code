namespace SchoolApiApplication.DTO.ClassWiseTeacherAndStudentDto
{
    public class ClassTeacherDto
    {
        public int? AcademicYearId { get; set; }
        public int? Id { get; set; }
        public string ClassName { get; set; } = string.Empty;

        public string ClassTeacherName { get; set; } = string.Empty;
    }

    public class ClassTeacherResponseDto
    {
        public List<ClassTeacherDto> ClassTeacherList { get; set; } = new List<ClassTeacherDto>();

    }
    public class ClassWiseStudentDto
    {
        public int? AcademicYearId { get; set; }
        public int? ClassTeacherId { get; set; }
        public int? StudentId { get; set; }
      
       
        public string ClassName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;

    }
    public class ClassWiseStudentResponseDto
    {
        public List<ClassWiseStudentDto> ClassWiseStudentList { get; set; } = new List<ClassWiseStudentDto>();

    }
}