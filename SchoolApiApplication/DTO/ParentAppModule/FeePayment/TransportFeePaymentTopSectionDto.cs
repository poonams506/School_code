namespace SchoolApiApplication.DTO.ParentAppModule.FeePayment
{
    public class TransportFeePaymentTopSectionDto
    {
        public decimal? TotalFee { get; set; }
        public decimal? TotalPaid { get; set; }
        public decimal? TotalDue { get; set; }
        public decimal? TotalDiscount { get; set; }
        public List<TransportFeePaymentParticularSectionDto> TransportFeePaymentParticularSectionDtoList { get; set; } = new List<TransportFeePaymentParticularSectionDto>();
        public List<TransportPaymentHistoryReceiptDto> TransportPaymentHistoryReceiptDtoList { get; set; } = new List<TransportPaymentHistoryReceiptDto>();
    }
    public class TransportFeePaymentParticularSectionDto
    {
        public long ConsumerId { get; set; } = 0;
        public int RoleId { get; set; } = 0;
        public int TransportConsumerStoppageMappingId { get; set; } = 0;
        public string RouteName { get; set; } = string.Empty;
        public int PickDropId { get; set; } = 0;
        public decimal PickDropPrice { get; set; } = 0;
        public int Months { get; set; } = 0;
        public string? FromDateString { get; set; }
        public string? ToDateString { get; set; }
        public string StoppageName { get; set; } = string.Empty;
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
    
    public class TransportPaymentHistoryReceiptDto
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


}

