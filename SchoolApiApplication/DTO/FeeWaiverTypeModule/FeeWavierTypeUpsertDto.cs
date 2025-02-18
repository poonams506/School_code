using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeeParticularModule;

namespace SchoolApiApplication.DTO.FeeWaiverTypeModule
{
    public class FeeWavierTypeUpsertDto
    {
        public long FeeWavierTypeId { get; set; } = 0;
        public Int16 AcademicYearId { get; set; } = 0;
        public string FeeWavierTypeName { get; set; } = string.Empty;
        public string FeeWavierDisplayName { get; set; } = string.Empty;
        public string  Description { get; set;} = string.Empty;
        public long CategoryId { get; set; } = 0;
        public Int16? NumberOfInstallments { get; set; } = 0;
        public decimal? DiscountInPercent { get; set; }
        public decimal? LatePerDayFeeInPercent { get; set; }
        public bool IsActive { get; set; }
        public Int32 UserId { get; set; } = 0;
        public List<FeeWavierTypesInstallmentsDetailsTypeDto>? FeeWavierTypesInstallmentsDetailsTypes { get; set; } = new List<FeeWavierTypesInstallmentsDetailsTypeDto>();
    }
    
       
}

