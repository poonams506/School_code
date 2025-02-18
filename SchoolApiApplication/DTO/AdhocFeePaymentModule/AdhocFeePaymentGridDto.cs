namespace SchoolApiApplication.DTO.AdhocFeePaymentModule
{
    public class AdhocFeePaymentGridDto
    {
        public long StudentId { get; set; } = 0;
        public Int16 GradeId { get; set; } = 0;
        public Int16 DivisionId { get; set; } = 0;
        public string  GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public Int16 AcademicYearId { get; set; } = 0;
        public string FullName { get; set; } = string.Empty;
        public decimal TotalFee { get; set; } = decimal.Zero;
        public decimal ChequeClearedAmount { get; set; } = decimal.Zero;
        public string? GeneralRegistrationNo { get; set; }
        public decimal ChequeUnclearAmount { get; set; } = decimal.Zero;
        public bool IsRTEStudent { get; set; } = false;

    }
}
