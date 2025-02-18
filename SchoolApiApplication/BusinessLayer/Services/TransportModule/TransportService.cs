using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.TransportModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.TransportModule;
using SchoolApiApplication.Repository.Interfaces.TransportModule;


namespace SchoolApiApplication.BusinessLayer.Services.TransportModule
{
    public class TransportService : ITransportService
    {
        private readonly ITransportRepository _transportRepository;
        public TransportService(ITransportRepository transportRepository)
        {
            _transportRepository = transportRepository;
        }
        public async Task<AreaDeleteRespose> AreaDelete(long AreaId, int AcademicYearId, int UserId)
        {
            return await _transportRepository.AreaDelete(AreaId, AcademicYearId, UserId);
        }

        public async Task<AreaDto> AreaUpsert(AreaDto Obj, int UserId, int AcademicYearId)
        {
            return await _transportRepository.AreaUpsert(Obj, UserId, AcademicYearId);
        }

        public async Task<AreaDto> GetAreaSelect(long AreaId, int AcademicYearId)
        {
            return await _transportRepository.GetAreaSelect(AreaId, AcademicYearId);
        }

        public async Task<DatatableResponseModel> GetAreaGridListSelect(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _transportRepository.GetAreaGridListSelect(requestObjectWrapper);
        }
         
        public async Task<RouteDto> GetRouteSelect(long RouteId, int AcademicYearId)
        {
            return await _transportRepository.GetRouteSelect(RouteId, AcademicYearId);
        }

        public async Task<RouteListResponse> GetRouteGridListSelect(int AcademicYearId, string ConsumerName)
        {
            return await _transportRepository.GetRouteGridListSelect(AcademicYearId, ConsumerName);
        }
        public async Task<RouteDeleteRespose> RouteDelete(long RouteId, int AcademicYearId, int UserId)
        {
            return await _transportRepository.RouteDelete(RouteId, AcademicYearId, UserId);
        }

        public async Task<RouteDto> RouteUpsert(RouteDto Obj, int UserId, int AcademicYearId)
        {
            return await _transportRepository.RouteUpsert(Obj, UserId, AcademicYearId);
        }
        public async Task<StoppageDto> GetStoppageSelect(long StoppageId, int AcademicYearId)
        {
            return await _transportRepository.GetStoppageSelect(StoppageId, AcademicYearId);
        }

        public async Task<StoppageListResponse> GetStoppageGridListSelect(StoppageGridInputDto requestDto)
        {
            return await _transportRepository.GetStoppageGridListSelect(requestDto);
        }  

        public async Task<StoppageDeleteRespose> StoppageDelete(long StoppageId, int AcademicYearId, int UserId)
        {
            return await _transportRepository.StoppageDelete(StoppageId, AcademicYearId, UserId);
        }

        public async Task<int> StoppageUpsert(StoppageDto Obj, int UserId,int AcademicYearId, long RouteId)
        {
            return await _transportRepository.StoppageUpsert(Obj, UserId, AcademicYearId, RouteId);
        }
            public async Task<DatatableResponseModel> GetVehicleList(DatatableRequestWrapper requestObjectWrapper)
        {
            return await _transportRepository.GetVehicleList(requestObjectWrapper);
        }

        public async Task<VehicleDto> GetVehicleSelect(int VehicleId, int AcademicYearId)
        {
            return await _transportRepository.GetVehicleSelect(VehicleId, AcademicYearId);

        }

        public async Task<int> VehicleUpsert(VehicleDto vehicleObj, int UserId)
        {
            return await _transportRepository.VehicleUpsert(vehicleObj, UserId);
        }

        public async Task<VehicleDeleteResposeDto> VehicleDelete(int VehicleId, int UserId)
        {
            return await _transportRepository.VehicleDelete(VehicleId, UserId);
        }

        public async Task<DropdownResponseDto> GetCabdriverDropdown()
        {
            return await _transportRepository.GetCabdriverDropdown();
        }

        public async Task<DropdownResponseDto> GetAreaNameDropdown(int AcademicYearId)
        {
            return await _transportRepository.GetAreaNameDropdown( AcademicYearId);
        }

        public async Task<DropdownResponseDto> GetVehicleDropdown()
        {
            return await _transportRepository.GetVehicleDropdown();
        }

        public async Task<int> ActiveInActiveVehicle(ActiceInActiveVehicleDto activeRequest, int UserId)
        {
            return await _transportRepository.ActiveInActiveVehicle(activeRequest, UserId);
        }

        public async Task<TransportStaffResponseDto> GetTransportStaffList()
        {
            return await _transportRepository.GetTransportStaffList();
        }

        public async Task<SchoolTreeviewItemResponseDto> GetTransportConsumerTreeViewItem(StoppageConsumerTreeviewRequestDto RequestDto)
        {
            return await _transportRepository.GetTransportConsumerTreeViewItem(RequestDto);
        }


        public async Task<int> SaveTransportConsumerList(ConsumerTransportMappingUpsertDto RequestDto)
        {
            return await _transportRepository.SaveTransportConsumerList(RequestDto);

        }

        public async Task<ConsumerTransportMappingUpsertDto> GetAllConsumerByStoppageId(ConsumerByStoppageIdInputDto requestDto)
        {
            return await _transportRepository.GetAllConsumerByStoppageId(requestDto);
        }

        public async Task<ConsumerDeleteResposeDto> DeleteStoppageConsumer(int TransportConsumerStoppageMappingId,int RoleId,int AcademicYearId, int UserId)
        {
            return await _transportRepository.DeleteStoppageConsumer(TransportConsumerStoppageMappingId,RoleId, AcademicYearId, UserId);
        }

       public async Task<List<ConsumerTransportMappingDto>> GetExistingTransportConsumerMapping(int TransportConsumerStoppageMappingId, int RoleId, int ConsumerId, short AcademicYearId)
        {
            return await _transportRepository.GetExistingTransportConsumerMapping(TransportConsumerStoppageMappingId, RoleId, ConsumerId, AcademicYearId);
        }

        public async Task<ActiveTripResponseDto> GetActiveTripForAdminSelect(short AcademicYearId)
        {
            return await _transportRepository.GetActiveTripForAdminSelect(AcademicYearId);
        }
        public async Task<StoppageTrackResponseLisDto> GetStoppageTrackForAdmin(int AcademicYearId, int RouteId)
        {
            return await _transportRepository.GetStoppageTrackForAdmin(AcademicYearId,RouteId);

        }
    }
}
