using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using YamlDotNet.Core;

namespace SchoolApiApplication.DTO.AdhocFeePaymentModule
{
    public class AdhocFeePaymentUpsertDto
    {
        public Int16? AcademicYearId { get; set; }
        public Int16? GradeId { get; set; }
        public Int16? DivisionId { get; set; }
        public long? StudentId { get; set; }
        public string? OnlineTransactionId { get; set; } = string.Empty;
        public DateTime? OnlineTransactionDateTime { get; set; }
        public SchoolNgbDateModel? ngbOnlineTransactionDateTime { get; set; } = new SchoolNgbDateModel();
        public string? OnlinePaymentRequest { get; set; } = string.Empty;
        public string? OnlinePaymentResponse { get; set; } = string.Empty;
        public string? PaidToBank { get; set; } = string.Empty;
        public decimal? TotalFee { get; set; }
        public Int32? ParticularId { get; set; }
        public Int16? PaymentTypeId { get; set; }
        public string ChequeNumber { get; set; } = string.Empty;
        public DateTime? ChequeDate { get; set; }
        public SchoolNgbDateModel? ngbChequeDate { get; set; } = new SchoolNgbDateModel();
        public string ChequeBank { get; set; } = string.Empty;
        public decimal? ChequeAmount { get; set; }
        public bool? IsChequeClear { get; set; }
        public int? UserId { get; set; }
    }
    
}
