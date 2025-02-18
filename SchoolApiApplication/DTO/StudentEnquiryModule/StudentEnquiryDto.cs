using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SubjectMappingModule;

namespace SchoolApiApplication.DTO.StudentEnquiryModule
{
    public class StudentEnquiryDto
    {
        public int StudentEnquiryId { get; set; }
        public SchoolNgbDateModel? ngbEnquiryDate { get; set; }
        public DateTime? EnquiryDate { get; set; }
        public string? StudentFirstName { get; set; }
        public string? StudentMiddleName { get; set; }  
        public string? StudentLastName { get; set; }
        public string? StudentFullName { get; set; }
        public string? Gender { get; set; }
        public SchoolNgbDateModel? ngbBirthDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? AdharNo { get; set; }
        public string? Religion { get; set; }
        public string? Cast { get; set; }
        public string? Category { get; set; }
        public string? Nationality { get; set; }
        public string? MobileNumber { get; set; }
        public string? InterestedClassId { get; set; }
        public string? GradeName { get; set; }
        public string? DivisionName { get; set; }
        public int? AcademicYearId { get; set; }
        public string? CurrentSchool { get; set; }
        public string? CurrentClass { get; set; }
        public string? NameOfSiblingInCurrentSchool { get; set; }
        public string? FatherFirstName { get; set; }
        public string? FatherMiddleName { get; set; }
        public string? FatherLastName { get; set; }
        public string? FatherFullName { get; set; }
        public string? MotherFirstName { get; set; }
        public string? MotherMiddleName { get; set; }
        public string? MotherLastName { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CountryId { get; set; }
        public string? CountryName { get; set; }
        public int? StateId { get; set; }
        public string? StateName { get; set; }
        public int? TalukaId { get; set; }
        public string? TalukaName { get; set; }
        public int? DistrictId { get; set; }
        public string? DistrictName { get; set; }
        public int? EnquiryTypeId { get; set; }
        public string? ReferenceBy { get; set; }
        public int? EnquiryStatusId { get; set; }
        public string? EmailId { get; set; }
        public int? UserId { get; set; }
        public string? ClassName { get; set; }
        public string? PaymentStatus { get; set; }
        public decimal? PaidAmount { get; set; }
        public List<EnquiryTypeDropdownDto> EnquiryTypeDropdownList { get; set; } = new List<EnquiryTypeDropdownDto>();
        public List<EnquiryStatusDropdownDto> EnquiryStatusDropdownList { get; set; } = new List<EnquiryStatusDropdownDto>();
    }

    public class StudentEnquiryIdModelResponse
    {
        public int Exist { get; set; } = 0;
    }

    public class EnquiryTypeDropdownDto
    {
        public int EnquiryTypeId { get; set; } = 0;
        public string EnquiryTypeName { get; set; } = string.Empty;

    }

    public class EnquiryStatusDropdownDto
    {
        public int EnquiryStatusId { get; set; } = 0;
        public string EnquiryStatusName { get; set; } = string.Empty;

    }

}
