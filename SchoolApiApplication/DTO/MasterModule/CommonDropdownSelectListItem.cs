namespace SchoolApiApplication.DTO.MasterModule
{
    public class CommonDropdownSelectListItemResponseDto
    {
        public List<CommonDropdownSelectListItemDto> LstDropdownValues { get; set; } =new List<CommonDropdownSelectListItemDto>();      
    }
    public class CommonDropdownSelectListItemDto
    {
        public int Id { get; set; }
        public string Value { get; set; } = string.Empty;
    }

    public class TeacherDropdownSelectListResponseDto
    {
        public List<TeacherDropdownSelectListDto> LstDropdownValues { get; set; } = new List<TeacherDropdownSelectListDto>();
    }

    public class TeacherDropdownSelectListDto
    {
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }=string.Empty;
        public int SubjectMasterId { get; set;}

    }
}
