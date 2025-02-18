using SchoolApiApplication.DTO.StudentDocumentModule;

namespace SchoolApiApplication.DTO.AdhocParticularMasterModule
{
    public class AdhocParticularMasterDto
    {
        public int? AdhocParticularMasterId { get; set; }
        public string? Particular { get; set; }
    }
    public class AdhocParticularMasterDtoInsertRespose
    {
        public int Exits { get; set; }
    }
    public class AdhocParticularMasterDtoListRespose
    {
        public List<AdhocParticularMasterDto> Particulars { get; set; } = new List<AdhocParticularMasterDto>();
    }
   
}
