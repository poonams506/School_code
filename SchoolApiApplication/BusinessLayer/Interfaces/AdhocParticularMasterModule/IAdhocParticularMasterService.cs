using SchoolApiApplication.DTO.AdhocParticularMasterModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.AdhocParticularMasterModule
{
    public interface IAdhocParticularMasterService
    {
        public Task<AdhocParticularMasterDtoListRespose> GetAdhocParticularList(int AcademicYearId);
        public Task<AdhocParticularMasterDtoInsertRespose> AdhocParticularMasterInsert(AdhocParticularMasterDto Obj, int UserId);
    }
}
