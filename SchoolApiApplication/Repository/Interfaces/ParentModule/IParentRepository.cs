using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.ParentModule;

namespace SchoolApiApplication.Repository.Interfaces.ParentModule
{
    public interface IParentRepository
    {
        public Task<ParentDto> GetParentProfile(long? ParentId);
        public Task<int> ParentProfileUpsert(ParentDto ParentObj, int UserId);
        public Task<DatatableResponseModel> GetParentList(DatatableRequestWrapper requestObjectWrapper);
        public Task<ParentDeleteRespose> ParentProfileDelete(long? ParentId,int UserId);
    }

}
