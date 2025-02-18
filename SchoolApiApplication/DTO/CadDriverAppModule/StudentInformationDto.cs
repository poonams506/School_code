namespace SchoolApiApplication.DTO.CadDriverAppModule
{
    public class StudentInformationDto
    {
        public long StudentId { get; set; }
        public String StudentName { get; set; } = string.Empty;
        public String Gender { get; set; }= string.Empty;   
        public String ClassName { get; set; }=string.Empty;
        public String EmergencyContactNumber { get; set; } = string.Empty;
        
    }
}
