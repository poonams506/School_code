using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.DTO.FeeWaiverTypeModule
{
    public class FeeWavierTypesInstallmentsDetailsTypeDto
    {
        public long FeeWavierTypesInstallmentsDetailsTypeId { get; set; } = 0;
        public DateTime? LateFeeStartDate { get; set; }
        public SchoolNgbDateModel? NgbLateFeeStartDate { get; set; }
        public DateTime? DiscountEndDate { get; set; }
        public SchoolNgbDateModel? NgbDiscountEndDate { get; set; }
    }

}

