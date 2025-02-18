namespace SchoolApiApplication.DTO.MasterModule
{
    public class AddressMasterDto
    {
        public List<CountryMasterDto>? CountryList { get; set; }
        public List<StateMasterDto>? StateList { get; set; }
        public List<DistrictMasterDto>? DistrictList { get; set; }
        public List<TalukaMasterDto>? TalukaList { get; set; }
    }

    public class CountryMasterDto
    {
        public int CountryId { get; set; }
        public string? CountryName { get; set; }
        public string? CountryKey { get; set; }
    }
    public class StateMasterDto
    {
        public int StateId { get; set; }
        public int CountryId { get; set; }
        public string? StateName { get; set; }
        public string? StateKey { get; set; }
    }
    public class DistrictMasterDto
    {
        public int DistrictId { get; set; }
        public int StateId { get; set; }
        public string? DistrictName { get; set; }
        public string? DistrictKey { get; set; }
    }
    public class TalukaMasterDto
    {
        public int TalukaId { get; set; }
        public int DistrictId { get; set; }
        public string? TalukaName { get; set; }
        public string? TalukaKey { get; set; }
    }
    public class MediumTypeResponse
    {
        public List<MediumType> MediumTypes { get; set; }
    }

    public class AcademicYearResponse
    {
        public List<AcademicYear> AcademicYears { get; set; }
    }
    public class AcademicYear
    {
        public int AcademicYearId { get; set; }
        public string AcademicYearName { get; set; }
        public string AcademicYearKey { get; set; }

    }
    public class MediumType
    {
        public int MediumTypeId { get; set; }
        public string? MediumTypeName { get; set; }
        public string? MediumTypeKey { get; set; }
    }
}
