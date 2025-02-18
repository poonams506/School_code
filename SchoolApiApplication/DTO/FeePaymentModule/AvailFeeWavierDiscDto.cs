using SchoolApiApplication.DTO.FeeParticularModule;

namespace SchoolApiApplication.DTO.FeePaymentModule
{
    public class AvailFeeWavierDiscDto
    {
        public decimal TotalFee { get; set; }
        public long FeeParticularWavierMappingId { get; set; }
        public long AppliedFeeParticularWavierMappingId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public long FeeWavierTypeId { get; set; }
        public int SortBy { get; set; }
        public string FeeWavierDisplayName { get; set; } = string.Empty;
        public string FeeWavierTypeName { get; set; } = string.Empty;
        public decimal DiscountInPercent { get; set; }
        public decimal? LatePerDayFeeInPercent { get; set; }
        public Int16 NumberOfInstallments { get; set; }
        public decimal ApplicableFee { get; set; }
        public DateTime? LateFeeStartDate { get; set; }
        public DateTime? DiscountEndDate { get; set; }
    }
    public class PaymentFeePageMasterActivityList
    {
        public List<AvailFeeWavierDiscDto> AvailFeeWavierDiscList { get; set; } = new List<AvailFeeWavierDiscDto>();
        public List<AvailFeeWavierDiscByInstallmentDto> AvailFeeWavierDiscByInstallments { get; set; } = new List<AvailFeeWavierDiscByInstallmentDto>();
        public decimal TotalFee { get; set; }
        public List<FeeWaiverDto>? InstallmentDetails { get; set; } = new List<FeeWaiverDto>();
    }
    public class AvailFeeWavierDiscByInstallmentDto
    {
        public int InstallmentNumber { get; set; }
        public DateTime? DiscountEndDate { get; set; }
        public long FeeWavierTypeId { get; set; }
        public long? FeeWavierTypesInstallmentsDetailsId { get; set; }
        public string? FeeWavierDisplayName { get; set; }
    }
}
