using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.NoticeModule
{
    public interface INoticeService
    {
        Task<DatatableResponseModel> GetNoticeGridList(DatatableRequestWrapper requestObjectWrapper, int userId);

      public  Task<NoticeUpsertDto> NoticeSelect(long NoticeId);

        Task<int> NoticeUpsert(NoticeUpsertDto hwudObj, int UserId);

        Task<int> NoticeDelete(long? NoticeId, int UserId);

        Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId);

        Task<ParentAppNoticeResponseDto> GetAllNoticeForStudent(ParentAppNoticeRequestDto requestDto);

        Task<CommonDropdownSelectListItemResponseDto> GetNoticeFromRoleAppSelectList();
    }
}
