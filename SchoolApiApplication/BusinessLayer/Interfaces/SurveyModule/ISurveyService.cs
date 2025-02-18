using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SurveyModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.SurveyModule
{
    public interface ISurveyService
    {
        public Task<DatatableResponseModel> GetSurveyGridList(DatatableRequestWrapper requestObjectWrapper, int userId);

        public Task<SurveyDto> SurveySelect(long SurveyId);

        public Task<int> SurveyUpsert(SurveyDto Survey, int UserId);

        public Task<int> SurveyDelete(long? SurveyId, int UserId);

        public Task<int> PublishUnpublishSurveyParticular(PublishUnpublishSurveyDto publishRequest, int UserId);


        public Task<CommonDropdownSelectListItemResponseDto> GetSurveyFromRoleAppSelectList();
    }
}
