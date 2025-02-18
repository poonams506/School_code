using SchoolApiApplication.DTO.SchoolEventModule;

namespace SchoolApiApplication.DTO.StudentKitFeePaymentModule
{
    public class StudentKitFeePaymentDueByAYSelectDto
    {
        public long StudentId { get; set; } = 0;
        public string GradeName { get; set; } = string.Empty;
        public Int16 GradeId { get; set; } = 0;
        public Int16 DivisionId { get; set; } = 0;
        public Int16 AcademicYearId { get; set; } = 0;
        public string? AcademicYearKey { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string GeneralRegistrationNo { get; set; } = string.Empty;
        public decimal TotalFee { get; set; } = decimal.Zero;
        public decimal DiscountedFee { get; set; } = decimal.Zero;
        public decimal PaidAmount { get; set; } = decimal.Zero;
        public decimal OtherPaidAmount { get; set; } = decimal.Zero;
        public decimal DueAmount { get; set; } = decimal.Zero;
        public decimal ChequeClearedAmount { get; set; } = decimal.Zero;
        public decimal ChequeUnclearAmount { get; set; } = decimal.Zero;
        public bool IsRTEStudent { get; set; } = false;


    }
    public class StudentKitFeePaymentDueByAYSelectResponseDto
    {
        public List<StudentKitFeePaymentDueByAYSelectDto> StudentKitFeePaymentDueByAYList { get; set; } = new List<StudentKitFeePaymentDueByAYSelectDto>();

    }
}
