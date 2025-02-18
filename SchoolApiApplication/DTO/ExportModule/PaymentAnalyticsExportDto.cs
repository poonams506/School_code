using SchoolApiApplication.DTO.PaymentAnalytics;

namespace SchoolApiApplication.DTO.ExportModule
{
    public class PaymentAnalyticsExportDto
    {
        public List<PaymentAnalyticsSchoolExportDto> PaymentAnalyticsExportSchool { get; set; }
        public List<PaymentAnalyticsGradeExportDto> PaymentAnalyticsExportGrade { get; set; }
        public List<PaymentAnalyticsDivisionExportDto> PaymentAnalyticsExportDivision { get; set; }
    }

    public class PaymentAnalyticsSchoolExportDto
    {
        public String? SchoolName { get; set; }
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public string? RollNumber { get; set; }
        public string? StudentName { get; set; }
        public string? IsRTEStudent { get; set; }
        public string? IsNewStudent { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
        public string? ContactNo { get; set; }
    }
    public class PaymentAnalyticsGradeExportDto
    {
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public string? RollNumber { get; set; }
        public string? StudentName { get; set; } 
        public string? IsRTEStudent { get; set; }
        public string? IsNewStudent { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
        public string? ContactNo { get; set; }

    }

    public class  PaymentAnalyticsDivisionExportDto
    {
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public string? RollNumber { get; set; }
        public string? StudentName { get; set; }
        public string? IsRTEStudent { get; set; }
        public string? IsNewStudent { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal CollectionInPercentage { get; set; }
        public Decimal ReceivableFee { get; set; }
        public string? ContactNo { get; set; }
    }



}
