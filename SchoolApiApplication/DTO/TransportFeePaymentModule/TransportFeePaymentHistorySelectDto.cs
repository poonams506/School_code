using System.Diagnostics.Metrics;

namespace SchoolApiApplication.DTO.TransportFeePaymentModule
{
    public class TransportFeePaymentHistorySelectDto
    {
        public string SchoolName { get; set; } = string.Empty;
        public string SchoolAddress { get; set; } = string.Empty;
        public Int16 AcademicYearId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public string RollNumber { get; set; } = string.Empty;
        public string? GeneralRegistrationNo { get; set; }
        public string PaymentTypeName { get; set; } = string.Empty;
        public DateTime? PaymentDate { get; set; }
        public DateTime? ChequeDate { get; set; }
        public string ChequeBank { get; set; } = string.Empty;
        public string TransactionId { get; set; } = string.Empty;
        public string InvoiceNumber { get; set; } = string.Empty;
        public List<TransportFeeSelectDto> TransportFeeSelectList { get; set; } = new List<TransportFeeSelectDto>();
        public List<string> PaidMonthList { get; set; } = new List<string>();
    }

    public class TransportFeeSelectDto
    {
        public decimal TotalFee { get; set; }
        public decimal FeeAfterDiscount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal DueAmount { get; set; }
        public decimal AlreadyPaid { get; set; }
    }
}
