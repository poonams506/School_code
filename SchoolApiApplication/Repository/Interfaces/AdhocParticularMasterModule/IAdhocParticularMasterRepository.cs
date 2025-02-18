using SchoolApiApplication.DTO.AdhocParticularMasterModule;

namespace SchoolApiApplication.Repository.Interfaces.AdhocParticularMasterModule
{
    public interface IAdhocParticularMasterRepository
    {
        public Task<AdhocParticularMasterDtoListRespose> GetAdhocParticularList(int AcademicYearId);
        public Task<AdhocParticularMasterDtoInsertRespose> AdhocParticularMasterInsert(AdhocParticularMasterDto Obj, int UserId);
    }
}
