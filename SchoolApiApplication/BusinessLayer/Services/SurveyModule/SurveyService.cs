using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.SurveyModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.SurveyModule;
using SchoolApiApplication.Repository.Interfaces.NoticeModule;
using SchoolApiApplication.Repository.Interfaces.SurveyModule;
using SchoolApiApplication.Repository.Services.NoticeModule;
using SchoolApiApplication.Repository.Services.SurveyModule;

namespace SchoolApiApplication.BusinessLayer.Services.SurveyModule
{
    public class SurveyService: ISurveyService
    {

        private readonly ISurveyRepository _SurveyRepository;

        public SurveyService(ISurveyRepository SurveyRepository)
        {
            _SurveyRepository = SurveyRepository;
        }

      
        public async Task<DatatableResponseModel> GetSurveyGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _SurveyRepository.GetSurveyGridList(requestObjectWrapper, userId);
        }
        public async Task<int> SurveyUpsert(SurveyDto Survey, int UserId)
        {
            return await _SurveyRepository.SurveyUpsert( Survey, UserId);

        }
        public async Task<SurveyDto> SurveySelect(long SurveyId)
        {
            return await _SurveyRepository.SurveySelect(SurveyId);
        }
        public async Task<int> SurveyDelete(long? SurveyId, int UserId)
        {
            return await _SurveyRepository.SurveyDelete(SurveyId,UserId);
        }

        public async Task<int> PublishUnpublishSurveyParticular(PublishUnpublishSurveyDto publishRequest, int UserId)
        {
            return await _SurveyRepository.PublishUnpublishSurveyParticular(publishRequest , UserId);

        }


        public async Task<CommonDropdownSelectListItemResponseDto> GetSurveyFromRoleAppSelectList()
        {
            return await _SurveyRepository.GetSurveyFromRoleAppSelectList();

        }

    }
}
