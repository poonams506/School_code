namespace SchoolApiApplication.DTO.SubjectMasterModule
{
    public class SubjectMasterDto
    {
        public int SubjectMasterId { get; set; }
        public string? SubjectName { get; set; }
    }

    public class TimetableSubjectDropdownRequestDto
    {
        public List<int> LstClass { get; set; } = new List<int>();
        public int AcademicYearId { get; set; }
    }

    public class TimetableSubjectDropdownResponseDto
    {
        public List<TimetableSubjectDropdownDto> Subjects { get; set; } = new List<TimetableSubjectDropdownDto>();
    }

    public class TimetableSubjectDropdownDto
    {
        public int ClassId { get; set; }
        public int SubjectId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
    }
    public class SubjectMasterDeleteResponceDto
    {
        public int AffectedRows { get; set; } = 0;
        public int SubjectMappingCount { get; set; } = 0;
        public int TeacherSubjectMappingCount { get; set; } = 0;
        public int ObjectCount { get; set; } = 0;
    }
}
