using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.DTO.SchoolEventModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.SchoolEventModule
{
    public interface ISchoolEventService
    {
        public Task<DatatableResponseModel> SchoolEvent(DatatableRequestWrapper requestObjectWrapper);
        public Task<SchoolEventDto> SchoolEventSelect(long SchoolEventId);

        public Task<int> SchoolEventUpsert(SchoolEventDto sedObj, int UserId);

        public Task<int> PublishUnpublishSchoolEventParticular(PublishUnpublishSchoolEventDto publishRequest, int UserId);

        public Task<int> SchoolEventDelete(long? SchoolEventId,int UserId);
    }
}
