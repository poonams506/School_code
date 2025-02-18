using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SurveyModule;

namespace SchoolApiApplication.Repository.Interfaces.SurveyModule
{
    public interface ISurveyRepository
    {
       public Task<DatatableResponseModel> GetSurveyGridList(DatatableRequestWrapper requestObjectWrapper, int userId);

        public Task<SurveyDto> SurveySelect(long SurveyId);

        public Task<int> SurveyUpsert(SurveyDto Survey, int UserId);

        public Task<int> SurveyDelete(long? SurveyId, int UserId);

        public Task<int> PublishUnpublishSurveyParticular(PublishUnpublishSurveyDto publishRequest, int UserId);

       
        public Task<CommonDropdownSelectListItemResponseDto> GetSurveyFromRoleAppSelectList();
    }
}
