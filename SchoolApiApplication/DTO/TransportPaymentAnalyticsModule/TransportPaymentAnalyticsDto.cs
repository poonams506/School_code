using SchoolApiApplication.DTO.PaymentAnalytics;

namespace SchoolApiApplication.DTO.TransportPaymentAnalyticsModule
{
    public class TransportPaymentAnalyticsDto
    {
        public TransportPaymentAnalyticsSchoolDto TransportPaymentAnalyticsSchool { get; set; }
        public List<TransportPaymentAnalyticsGradeDto> TransportPaymentAnalyticsGrade { get; set; }
        public List<TransportPaymentAnalyticsDivisionDto> TransportPaymentAnalyticsDivision { get; set; }
        public List<TransportPaymentAnalyticsStudentDto> TransportPaymentAnalyticsStudent { get; set; }
        public List<TransportPaymentAnalyticsStaffListDto> TransportPaymentAnalyticsStaffList { get; set; }
        public TransportPaymentAnalyticsStaffDto TransportPaymentAnalyticsStaff { get; set; }
    }

    public class TransportPaymentAnalyticsSchoolDto
    {
        public Int16 StudentId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public string? SchoolName { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
    }

    public class TransportPaymentAnalyticsGradeDto
    {
        public Int16 StudentId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public String? GradeName { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
    }

    public class TransportPaymentAnalyticsDivisionDto
    {
        public Int16 StudentId { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public String? DivisionName { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
    }

    public class TransportPaymentAnalyticsStudentDto
    {
        public Int16 StudentId { get; set; }
        public string StudentName { get; set; }
        public Int16 GradeId { get; set; }
        public Int16 DivisionId { get; set; }
        public Int16 AcademicYearId { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
    }
    public class TransportPaymentAnalyticsStaffDto
    {
        public string SchoolName { get; set; }
        public Int16 AcademicYearId { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
    }
    public class TransportPaymentAnalyticsStaffListDto
    {
        public string ConsumerName { get; set; }
        public Int16 AcademicYearId { get; set; }
        public Decimal TransportTotalFee { get; set; }
        public Decimal TransportDiscountedFee { get; set; }
        public Decimal TransportEffectiveFee { get; set; }
        public Decimal TransportCollectionTillDate { get; set; }
        public Decimal TransportReceivableFee { get; set; }
        public Decimal TransportCollectionInPercentage { get; set; }
    }
}
