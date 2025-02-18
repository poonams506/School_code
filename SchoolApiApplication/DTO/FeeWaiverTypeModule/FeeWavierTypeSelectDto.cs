using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.FeeWaiverTypeModule
{
    public class FeeWavierTypeSelectDto
    {
        public long FeeWavierTypeId { get; set; } = 0;
        public Int16 AcademicYearId { get; set; } = 0;
        public string FeeWavierTypeName { get; set; } = string.Empty;
        public string FeeWavierDisplayName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Int16 CategoryId { get; set; } = 0;
        public Int16? NumberOfInstallments { get; set; } = 0;
        public decimal? DiscountInPercent { get; set; }
        public decimal? LatePerDayFeeInPercent { get; set; }
        public bool IsActive { get; set; }
        public List<FeeWavierTypesInstallmentsDetailsTypeDto>? FeeWavierTypesInstallmentsDetailsTypes { get; set; } = new List<FeeWavierTypesInstallmentsDetailsTypeDto>();
        public bool IsInstallmentUsedInFeePayment { get; set; }

    }
}
