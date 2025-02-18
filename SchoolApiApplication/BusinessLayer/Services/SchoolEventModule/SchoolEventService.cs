using SchoolApiApplication.BusinessLayer.Interfaces.SchoolEventModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.HomeworkModule;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using SchoolApiApplication.Repository.Interfaces.SchoolModule;
using SchoolApiApplication.Repository.Services.HomeworkModule;

namespace SchoolApiApplication.BusinessLayer.Services.SchoolEventModule
{
    public class SchoolEventService:ISchoolEventService
    {
        private readonly ISchoolEventRepository _schoolEventRepository;

        public SchoolEventService(ISchoolEventRepository schoolEventRepository)
        {
            _schoolEventRepository = schoolEventRepository;
        }


        public async Task<DatatableResponseModel> SchoolEvent(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _schoolEventRepository.SchoolEvent(requestObjectWrapper);
        }
        public async Task<int> SchoolEventUpsert(SchoolEventDto sedObj, int UserId)
        {
            return await _schoolEventRepository.SchoolEventUpsert(sedObj , UserId);
        }
      

        public async Task<SchoolEventDto> SchoolEventSelect(long SchoolEventId)
        {
            return await _schoolEventRepository.SchoolEventSelect(SchoolEventId);

        }


        public async Task<int> PublishUnpublishSchoolEventParticular(PublishUnpublishSchoolEventDto publishRequest, int UserId)
        {
            return await _schoolEventRepository.PublishUnpublishSchoolEventParticular(publishRequest, UserId);
        }
        public async Task<int> SchoolEventDelete(long? SchoolEventId, int UserId)
        {
            return await _schoolEventRepository.SchoolEventDelete(SchoolEventId,UserId);
        }
    }
}
