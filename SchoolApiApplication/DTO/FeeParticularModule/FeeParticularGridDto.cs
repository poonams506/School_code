namespace SchoolApiApplication.DTO.FeeparticularModule
{
    public class FeeParticularGridDto
    {
        public int ClassId { get; set; }
        public short GradeId { get; set; } = 0;
        public short DivisionId { get; set; } = 0;
        public string GradeName { get; set; } = string.Empty; 
        public string DivisionName { get; set; } = string.Empty;
        public bool IsFeePaymentAlreadyDone { get; set; } = false;
        public string Status  { get; set; } = string.Empty;
       
      
    }
}
