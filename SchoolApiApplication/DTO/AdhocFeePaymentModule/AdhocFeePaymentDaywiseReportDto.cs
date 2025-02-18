using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;

namespace SchoolApiApplication.DTO.AdhocFeePaymentModule
{
    public class AdhocFeePaymentDaywiseReportDto
    {
        public CashDaywiseAdhocPaymentReport CashDaywiseAdhocPaymentReport { get; set; }
        public ChequeDaywiseAdhocPaymentReport ChequeDaywiseAdhocPaymentReport { get; set; }
        public DDDaywiseAdhocPaymentReport DDDaywiseAdhocPaymentReport { get; set; }
        public UpiAdhocPaymentDaywiseReport UpiAdhocPaymentDaywiseReport { get; set; }
        public NetBankingAdhocDaywisePaymentReport NetBankingAdhocDaywisePaymentReport { get; set; }
        public CardDaywiseAdhocPaymentReport CardDaywiseAdhocPaymentReport { get; set; }
    }

    public class CashDaywiseAdhocPaymentReport
    {
        public List<DaywiseAdhocPaymentReport> CashDaywiseAdhocPaymentReportList { get; set; }
        public DaywiseAdhocPaymentReportTotal CashAdhocDaywisePaymentReportTotal { get; set; }
    }

    public class ChequeDaywiseAdhocPaymentReport
    {
        public List<DaywiseAdhocPaymentReport> ChequeDaywiseAdhocPaymentReportList { get; set; }
        public DaywiseAdhocPaymentReportTotal ChequeDaywiseAdhocPaymentReportTotal { get; set; }
    }

    public class DDDaywiseAdhocPaymentReport
    {
        public List<DaywiseAdhocPaymentReport> DDDaywiseAdhocPaymentReportList { get; set; }
        public DaywiseAdhocPaymentReportTotal DDDaywiseAdhocPaymentReportTotal { get; set; }
    }

    public class UpiAdhocPaymentDaywiseReport
    {
        public List<DaywiseAdhocPaymentReport> UpiAdhocPaymentDaywisePaymentReportList { get; set; }
        public DaywiseAdhocPaymentReportTotal UpiAdhocPaymentDaywisePaymentReportTotal { get; set; }
    }

    public class NetBankingAdhocDaywisePaymentReport
    {
        public List<DaywiseAdhocPaymentReport> NetBankingDaywiseAdhocPaymentReportList { get; set; }
        public DaywiseAdhocPaymentReportTotal NetBankingDaywiseAdhocPaymentReportTotal { get; set; }
    }

    public class CardDaywiseAdhocPaymentReport
    {
        public List<DaywiseAdhocPaymentReport> CardDaywiseAdhocPaymentReportList { get; set; }
        public DaywiseAdhocPaymentReportTotal CardDaywiseAdhocPaymentReportTotal { get; set; }
    }

    public class DaywiseAdhocPaymentReport
    {
        public string StudentName { get; set; } = string.Empty;
        public string Class { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
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

    public class DaywiseAdhocPaymentReportTotal
    {
        public decimal TotalPaymentAmount { get; set; }
        public decimal TotalChequeUnclearedAmount { get; set; }
    }
    public class DaywiseAdhocPaymentReportRequest
    {
        public SchoolNgbDateModel StartDate { get; set; }
        public SchoolNgbDateModel EndDate { get; set; }
    }
}
