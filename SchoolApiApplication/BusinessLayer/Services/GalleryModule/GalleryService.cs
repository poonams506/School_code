using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.GalleryModule;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.Repository.Interfaces.GalleryModule;
using SchoolApiApplication.Repository.Services.GalleryModule;

namespace SchoolApiApplication.BusinessLayer.Services.GalleryModule
{
    public class GalleryService : IGalleryService
    {
        private readonly IGalleryRepository _galleryRepository;

        public GalleryService(IGalleryRepository galleryRepository)
        {
            _galleryRepository = galleryRepository;
        }

        public async Task<int> GalleryDelete(long? GalleryId, int UserId)
        {
            return await _galleryRepository.GalleryDelete(GalleryId, UserId);
        }

        public async Task<GalleryUpsertDto> GallerySelect(long GalleryId)
        {
            return await _galleryRepository.GallerySelect(GalleryId);
        }

        public async Task<int> GalleryUpsert(GalleryUpsertDto obj, int UserId)
        {
            return await _galleryRepository.GalleryUpsert(obj, UserId);
        }

        public async Task<ParentAppGalleryResponseDto> GetAllGalleryForStudent(ParentAppGalleryRequestDto requestDto)
        {
            var lstGallery = await _galleryRepository.GetAllGalleryForStudent(requestDto);
            lstGallery.GalleryList.ForEach(gallery =>
            {
                if (gallery.StartDate != null)
                {
                    gallery.ngbStartDate = new DTO.CommonModule.SchoolNgbDateModel
                    {
                        day = gallery.StartDate.Value.Day,
                        month = gallery.StartDate.Value.Month,
                        year = gallery.StartDate.Value.Year,
                    };
                }
            });
            return lstGallery;
        }

        public async Task<CommonDropdownSelectListItemResponseDto> GetGalleryFromRoleAppSelectList()
        {
            return await _galleryRepository.GetGalleryFromRoleAppSelectList();
        }

        public async Task<DatatableResponseModel> GetGalleryGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            return await _galleryRepository.GetGalleryGridList(requestObjectWrapper, userId);
        }

        public async Task<int> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest, int UserId)
        {
            return await _galleryRepository.PublishUnpublishGalleryParticular(publishRequest, UserId);
        }
    }
}
