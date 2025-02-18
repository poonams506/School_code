using SchoolApiApplication.DTO.CommonModule;

namespace SchoolApiApplication.DTO.RegistrationFeeModule
{
    public class RegistrationFeePaymentDto
    {
        public long StudentEnquiryId { get; set; } = 0;
        public int AcademicYearId { get; set; } = 0;
        public Int16 GradeId { get; set; } = 0;
        public Int16 DivisionId { get; set; }=0;
        public string? OnlineTransactionId { get; set; } = string.Empty;
        public DateTime? OnlineTransactionDateTime { get; set; }
        public SchoolNgbDateModel? ngbOnlineTransactionDateTime { get; set; } = new SchoolNgbDateModel();
        public string OnlinePaymentRequest { get; set; } = string.Empty;
        public string OnlinePaymentResponse { get; set; } = string.Empty;
        public string PaidToBank { get; set; } = string.Empty;
        public decimal? TotalFee { get; set; }
        public Int32? ParticularId { get; set; }
        public Int16? PaymentTypeId { get; set; }
        public string ChequeNumber { get; set; } = string.Empty;
        public DateTime? ChequeDate { get; set; }
        public SchoolNgbDateModel? ngbChequeDate { get; set; } = new SchoolNgbDateModel();
        public string ChequeBank { get; set; } = string.Empty;
        public decimal? ChequeAmount { get; set; }
        public bool? IsChequeClear { get; set; }
        public string Remark { get; set; } =string.Empty;
        public int? UserId { get; set; }
        public List<RegistrationFeeDetailsTypeDto> RegistrationFeeDetailsParticularList { get; set; } = new List<RegistrationFeeDetailsTypeDto>();

    }
    public class RegistrationFeePaymentSelectDto
    {
        public string StudentFullName { get; set; } = string.Empty;
        public string OnlineTransactionId { get; set; } = string.Empty;
        public string PaidToBank { get; set; }=string.Empty;
        public int PaymentTypeId { get; set; } = 0;
        public int PaymentInstallmentDone { get; set; } = 0;
        public int AcademicYearId { get; set; }
        public List<RegistrationFeeParticularSelectDto> RegistrationFeeParticularList { get; set; }=new List<RegistrationFeeParticularSelectDto>();


    }
    public class RegistrationFeeParticularSelectDto
    {
        public long FeeParticularId { get; set; } = 0; 
        public long AdhocParticularMasterId { get; set; } = 0;
        public string ParticularName { get; set; } = string.Empty;
        public bool IsDiscountApplicable { get; set; }
        public decimal TotalFee { get; set; }
        public decimal AlreadyPaid { get; set; } =0;
        public int AcademicYearId { get; set; }


    }
    public class RegistrationFeePaymentGridDto
    {
        public long StudentEnquiryId { get; set; } = 0;
        public DateTime? EnquiryDate { get; set; }
        public SchoolNgbDateModel? ngbEnquiryDate { get; set; } = new SchoolNgbDateModel();
        public string InterestedClass { get; set; } = string.Empty;
        public int AcademicYearId { get; set; } = 0;
        public string StudentFullName { get; set; } = string.Empty;

    }

    public class RegistrationFeeDetailsTypeDto
    {
        public long FeeParticularId { get; set; } = 0;
        public string InvoiceNumber { get; set; } = string.Empty;
        public int PaymentTypeId { get; set; } = 0;
        public decimal PaidAmount { get; set; }

    }

    public class RegistrationFeePaymentHistorySelectDto
    {
        public string SchoolName { get; set; } = string.Empty;
        public string SchoolAddress { get; set; } = string.Empty;
        public Int16 AcademicYearId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string GradeName { get; set; } = string.Empty;
        public string DivisionName { get; set; } = string.Empty;
        public string PaymentTypeName { get; set; } = string.Empty;
        public DateTime? PaymentDate { get; set; }
        //public DateTime? ChequeDate { get; set; }
        //public string ChequeBank { get; set; } = string.Empty;
        public int RegistrationFeeId { get; set; } = 0;
        
        public string OnlineTransactionId { get; set; } = string.Empty;
        public string RegistrationInvoiceNumber { get; set; } = string.Empty;
        public decimal PaidAmount { get; set; }
        public string OnlineTransactionDateTime { get; set; } = string.Empty;
        public string PaidToBank { get; set; } = string.Empty;
        public List<RegistrationFeeParticularSelectDto> FeeParticularsSelectList { get; set; } = new List<RegistrationFeeParticularSelectDto>();
    }

}
