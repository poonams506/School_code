using SchoolApiApplication.DTO.TeachingLoadAnalysisModule;

namespace SchoolApiApplication.DTO.StudentReportModule
{


    public class StudentReportDTO
    {
        public int? AcademicYearId { get; set; }

        public string? Class { get; set; }

        public string? CasteName { get; set; }
        public string? FormattedCasteName { get; set; }

        
        public int? CasteCount { get; set; }

        public int? TotalCount { get; set; }


    }

    public class RequestReportDto
    {
        public int? AcademicYearId { get; set; }

        public List<int>? classIds { get; set; }


    }

    public class CasteWiseStudentCountResponseDto
    {
        public List<StudentReportDTO>? CastCountStudentList { get; set; } = new List<StudentReportDTO>();

    }

  

    public class ReligionWiseStudentCountReportDTO
    {
        public int? AcademicYearId { get; set; }
        public string? Class { get; set; }
        public string? ReligionName { get; set; }

        public int? ReligionCount { get; set; }
        public int? TotalCount { get; set; }
    }


    public class ReligionWiseStudentCountReporResponsetDTO
    {
        public List<ReligionWiseStudentCountReportDTO>? ReligionCountList { get; set; } = new List<ReligionWiseStudentCountReportDTO>();

    }

    public class CategoryWiseStudentCountReportDTO
    {
        public int? AcademicYearId { get; set; }
        public string? Class { get; set; }
        public string? CategoryName { get; set; }

        public int? CategoryCount { get; set; }
        public int? TotalCount { get; set; }
    }

    public class CategoryWiseStudentCountReportResponseDTO
    {
        public List<CategoryWiseStudentCountReportDTO>? CategoryCountList { get; set; } = new List<CategoryWiseStudentCountReportDTO>();

    }

    public class RTEStudentCountReportDTO
    {
        public int? AcademicYearId { get; set; }

        public string? Class { get; set; }
        public int? BoysCount { get; set; }


        public int? GirlsCount { get; set; }

        public int? StudentCount { get; set; }

        public int? RTECount { get; set; }
        public int? RTEBoysCount { get; set; }
        public int? RTEGirlsCount { get; set; }

    }

    public class RTEStudentCountReportResponseDto
    {
        public List<RTEStudentCountReportDTO>? RTECountList { get; set; } = new List<RTEStudentCountReportDTO>();

    }

    public class StudentGenderCountReportDto
    {
        public int? AcademicYearId { get; set; }

        public string? Class { get; set; }

        public int? GirlsCount { get; set; }
        public int? BoysCount { get; set; }

        public int? TotalCount { get; set; }

    }


    public class StudentGenderCountReportResponseDto
    {
        public List<StudentGenderCountReportDto>? StudentountList { get; set; } = new List<StudentGenderCountReportDto>();

    }

    public class StudentGenderListDto
    {

        public string? Class { get; set; }

        public string? StudentName { get; set; }
        public int? Girls { get; set; }
        public int? Boys { get; set; }

        public string? Gender { get; set; }

    }

    public class StudentGenderListResponseDto
    {
        public List<StudentGenderListDto>? StudentGenderList { get; set; } = new List<StudentGenderListDto>();

    }

    public class StudentRTEGenderListDto
    {
        public string? Class { get; set; }

        public string? StudentName { get; set; }
        public int? Girls { get; set; }
        public int? Boys { get; set; }

        public string? Gender { get; set; }
    }

    public class StudentRTEGenderListResponseDto
    {
        public List<StudentRTEGenderListDto>? RTEStudentGenderList { get; set; } = new List<StudentRTEGenderListDto>();

    }


    public class StudentAllFeeReceiptSelectDto
    {
        public string? FullName { get; set; }
        public string? GeneralRegistrationNo { get; set; }
        public bool IsNewStudent { get; set; }
        public Int32 StudentId { get; set; }
        public bool? IsRteStudent { get; set; }
        public string? EmergencyContactNumber { get; set; }
        public int? AcademicYearId { get; set; }
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public int RollNumber { get; set; }
        public List<StudentFeeReceiptDto>? StudentFeeReceiptList { get; set; } = new List<StudentFeeReceiptDto>();
        
    }


    public class StudentFeeReceiptDto
    {
        public String? ReceiptType { get; set; }
        public Int32 ReceiptId { get; set; }
        public String? InvoiceNumber { get; set;}
        public DateTime OnlineTransactionDateTime { get; set; }
        public decimal PaidAmount { get; set; }
        public string? PaymentType { get; set; }
        public DateTime ChequeDate { get; set; }
        public bool IsChequeClear { get; set; }
        public string? TransactionId { get; set; }
        public int? TransportConsumerStoppageMappingId { get; set; }
    }













}
