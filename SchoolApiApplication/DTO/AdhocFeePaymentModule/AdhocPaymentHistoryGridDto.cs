using System.Transactions;

namespace SchoolApiApplication.DTO.AdhocFeePaymentModule
{
    public class AdhocPaymentHistoryGridDto
    {
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime? OnlineTransactionDateTime { get; set; }
        public decimal TotalFee { get; set; }
        public string Particular { get; set; } = string.Empty;
        public string PaymentTypeName { get; set; } = string.Empty;
        public DateTime? ChequeDate { get; set; }
        public string IsChequeOrDDClear { get; set; } = string.Empty;
        public string OnlineTransactionId { get; set; } = string.Empty;
        public long AdhocFeePaymentId { get; set; }
    }
}
