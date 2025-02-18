namespace SchoolApiApplication.DTO.TransportFeePaymentModule
{
    public class TransportFeeMonthMastersDto
    {
        public List<TransportFeeMonthMasterDto> TransportFeeMonthMastersList { get; set; } = new List<TransportFeeMonthMasterDto>();
    }

    public class TransportFeeMonthMasterDto
    {
        public bool IsCurrentChecked { get; set; } = false;
        public bool IsAlreadyChecked { get; set; } = false;
        public int? MonthMasterId { get; set; }
        public string? MonthMasterName { get; set; }
        public decimal? PerMonthAmount { get; set; }
    }
}
