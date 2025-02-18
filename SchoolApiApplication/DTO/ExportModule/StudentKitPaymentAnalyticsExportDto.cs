namespace SchoolApiApplication.DTO.ExportModule
{
    public class StudentKitPaymentAnalyticsExportDto
    {
        public List<StudentKitPaymentAnalyticsSchoolExportDto> StudentKitPaymentAnalyticsExportSchool { get; set; }
        public List<StudentKitPaymentAnalyticsGradeExportDto> StudentKitPaymentAnalyticsExportGrade { get; set; }
        public List<StudentKitPaymentAnalyticsDivisionExportDto> StudentKitPaymentAnalyticsExportDivision { get; set; }
    }

    public class StudentKitPaymentAnalyticsSchoolExportDto
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

    public class StudentKitPaymentAnalyticsGradeExportDto
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

    public class StudentKitPaymentAnalyticsDivisionExportDto
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
