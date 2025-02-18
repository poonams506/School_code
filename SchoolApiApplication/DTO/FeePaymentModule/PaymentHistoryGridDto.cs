using System.Transactions;

namespace SchoolApiApplication.DTO.FeePaymentModule
{
    public class PaymentHistoryGridDto
    {
        public int InstallmentNumber { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime? OnlineTransactionDateTime { get; set; }
        public decimal PaidAmount { get; set; }
        public string PaymentTypeName { get; set; } = string.Empty;
        public DateTime? ChequeDate { get; set; }
        public string IsChequeOrDDClear { get; set; } = string.Empty;
        public string OnlineTransactionId { get; set; } = string.Empty;
        public long FeePaymentId { get; set; }
    }
}
