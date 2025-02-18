using SchoolApiApplication.DTO.MasterModule;

namespace SchoolApiApplication.DTO.FeeParticularModule
{
    public class FeeParticularsDto
    {
        public long FeeParticularId { get; set; } = 0;
        public decimal? Amount { get; set; } = 0;
        public int? ClassId { get; set; }

        public bool? IsDiscountApplicable { get; set; }=false;
        public bool? IsRTEApplicable { get; set; } = false;
        public string ParticularName { get; set; } = string.Empty;
        public bool IsPublish { get;set; } = false;
        public int? SortBy { get; set; } = 0;
        public bool? IsFeePaymentAlreadyDone { get; set; } = false;

    }
    public class StudentKitFeeParticularsDto
    {
        public long FeeParticularId { get; set; } = 0;
        public decimal? Amount { get; set; } = 0;
        public int? ClassId { get; set; }

        public string ParticularName { get; set; } = string.Empty;
        public bool IsPublish { get; set; } = false;
        public int? SortBy { get; set; } = 0;
        public bool? IsFeePaymentAlreadyDone { get; set; } = false;

    }

}

