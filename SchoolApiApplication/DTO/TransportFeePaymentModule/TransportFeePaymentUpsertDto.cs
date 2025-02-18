using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using YamlDotNet.Core;

namespace SchoolApiApplication.DTO.TransportFeePaymentModule
{
    public class TransportFeePaymentUpsertDto
    {
        public Int16? AcademicYearId { get; set; }
        public int? RoleId { get; set; }
        public long? ConsumerId { get; set; }
        public int? TransportConsumerStoppageMappingId { get; set; }
        public string? OnlineTransactionId { get; set; } = string.Empty;
        public DateTime? OnlineTransactionDateTime { get; set; }
        public SchoolNgbDateModel? ngbOnlineTransactionDateTime { get; set; } = new SchoolNgbDateModel();
        public string? OnlinePaymentRequest { get; set; } = string.Empty;
        public string? OnlinePaymentResponse { get; set; } = string.Empty;
        public string? PaidToBank { get; set; } = string.Empty;
        public decimal? PaidAmount { get; set; }
        public Int16? PaymentTypeId { get; set; }
        public string ChequeNumber { get; set; } = string.Empty;
        public DateTime? ChequeDate { get; set; }
        public SchoolNgbDateModel? ngbChequeDate { get; set; } = new SchoolNgbDateModel();
        public string ChequeBank { get; set; } = string.Empty;
        public decimal? ChequeAmount { get; set; }
        public bool? IsChequeClear { get; set; }
        public string Remark { get; set; } = string.Empty;
        public decimal? AdditionalDiscountedAmount { get; set; }
        public decimal? InstallmentPaybleFee { get; set; }
        public string? AdditionalDiscountedRemark { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public List<TransportFeePaymentAppliedMonthMappingTypeUpsertDto> TransportFeePaymentAppliedMonthMappingTypeUpsertDtoList { get; set; } = new List<TransportFeePaymentAppliedMonthMappingTypeUpsertDto>();
        public List<TransportFeePaymentDetailTypeUpsertDto> TransportFeePaymentDetailTypeUpsertDtoList { get; set; } = new List<TransportFeePaymentDetailTypeUpsertDto>();
    }

    public class TransportFeePaymentAppliedMonthMappingTypeUpsertDto
    {
        public int MonthMasterId { get; set; }
        public decimal DiscountedPercent { get; set; }
        public decimal DiscountedAmount { get; set; }
    }

    public class TransportFeePaymentDetailTypeUpsertDto
    {
        public string OtherFeeReason { get; set; } = string.Empty;
        public decimal PaidAmount { get; set; }
        public decimal FeeAfterDiscount { get; set; }
        public decimal AdditionalDiscInPercentage { get; set; }
        public decimal AdditionalDiscAmount { get; set; }
    }
}
