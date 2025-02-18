using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.Repository.Interfaces.GalleryModule
{
    public interface IGalleryRepository
    {
        Task<DatatableResponseModel> GetGalleryGridList(DatatableRequestWrapper requestObjectWrapper, int userId);

        Task<GalleryUpsertDto> GallerySelect(long GalleryId);

        Task<int> GalleryUpsert(GalleryUpsertDto obj, int UserId);

        Task<int> GalleryDelete(long? GalleryId, int UserId);

        Task<int> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest, int UserId);

        Task<ParentAppGalleryResponseDto> GetAllGalleryForStudent(ParentAppGalleryRequestDto requestDto);

        Task<CommonDropdownSelectListItemResponseDto> GetGalleryFromRoleAppSelectList();
    }
}
