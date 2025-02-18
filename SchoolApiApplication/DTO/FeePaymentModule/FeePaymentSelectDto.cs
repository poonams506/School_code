namespace SchoolApiApplication.DTO.FeePaymentModule
{
    public class FeePaymentSelectDto
    {
        public int PaymentInstallmentDone { get; set; }
        public int SkipDiscountCount { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
        public bool IsNewStudent { get; set; }
        public bool IsRTEStudent { get; set; }
        public bool IsConsationApplicable { get; set; }
        public decimal ConsationAmount { get; set; }
        public decimal PreviousAcademicYearPendingFeeAmount { get; set; }
        public string AppAccessMobileNo { get; set; } = string.Empty;
        public Int16 AcademicYearId { get; set; }
        public string RollNumber { get; set; } = string.Empty;
        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public int? ClassId { get; set; }

        public List<FeePaymentDiscount> FeePaymentDiscountList { get; set; } = new List<FeePaymentDiscount>();
        public List<FeePaymentAdditionalDiscount> FeePaymentAdditionalDiscountList { get; set; } = new List<FeePaymentAdditionalDiscount>();
        public List<FeePaymentParticulars> FeePaymentParticularsList { get; set; } = new List<FeePaymentParticulars>();
        public List<long> UsedInstallmentList { get; set; } = new List<long>();

    }
    public class FeePaymentDiscount
    {
        public Int16 AcademicYearId { get; set; }
        public long FeeParticularWavierMappingId { get; set; }
    }
    public class FeePaymentAdditionalDiscount
    {
        public long FeeAdditionalDiscountId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public decimal AdditionalDiscountedAmount { get; set; }
        public decimal InstallmentPaybleFee { get; set; }
        public int? PaymentInstallmentNumber { get; set; }
        public string AdditionalDiscountedRemark { get; set; } = string.Empty;
        public string? AppliedDate { get; set; }
        public decimal TotalFee { get; set; }
    }

    public class FeePaymentParticulars
    {
        public decimal AdditionalDiscInPercentage { get; set; }
        public long FeeParticularId { get; set; }
        public bool IsDiscountApplicable { get; set; }
        public string ParticularName { get; set; } = string.Empty;
        public decimal TotalFee { get; set; }
        public decimal FeeAfterDiscount { get; set; }
        public decimal PaybleFee { get; set; }
        public decimal DueAmount { get; set; }
        public decimal AlreadyPaid { get; set; }
        public decimal AdditionalDiscAmount { get; set; }
        public bool showError { get; set; }

    }
}
