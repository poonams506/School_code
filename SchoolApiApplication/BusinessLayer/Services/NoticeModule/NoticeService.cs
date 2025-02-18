using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.NoticeModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.NoticeModule;

namespace SchoolApiApplication.BusinessLayer.Services.NoticeModule
{
    public class NoticeService : INoticeService
    {
        private readonly INoticeRepository _noticeRepository;

        public NoticeService(INoticeRepository noticeRepository)
        {
            _noticeRepository = noticeRepository;
        }
        public async Task<DatatableResponseModel> GetNoticeGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _noticeRepository.GetNoticeGridList(requestObjectWrapper, userId);
        }

        public async Task<NoticeUpsertDto> NoticeSelect(long NoticeId)
        {
            return await _noticeRepository.NoticeSelect(NoticeId);
        }

        public async Task<int> NoticeUpsert(NoticeUpsertDto hwudObj, int UserId)
        {
            return await _noticeRepository.NoticeUpsert(hwudObj, UserId);
        }

        public async Task<int> NoticeDelete(long? NoticeId, int UserId)
        {
            return await _noticeRepository.NoticeDelete(NoticeId,UserId);
        }

        public async Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId)
        {
            return await _noticeRepository.PublishUnpublishNoticeParticular(publishRequest, UserId);
        }

        public async  Task<ParentAppNoticeResponseDto> GetAllNoticeForStudent(ParentAppNoticeRequestDto requestDto)
        {
            var lstNotice = await _noticeRepository.GetAllNoticeForStudent(requestDto);
            lstNotice.NoticeList.ForEach(notice =>
            {
                if (notice.StartDate != null)
                {
                    notice.ngbStartDate = new DTO.CommonModule.SchoolNgbDateModel
                    {
                        day=notice.StartDate.Value.Day,
                        month=notice.StartDate.Value.Month,
                        year=notice.StartDate.Value.Year,
                    };
                }

                if (notice.EndDate != null)
                {
                    notice.ngbEndDate = new DTO.CommonModule.SchoolNgbDateModel
                    {
                        day = notice.EndDate.Value.Day,
                        month = notice.EndDate.Value.Month,
                        year = notice.EndDate.Value.Year,
                    };
                }
            });
            return lstNotice;

        }

      public async  Task<CommonDropdownSelectListItemResponseDto> GetNoticeFromRoleAppSelectList()
        {
            return await _noticeRepository.GetNoticeFromRoleAppSelectList();
        }
    }
}
