namespace SchoolApiApplication.DTO.ParentAppModule.FeePayment
{
    public class FeePaymentTopSectionDto
    {
        public decimal? TotalFee { get; set; }
        public decimal? TotalPaid { get; set; }
        public decimal? TotalDue { get; set; }
        public decimal? TotalDiscount { get; set; }
        public long? FeeWavierTypeId { get; set; }
        public List<FeePaymentParticularSectionDto> FeePaymentParticularSectionDtoList { get; set; } = new List<FeePaymentParticularSectionDto>();
        public List<FeePaymentAndDiscountSectionDto> FeePaymentAndDiscountSectionDtoList { get; set; } = new List<FeePaymentAndDiscountSectionDto>();
        public List<PaymentHistoryReceiptDto> PaymentHistoryReceiptDtoList { get; set; } = new List<PaymentHistoryReceiptDto>();
        public List<FeeInstallmentDetailDto> FeeInstallmentDetailDtoList { get; set; } = new List<FeeInstallmentDetailDto>();
    }
    public class FeePaymentParticularSectionDto
    {
        public string? ParticularName { get; set; }
        public decimal? TotalFee { get; set; }
    }
    public class FeePaymentAndDiscountSectionDto
    {
        public string? FeeWavierDisplayName { get; set; }
        public long? FeeWavierTypeId { get; set; }
        public decimal? TotalFee { get; set; }
        public decimal? DiscountInPercent { get; set; }
        public decimal? ApplicableFee { get; set; }
        public int? NumberOfInstallments { get; set; }
        public DateTime? DiscountEndDate { get; set; }
    }
    public class PaymentHistoryReceiptDto
    {
        public int? InstallmentNumber { get; set; }
        public string? InvoiceNumber { get; set; }
        public DateTime? OnlineTransactionDateTime { get; set; }
        public decimal? PaidAmount { get; set; }
        public string? PaymentTypeName { get; set; }
        public DateTime? ChequeDate { get; set; }
        public string? OnlineTransactionId { get; set; }
        public string? IsChequeOrDDClear { get; set; }
    }

    public class FeeInstallmentDetailDto
    {
        public DateTime? DiscountEndDate { get; set; }
        public DateTime? LateFeeStartDate { get; set; }
        public long? FeeWavierTypeId { get; set; }
        public int? InstallmentNumber { get; set; }
    }


}

