namespace SchoolApiApplication.DTO.PaymentAnalytics
{
    public class PaymentAnalyticsDto
    {
        public PaymentAnalyticsSchoolDto PaymentAnalyticsSchool { get; set; }
        public List<PaymentAnalyticsGradeDto> PaymentAnalyticsGrade { get; set; }
        public List<PaymentAnalyticsDivisionDto> PaymentAnalyticsDivision { get; set; }
        public List<PaymentAnalyticsStudentDto> PaymentAnalyticsStudent { get; set; }

    }
    public class PaymentAnalyticsSchoolDto
    {        
        public Int16 StudentId { get; set; }

        public Int16 AcademicYearId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public string? SchoolName { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
    }
    public class PaymentAnalyticsGradeDto
    {
        public Int16 StudentId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public String? GradeName  { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
    }
    public class PaymentAnalyticsDivisionDto
    {
        public Int16 StudentId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public String? DivisionName { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
    }
    public class PaymentAnalyticsStudentDto
    {
        public Int16 StudentId { get; set; }
        public string StudentName { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal  EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
    }
}
