namespace SchoolApiApplication.DTO.StudentAttendanceModule
{
    public class StudentAttendanceUpsertListDto
    {
        public Int64 StudentId { get; set; }
        public Byte? StatusId { get; set; }
        public String? Reason { get; set; }=string.Empty;
    }
}
