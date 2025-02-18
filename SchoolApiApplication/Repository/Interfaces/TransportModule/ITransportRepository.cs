using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.TransportModule;

namespace SchoolApiApplication.Repository.Interfaces.TransportModule
{
    public interface ITransportRepository
    {
        Task<AreaDto> GetAreaSelect(long AreaId, int AcademicYearId);
        Task<AreaDto> AreaUpsert(AreaDto Obj, int UserId, int AcademicYearId);
        Task<DatatableResponseModel> GetAreaGridListSelect(DatatableRequestWrapper requestObjectWrapper);
        Task<AreaDeleteRespose> AreaDelete(long AreaId, int AcademicYearId,int UserId);
        Task<RouteDto> GetRouteSelect(long RouteId, int AcademicYearId);
        Task<RouteDto> RouteUpsert(RouteDto Obj, int UserId, int AcademicYearId);
        Task<RouteListResponse> GetRouteGridListSelect(int AcademicYearId, string ConsumerName);
        Task<RouteDeleteRespose> RouteDelete(long RouteId, int AcademicYearId, int UserId);
        Task<StoppageDto> GetStoppageSelect(long StoppageId, int AcademicYearId);
        Task<int> StoppageUpsert(StoppageDto Obj, int UserId, int AcademicYearId, long routeId);
        Task<StoppageListResponse> GetStoppageGridListSelect(StoppageGridInputDto requestDto);
        Task<StoppageDeleteRespose> StoppageDelete(long StoppageId, int AcademicYearId, int UserId);
        Task<DatatableResponseModel> GetVehicleList(DatatableRequestWrapper requestObjectWrapper);
        Task<VehicleDto> GetVehicleSelect(int VehicleId, int AcademicYearId);
        Task<int> VehicleUpsert(VehicleDto vehicleObj, int UserId);
        Task<int> ActiveInActiveVehicle(ActiceInActiveVehicleDto activeRequest, int UserId);
        Task<VehicleDeleteResposeDto> VehicleDelete(int VehicleId, int UserId);
        Task<DropdownResponseDto> GetCabdriverDropdown();
        Task<DropdownResponseDto> GetAreaNameDropdown(int AcademicYearId);
        Task<DropdownResponseDto> GetVehicleDropdown();
        Task<TransportStaffResponseDto> GetTransportStaffList();
        Task<SchoolTreeviewItemResponseDto> GetTransportConsumerTreeViewItem(StoppageConsumerTreeviewRequestDto RequestDto);
        Task<int> SaveTransportConsumerList(ConsumerTransportMappingUpsertDto RequestDto);
        Task<ConsumerTransportMappingUpsertDto> GetAllConsumerByStoppageId(ConsumerByStoppageIdInputDto requestDto);
        Task<ConsumerDeleteResposeDto> DeleteStoppageConsumer(int TransportConsumerStoppageMappingId, int RoleId,int AcademicYearId,int UserId);
        Task<List<ConsumerTransportMappingDto>> GetExistingTransportConsumerMapping(int TransportConsumerStoppageMappingId, int RoleId, int ConsumerId, short AcademicYearId);
        Task<ActiveTripResponseDto> GetActiveTripForAdminSelect (short AcademicYearId);
        Task<StoppageTrackResponseLisDto> GetStoppageTrackForAdmin(int AcademicYearId,int RouteId);

    }
}
