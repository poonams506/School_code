using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.TransportFeePaymentModule
{
    public class TransportPaymentReportDaywiseDto
    {
        public CashDaywiseTransportPaymentReport CashDaywiseTransportPaymentReport { get; set; }
        public ChequeDaywiseTransportPaymentReport ChequeDaywiseTransportPaymentReport { get; set; }
        public DDDaywiseTransportPaymentReport DDDaywiseTransportPaymentReport { get; set; }
        public UpiPaymentDaywiseTransportPaymentReport UpiPaymentDaywiseTransportPaymentReport { get; set; }
        public NetBankingTransportDaywisePaymentReport NetBankingDaywiseTransportPaymentReport { get; set; }
        public CardDaywiseTransportPaymentReport CardDaywiseTransportPaymentReport { get; set; }
    }
    public class CashDaywiseTransportPaymentReport
    {
        public List<DaywiseTransportPaymentReport> CashDaywiseTransportPaymentReportList { get; set; }
        public DaywiseTransportPaymentReportTotal CashDaywiseTransportPaymentReportTotal { get; set; }
    }
    public class ChequeDaywiseTransportPaymentReport
    {
        public List<DaywiseTransportPaymentReport> ChequeDaywiseTransportPaymentReportList { get; set; }
        public DaywiseTransportPaymentReportTotal ChequeDaywiseTransportPaymentReportTotal { get; set; }
    }
    public class DDDaywiseTransportPaymentReport
    {
        public List<DaywiseTransportPaymentReport> DDDaywiseTransportPaymentReportList { get; set; }
        public DaywiseTransportPaymentReportTotal DDDaywiseTransportPaymentReportTotal { get; set; }
    }
    public class UpiPaymentDaywiseTransportPaymentReport
    {
        public List<DaywiseTransportPaymentReport> UpiPaymentDaywiseTransportPaymentReportList { get; set; }
        public DaywiseTransportPaymentReportTotal UpiPaymentDaywiseTransportPaymentReportTotal { get; set; }
    }
    public class NetBankingTransportDaywisePaymentReport
    {
        public List<DaywiseTransportPaymentReport> NetBankingDaywiseTransportPaymentReportList { get; set; }
        public DaywiseTransportPaymentReportTotal NetBankingDaywiseTransportPaymentReportTotal { get; set; }
    }
    public class CardDaywiseTransportPaymentReport
    {
        public List<DaywiseTransportPaymentReport> CardDaywiseTransportPaymentReportList { get; set; }
        public DaywiseTransportPaymentReportTotal CardDaywiseTransportPaymentReportTotal { get; set; }
    }
    public class DaywiseTransportPaymentReport
    {
        public string FullName { get; set; } = string.Empty;
        public String UserType { get; set; } = string.Empty;
        public string ChequeNumber { get; set; } = string.Empty;
        public DateTime ChequeDate { get; set; }
        public string ChequeBank { get; set; } = string.Empty;
        public string AcademicYearName { get; set; } = string.Empty;
        public decimal PaymentAmount { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
        public string PaymentMode { get; set; } = string.Empty;
        public decimal ChequeUnclearedAmount { get; set; }
        public string TransactionBy { get; set; } = string.Empty;
        public string TransactionId { get; set; } = string.Empty;

    }
    public class DaywiseTransportPaymentReportTotal
    {
        public decimal TotalPaymentAmount { get; set; }
        public decimal TotalChequeUnclearedAmount { get; set; }
    }
    public class DaywiseTransportPaymentReportRequest
    {
        public SchoolNgbDateModel StartDate { get; set; }
        public SchoolNgbDateModel EndDate { get; set; }
    }
}


