using SchoolApiApplication.DTO.PaymentAnalytics;

namespace SchoolApiApplication.DTO.StudentKitPaymentAnalyticsModule
{
    public class StudentKitPaymentAnalyticsDto
    {
        public StudentKitPaymentAnalyticsSchoolDto StudentKitPaymentAnalyticsSchool { get; set; }
        public List<StudentKitPaymentAnalyticsGradeDto> StudentKitPaymentAnalyticsGrade { get; set; }
        public List<StudentKitPaymentAnalyticsDivisionDto> StudentKitPaymentAnalyticsDivision { get; set; }
        public List<StudentKitPaymentAnalyticsStudentDto> StudentKitPaymentAnalyticsStudent { get; set; }
    }

    public class StudentKitPaymentAnalyticsSchoolDto
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

    public class StudentKitPaymentAnalyticsGradeDto
    {
        public Int16 StudentId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public String? GradeName { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
    }

    public class StudentKitPaymentAnalyticsDivisionDto
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

    public class StudentKitPaymentAnalyticsStudentDto
    {
        public Int16 StudentId { get; set; }
        public string StudentName { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public Decimal TotalFee { get; set; }
        public Decimal DiscountedFee { get; set; }
        public Decimal EffectiveFee { get; set; }
        public Decimal CollectionTillDate { get; set; }
        public Decimal ReceivableFee { get; set; }
        public Decimal CollectionInPercentage { get; set; }
    }

}
