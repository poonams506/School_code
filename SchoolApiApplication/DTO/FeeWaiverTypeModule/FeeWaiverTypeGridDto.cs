namespace SchoolApiApplication.DTO.FeeWavierTypeModule
{
    public class FeeWavierTypeGridDto
    {
        public long FeeWavierTypeId { get; set; } = 0;
        public string FeeWavierTypeName { get; set; } = string.Empty;
        public string FeeWavierDisplayName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Int16? NumberOfInstallments { get; set; } = 0;
        public decimal? DiscountInPercent { get; set; }
        public decimal? LatePerDayFeeInPercent { get; set; }
        public string IsActive { get; set; }= string.Empty;
  }
    public class FeeWavierTypeDeleteResponseDto
    {
        public int AffectedRows { get; set; }
    }
    public class FeeWavierTypeUpdateResponseDto
    {
        public int AffectedRows { get; set; }
    }
}
