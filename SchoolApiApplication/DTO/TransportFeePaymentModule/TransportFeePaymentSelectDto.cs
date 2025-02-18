namespace SchoolApiApplication.DTO.TransportFeePaymentModule
{
    public class TransportFeePaymentSelectDto
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
        public List<TransportFeePaymentAppliedMonths> TransportFeePaymentAppliedMonthList { get; set; } = new List<TransportFeePaymentAppliedMonths>();
        public List<TransportFeePaymentAdditionalDiscount> TransportFeePaymentAdditionalDiscountList { get; set; } = new List<TransportFeePaymentAdditionalDiscount>();
        public List<TransportFeePaymentParticulars> TransportFeePaymentParticularsList { get; set; } = new List<TransportFeePaymentParticulars>();

    }
    public class TransportFeePaymentAppliedMonths
    {
        public Int16 AcademicYearId { get; set; }
        public int MonthMasterId { get; set; }
        public long? TransportFeeAdditionalDiscountId { get; set; }
    }
    public class TransportFeePaymentAdditionalDiscount
    {
        public long TransportFeeAdditionalDiscountId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public decimal AdditionalDiscountedAmount { get; set; }
        public decimal InstallmentPaybleFee { get; set; }
        public int? PaymentInstallmentNumber { get; set; }
        public string AdditionalDiscountedRemark { get; set; } = string.Empty;
        public string? AppliedDate { get; set; }
        public decimal TotalFee { get; set; }
    }

    public class TransportFeePaymentParticulars
    {
        public decimal AdditionalDiscInPercentage { get; set; }
        public decimal TotalFee { get; set; }
        public decimal FeeAfterDiscount { get; set; }
        public decimal PaybleFee { get; set; }
        public decimal DueAmount { get; set; }
        public decimal AlreadyPaid { get; set; }
        public decimal AdditionalDiscAmount { get; set; }
        public bool showError { get; set; }

    }
}
