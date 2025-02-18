namespace SchoolApiApplication.DTO.ExportModule
{
    public class TransportPaymentAnalyticsExportDto
    {
        public List<TransportPaymentAnalyticsSchoolExportDto> TransportPaymentAnalyticsExportSchool { get; set; }
        public List<TransportPaymentAnalyticsGradeExportDto> TransportPaymentAnalyticsExportGrade { get; set; }
        public List<TransportPaymentAnalyticsDivisionExportDto> TransportPaymentAnalyticsExportDivision { get; set; }
        public List<TransportPaymentAnalyticsStaffListExportDto> TransportPaymentAnalyticsExportStaffList { get; set; }
    }

    public class TransportPaymentAnalyticsSchoolExportDto
    {
        public String? SchoolName { get; set; }
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public string? RollNumber { get; set; }
        public string? StudentName { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
        public string? ContactNo { get; set; }
    }

    public class TransportPaymentAnalyticsGradeExportDto
    {
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public string? RollNumber { get; set; }
        public string? StudentName { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
        public string? ContactNo { get; set; }

    }

    public class TransportPaymentAnalyticsDivisionExportDto
    {
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public string? RollNumber { get; set; }
        public string? StudentName { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
        public string? ContactNo { get; set; }
    }

    public class TransportPaymentAnalyticsStaffListExportDto
    {
        public string? ConsumerName { get; set; }
        public  string? RoleName { get; set; }
        public string? AcademicYearName { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
        public string? ContactNo { get; set; }
    }

}
