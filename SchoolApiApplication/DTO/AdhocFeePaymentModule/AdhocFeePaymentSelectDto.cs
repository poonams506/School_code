namespace SchoolApiApplication.DTO.AdhocFeePaymentModule
{
    public class AdhocFeePaymentSelectDto
    {
        public string FullName { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
        public bool IsNewStudent { get; set; }
        public bool IsRTEStudent { get; set; }
        public string AppAccessMobileNo { get; set; } = string.Empty;
        public Int16 AcademicYearId { get; set; }
        public string RollNumber { get; set; } = string.Empty;
        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;

    }
   
}
