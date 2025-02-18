namespace SchoolApiApplication.DTO.TransportFeePaymentModule
{
    public class TransportFeePaymentStaffGridDto
    {
        public long ConsumerId { get; set; } = 0;
        public int RoleId { get; set; } = 0;
        public string RoleName { get; set; } = string.Empty;
        public Int16 AcademicYearId { get; set; } = 0;
        public string? AcademicYearKey { get; set; }
        public string FullName { get; set; } = string.Empty;
        public decimal TotalFee { get; set; } = decimal.Zero;
        public decimal DiscountedFee { get; set; } = decimal.Zero;
        public decimal PaidAmount { get; set; } = decimal.Zero;
        public decimal OtherPaidAmount { get; set; } = decimal.Zero;
        public decimal DueAmount { get; set; } = decimal.Zero;
        public decimal ChequeClearedAmount { get; set; } = decimal.Zero;
        public decimal ChequeUnclearAmount { get; set; } = decimal.Zero;

    }
}
