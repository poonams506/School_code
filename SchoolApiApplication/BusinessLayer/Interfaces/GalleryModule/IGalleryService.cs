using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.GalleryModule
{
    public interface IGalleryService
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
