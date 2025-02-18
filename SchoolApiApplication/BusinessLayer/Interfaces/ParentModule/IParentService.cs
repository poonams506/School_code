using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.ParentModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.ParentModule
{
    public interface IParentService
    {
		public Task<ParentDto> GetParentProfile(long? ParentId);
        public Task<int> ParentProfileUpsert(ParentDto ParentObj, int UserId);
        public Task<DatatableResponseModel> GetParentList(DatatableRequestWrapper requestObjectWrapper);
        public Task<ParentDeleteRespose> ParentProfileDelete(long? ParentId, int UserId);
    }
}
