namespace SchoolApiApplication.DTO.FeeParticularModule
{
    public class FeeParticularWaiverMappingsDto
    {
        public long? FeeParticularWavierMappingId { get; set; } = 0;
        public int? GradeId { get; set; } = 0;
        public int? DivisionId { get; set; } = 0;

        public int? FeeWavierTypeId { get; set; } = 0;
    }

    public class FeeWaiverDto
    {
       public int FeeParticularWavierMappingId { get; set;} = 0;    
        public int? FeeWavierTypeId { get; set; }
        public string FeeWavierTypeName { get; set; } = string.Empty;
        public string FeeWavierDisplayName { get; set; } = string.Empty;
        public double? DiscountInPercent { get; set; } = 0;
        public double? LatePerDayFeeInPercent { get; set; } = 0;
        public bool IsAlreadyAdded { get; set; } = false;
        public bool? IsFeePaymentAlreadyDone { get; set; } = false;
        public DateTime? LateFeeStartDate { get; set; }
        public DateTime? DiscountEndDate { get; set; }
        public int? NumberOfInstallments { get; set; }
        public int? InstallmentNumber { get; set; }
    }

    public class FeeWaiverResponseDto
    {
        public List<FeeWaiverDto> FeeWaivers { get; set; }  =new List<FeeWaiverDto>();
        public List<FeeWaiverDto> InstallmentDetails { get; set; } = new List<FeeWaiverDto>();
    }
}