using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.Repository.Interfaces.NoticeModule
{
    public interface INoticeRepository
    {
        Task<DatatableResponseModel> GetNoticeGridList(DatatableRequestWrapper requestObjectWrapper, int userId);

       public Task<NoticeUpsertDto> NoticeSelect(long NoticeId);

        Task<int> NoticeUpsert(NoticeUpsertDto notice, int UserId);

        Task<int> NoticeDelete(long? NoticeId, int UserId);

        Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId);

        Task<ParentAppNoticeResponseDto> GetAllNoticeForStudent(ParentAppNoticeRequestDto requestDto);

        Task<CommonDropdownSelectListItemResponseDto> GetNoticeFromRoleAppSelectList();
    }
}
