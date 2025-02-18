namespace SchoolApiApplication.DTO.TeacherSubjectMapping
{
    public class TeacherSubjectMappingDto
    {
        public int TeacherSubjectMappingId { get; set; } = 0;
        public int AcademicYearId { get; set; } = 0;
        public int TeacherId { get; set; } = 0;
        public string? FullName { get; set; }
        public int? LecturePerWeek { get; set; }
        public string SubjectMasterIds { get; set; } = string.Empty;
        public int UserId { get; set; } = 0;
        public List<int> TeacherSubjectList { get; set; } = new List<int>();
    }
    public class TeacherSubjectMappingTypeDto
    {
        public int SubjectMasterId { get; set; } = 0;
    }
    public class TeacherSubjectExistResposeDto
    {
        public string SubjectName { get; set; } = string.Empty;
        public int? ExistsInClassTimeTable { get; set; }
        public int Success { get; set; } = 0;
    }

    public class TeacherSubjectMappingUpsertDto
    {
        public List<TeacherSubjectExistResposeDto> TeacherSubjectExistResposeList { get; set; } = new List<TeacherSubjectExistResposeDto>();
    }
}
