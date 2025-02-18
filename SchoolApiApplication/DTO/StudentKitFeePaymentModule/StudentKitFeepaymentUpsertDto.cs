using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeePaymentModule;

namespace SchoolApiApplication.DTO.StudentKitFeePaymentModule
{
    public class StudentKitFeepaymentUpsertDto
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
        public decimal? PaidAmount { get; set; }
        public Int16? PaymentTypeId { get; set; }
        public string ChequeNumber { get; set; } = string.Empty;
        public DateTime? ChequeDate { get; set; }
        public SchoolNgbDateModel? ngbChequeDate { get; set; } = new SchoolNgbDateModel();
        public string ChequeBank { get; set; } = string.Empty;
        public decimal? ChequeAmount { get; set; }
        public bool? IsChequeClear { get; set; }
        public bool? SkipDiscount { get; set; }
        public string Remark { get; set; } = string.Empty;
        public decimal? AdditionalDiscountedAmount { get; set; }
        public decimal? InstallmentPaybleFee { get; set; }
        public string? AdditionalDiscountedRemark { get; set; } = string.Empty;
        public int? UserId { get; set; }
      //  public List<StudentKitFeePaymentAppliedWavierMappingTypeUpsertDto>? StudentKitFeePaymentAppliedWavierMappingTypeUpsertDtoList { get; set; } = new List<StudentKitFeePaymentAppliedWavierMappingTypeUpsertDto>();
        public List<StudentKitFeePaymentDetailTypeUpsertDto>? StudentKitFeePaymentDetailTypeUpsertDtoList { get; set; } = new List<StudentKitFeePaymentDetailTypeUpsertDto>();

    }
    public class StudentKitFeePaymentAppliedWavierMappingTypeUpsertDto
    {
        public long FeeParticularWavierMappingId { get; set; }
        public decimal DiscountedPercent { get; set; }
        public decimal DiscountedAmount { get; set; }
    }

    public class StudentKitFeePaymentDetailTypeUpsertDto
    {
        public long FeeParticularId { get; set; }
        public string OtherFeeReason { get; set; } = string.Empty;
        public decimal PaidAmount { get; set; }
        public decimal FeeAfterDiscount { get; set; }
        public decimal AdditionalDiscInPercentage { get; set; }
        public decimal AdditionalDiscAmount { get; set; }
    }
}
