using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.FeePaymentModule
{
    public class DaywisePaymentReportDTO
    {
       public CashDaywisePaymentReport CashDaywisePaymentReport { get; set; }
       public ChequeDaywisePaymentReport ChequeDaywisePaymentReport { get; set; }
       public DDDaywisePaymentReport DDDaywisePaymentReport { get; set; }
       public UpiPaymentDaywisePaymentReport UpiPaymentDaywisePaymentReport { get; set; }
       public NetBankingDaywisePaymentReport NetBankingDaywisePaymentReport { get; set; }
       public CardDaywisePaymentReport CardDaywisePaymentReport { get; set; }
    }
    public class CashDaywisePaymentReport
    {
        public List<DaywisePaymentReport> CashDaywisePaymentReportList { get; set; }
        public DaywisePaymentReportTotal CashDaywisePaymentReportTotal { get; set; }
    }
    public class ChequeDaywisePaymentReport
    {
        public List<DaywisePaymentReport> ChequeDaywisePaymentReportList { get; set; }
        public DaywisePaymentReportTotal ChequeDaywisePaymentReportTotal { get; set; }
    }
    public class DDDaywisePaymentReport
    {
        public List<DaywisePaymentReport> DDDaywisePaymentReportList { get; set; }
        public DaywisePaymentReportTotal DDDaywisePaymentReportTotal { get; set; }
    }
    public class UpiPaymentDaywisePaymentReport
    {
        public List<DaywisePaymentReport> UpiPaymentDaywisePaymentReportList { get; set; }
        public DaywisePaymentReportTotal UpiPaymentDaywisePaymentReportTotal { get; set; }
    }
    public class NetBankingDaywisePaymentReport
    {
        public List<DaywisePaymentReport> NetBankingDaywisePaymentReportList { get; set; }
        public DaywisePaymentReportTotal NetBankingDaywisePaymentReportTotal { get; set; }
    }
    public class CardDaywisePaymentReport
    {
        public List<DaywisePaymentReport> CardDaywisePaymentReportList { get; set; }
        public DaywisePaymentReportTotal CardDaywisePaymentReportTotal { get; set; }
    }
    public class DaywisePaymentReport
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
    public class DaywisePaymentReportTotal
    {
        public decimal TotalPaymentAmount { get; set; }
        public decimal TotalChequeUnclearedAmount { get; set; }
    }
    public class DaywisePaymentReportRequest
    {     
        public SchoolNgbDateModel StartDate { get; set; }
        public SchoolNgbDateModel EndDate  { get; set; }     
    }
}
