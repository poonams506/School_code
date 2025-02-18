using Microsoft.Identity.Client;
using NLog.LayoutRenderers;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolModule;

namespace SchoolApiApplication.DTO.ParentModule
{
    public class ParentDto
    {
        public long? ParentId { get; set; }
        public int? ParentTypeId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public string? ContactNumber { get; set; }
        public string? MobileNumber { get; set; }
        public string? EmailId { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? TalukaId { get; set; }
        public int? DistrictId { get; set; }
        public int? StateId { get; set; }
        public int? CountryId { get; set; }
        public string? TalukaName { get; set; }
        public string? DistrictName { get; set; }
        public string? StateName { get; set; }
        public string? CountryName { get; set; }
        public string? Zipcode { get; set; }
        public string? AdharNumber { get; set; }
        public string? Education { get; set; }
        public string? Occupation { get; set; }
        public decimal? AnnualIncome { get; set; }
        public string? BloodGroup { get; set; }
        public string? ProfileImageURL { get; set; }
        public SchoolNgbDateModel? ngbBirthDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? UserId { get; set; }
        public int? StudentId { get; set; }
        public string? ProfileBase64Image { get; set; }
        public string? ProfileImageContentType { get; set; }
        public string? StudentFullName { get; set; }
        public string? ParentFullName { get; set; }
        public string? ParentType { get; set;}
        public string? Address { get; set;}
    }
    public class ParentDeleteRespose
    {
        public int AffectedRows { get; set; }
    }
    public class ParentResponse
    {
        public List<ParentDto>? Parents { get; set; }
    }
}
