using SchoolApiApplication.BusinessLayer.Interfaces.ParentModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.ParentModule;
using SchoolApiApplication.Repository.Interfaces.ParentModule;

namespace SchoolApiApplication.BusinessLayer.Services.ParentModule
{
    public class ParentService : IParentService
    {
        private readonly IParentRepository _parentRepository;
        public ParentService(IParentRepository parentRepository)
        {
            _parentRepository = parentRepository;
        }
        public async Task<ParentDto> GetParentProfile(long? ParentId)
        {
            return await _parentRepository.GetParentProfile(ParentId);
        }
        public async Task<int> ParentProfileUpsert(ParentDto ParentObj, int UserId)
        {
            return await _parentRepository.ParentProfileUpsert(ParentObj, UserId);
        }
        public async Task<DatatableResponseModel> GetParentList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _parentRepository.GetParentList(requestObjectWrapper);
        }

        public async Task<ParentDeleteRespose> ParentProfileDelete(long? ParentId, int UserId)
        {
            return await _parentRepository.ParentProfileDelete(ParentId,UserId);
        }
    }
}
