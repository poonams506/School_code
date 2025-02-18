using SchoolApiApplication.DTO.SchoolHolidayModule;

namespace SchoolApiApplication.DTO.ClassTeacherDataModule
{
    public class ClassTeacherListDto
    {
        public int GradeId { get; set; } = 0;
        public int DivisionId { get; set; } = 0;
    }
    public class ClassTeacherDataDto
    {

        public List<ClassTeacherListDto>? GetGradeDivisionList { get; set; } = new List<ClassTeacherListDto>();

    }
  

}
