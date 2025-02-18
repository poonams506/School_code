using SchoolApiApplication.BusinessLayer.Interfaces.AdhocParticularMasterModule;
using SchoolApiApplication.DTO.AdhocParticularMasterModule;

using SchoolApiApplication.Repository.Interfaces.AdhocParticularMasterModule;


namespace SchoolApiApplication.BusinessLayer.Services.AdhocParticularMasterModule
{
    public class AdhocParticularMasterService : IAdhocParticularMasterService
    {
        private readonly IAdhocParticularMasterRepository _adhocParticularMasterRepository;
        public AdhocParticularMasterService(IAdhocParticularMasterRepository adhocParticularMasterRepository)
        {
            _adhocParticularMasterRepository = adhocParticularMasterRepository;
        }
        public async Task<AdhocParticularMasterDtoInsertRespose> AdhocParticularMasterInsert(AdhocParticularMasterDto Obj, int UserId)
        {
            return await _adhocParticularMasterRepository.AdhocParticularMasterInsert(Obj, UserId);
        }

        public async Task<AdhocParticularMasterDtoListRespose> GetAdhocParticularList(int AcademicYearId)
        {
            return await _adhocParticularMasterRepository.GetAdhocParticularList(AcademicYearId);
        }
    }
}
