using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Identity.Client;
using SchoolApiApplication.DTO.CommonModule;


namespace SchoolApiApplication.DTO.SchoolModule
{
    public static class NgbDateModelToDatetime
    {
        public static DateTime? ToDateTime(this SchoolNgbDateModel ngbDateModel)
        {
            if (ngbDateModel == null)
            {
                return (DateTime?)null;
            }
            return new DateTime(ngbDateModel.year, ngbDateModel.month, ngbDateModel.day);
        }
        public static SchoolNgbDateModel ToNgbDateModel(this DateTime? datetime)
        {
            if (datetime == null)
            {
                return null;
            }
            return new SchoolNgbDateModel { year = datetime.Value.Year, month = datetime.Value.Month, day = datetime.Value.Day };
        }
    }


  
    public class SchoolDto
    {
        public Int16? SchoolId { get; set; }
        public string? SchoolName { get; set; }
        public string? SchoolCode { get; set; }
        public string? SchoolCodeNo { get; set; }
        public string? SchoolAddress { get; set;}
        public string? MediumTypeName { get; set; }
        public string? SchoolEmail { get; set; }
        public string? SchoolContactNo1 { get; set; }
        public string? SchoolContactNo2 { get; set; }
        public string? SchoolAddressLine1 { get; set; }
        public string? SchoolAddressLine2 { get; set; }
        public int? TalukaId { get; set; }
        public int? DistrictId { get; set; }
        public int? StateId { get; set; }
        public int? CountryId { get; set; }
        public string? TalukaName { get; set; }
        public string? DistrictName { get; set; }
        public string? StateName { get; set; }
        public string? CountryName { get; set; }
        public string? Pincode { get; set; }
        public DateTime? EstablishmentDate { get; set; }
        public SchoolNgbDateModel? ngbEstablishmentDate { get; set; }
        public string? SchoolRank { get; set; }
        public string? SchoolWebsiteUrl { get; set; }
        public string? LogoUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? SchoolDescription { get; set; }
        public string? ContactPersonName { get; set; }
        public string? ContactPersonRole { get; set; }
        public string? ContactPersonEmail { get; set; }
        public string? ContactPersonMobileNo { get; set; }
        public int? AcademicYearId { get; set; }
        public string? AuthorisedBy { get; set; }
        public string? Section { get; set; }
        public int? SchoolMediumId { get; set; }
        public string? SchoolPermission { get; set; }
        public string? RegistrationNumber { get; set; }
        public string? SchoolType { get; set; }
        public string? UdiseNumber { get; set; }
        public string? Board { get; set; }
        public string? AffiliationNumber { get; set; }
        public string? HscOrSscIndexNo { get; set; }

        public string? Base64LogoImage { get; set; }
        public string? LogoImageContentType { get; set; }

        public string? LangaugeCode { get; set; }
        
    }

    public class SchoolSettingDto
    {
        public int? SchoolId { get; set; }
        public int? AcademicYearId { get; set; }
        public DateTime? AcademicYearStartMonth { get; set; }
        public SchoolNgbDateModel? ngbAcademicYearStartMonth { get; set; }
        public string? InvoiceNoPrefix { get; set; }
        public int? InvoiceNoStartNumber { get; set; }
        public string? TransportInvoiceNoPrefix { get; set; }
        public int? TransportInvoiceNoStartNumber { get; set; }
        public string? AdditionalFeeInvoiceNoPrefix { get; set; }
        public int? AdditionalFeeInvoiceNoStartNumber { get; set; }
        public string? SchoolKitInvoiceNoPrefix { get; set; }
        public int? SchoolKitInvoiceNoStartNumber { get; set; }
        public string? RegistrationFeeInvoiceNoPrefix { get; set; }
        public int? RegistrationFeeInvoiceNoStartNumber { get; set; }
        public int? SerialNoStartNumber { get; set; }
        public string? AccountNumber { get; set; }
        public int? AccountTypeId { get; set; }
        public string? IFSCCode { get; set; }
        public string? AccountName { get; set; }
        public string? SchoolEmail { get; set; }    
        public string? SchoolContactNo1 { get; set; }   
        public string? LangaugeCode { get; set; }
        public bool? IsSharedTransport { get; set; }
        public bool? IsFeeApplicableToStaff { get; set; }
        public List<int> MonthList { get; set; } = new List<int>();
    }
   
}
