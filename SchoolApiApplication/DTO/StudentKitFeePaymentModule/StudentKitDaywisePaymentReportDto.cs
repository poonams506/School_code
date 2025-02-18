using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;

namespace SchoolApiApplication.DTO.StudentKitFeePaymentModule
{
    public class StudentKitDaywisePaymentReportDto
    {
        public CashStudentKitDaywisePaymentReport CashStudentKitDaywisePaymentReport { get; set; }
        public ChequeStudentKitDaywisePaymentReport ChequeStudentKitDaywisePaymentReport { get; set; }
        public DDStudentKitDaywisePaymentReport DDStudentKitDaywisePaymentReport { get; set; }
        public UpiStudentKitDaywisePaymentReport UpiStudentKitDaywisePaymentReport { get; set; }
        public NetBankingStudentKitDaywisePaymentReport NetBankingStudentKitDaywisePaymentReport { get; set; }
        public CardStudentKitDaywisePaymentReport CardStudentKitDaywisePaymentReport { get; set; }
    }

    public class CashStudentKitDaywisePaymentReport
    {
        public List<StudentKitDaywisePaymentReport> CashStudentKitDaywisePaymentReportList { get; set; }
        public StudentKitDaywisePaymentReportTotal CashStudentKitDaywisePaymentReportTotal { get; set; }
    }

    public class ChequeStudentKitDaywisePaymentReport
    {
        public List<StudentKitDaywisePaymentReport> ChequeStudentKitDaywisePaymentReportList { get; set; }
        public StudentKitDaywisePaymentReportTotal ChequeStudentKitDaywisePaymentReportTotal { get; set; }
    }

    public class DDStudentKitDaywisePaymentReport
    {
        public List<StudentKitDaywisePaymentReport> DDStudentKitDaywisePaymentReportList { get; set; }
        public StudentKitDaywisePaymentReportTotal DDStudentKitDaywisePaymentReportTotal { get; set; }
    }

    public class UpiStudentKitDaywisePaymentReport
    {
        public List<StudentKitDaywisePaymentReport> UpiStudentKitPaymentDaywisePaymentReportList { get; set; }
        public StudentKitDaywisePaymentReportTotal UpiStudentKitPaymentDaywisePaymentReportTotal { get; set; }
    }

    public class NetBankingStudentKitDaywisePaymentReport
    {
        public List<StudentKitDaywisePaymentReport> NetBankingStudentKitDaywisePaymentReportList { get; set; }
        public StudentKitDaywisePaymentReportTotal NetBankingStudentKitDaywisePaymentReportTotal { get; set; }
    }

    public class CardStudentKitDaywisePaymentReport
    {
        public List<StudentKitDaywisePaymentReport> CardStudentKitDaywisePaymentReportList { get; set; }
        public StudentKitDaywisePaymentReportTotal CardStudentKitDaywisePaymentReportTotal { get; set; }
    }

    public class StudentKitDaywisePaymentReport
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

    public class StudentKitDaywisePaymentReportTotal
    {
        public decimal TotalPaymentAmount { get; set; }
        public decimal TotalChequeUnclearedAmount { get; set; }
    }

    public class StudentKitDaywisePaymentReportRequest
    {
        public SchoolNgbDateModel StartDate { get; set; }
        public SchoolNgbDateModel EndDate { get; set; }
    }
}
