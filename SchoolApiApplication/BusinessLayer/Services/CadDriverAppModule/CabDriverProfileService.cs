using DocumentFormat.OpenXml.Spreadsheet;
using SchoolApiApplication.BusinessLayer.Interfaces.CadDriverAppModule;
using SchoolApiApplication.DTO.CadDriverAppModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Repository.Interfaces.CadDriverAppModule;
using SchoolApiApplication.Repository.Interfaces.TeacherAppModule;
using SchoolApiApplication.Repository.Services.TeacherAppModule;
using ZXing.QrCode.Internal;

namespace SchoolApiApplication.BusinessLayer.Services.CadDriverAppModule
{
    public class CabDriverProfileService : ICabDriverProfileService
    {
        private readonly ICabDriverProfileRepository _cabDriverProfileRepository;
        public CabDriverProfileService(ICabDriverProfileRepository cabDriverProfileRepository)
        {
            _cabDriverProfileRepository = cabDriverProfileRepository;
        }

        public async Task<int> CabDriverProfileUpdate(CabDriverProfileAppDto cabDriverProfileAppDtoObj, int UserId)
        {
            return await _cabDriverProfileRepository.CabDriverProfileUpdate(cabDriverProfileAppDtoObj, UserId);
        }

        public async Task<int> CabDriverTripDetailUpsert(CabDriverAppTripDetailsDto TripDetail, int UserId)
        {
            return await _cabDriverProfileRepository.CabDriverTripDetailUpsert(TripDetail, UserId);
        }

        public async Task<int> CabDriverTripUpsert(CabDriverTripDto Trip, int UserId)
        {
            return await _cabDriverProfileRepository.CabDriverTripUpsert(Trip, UserId);
        }

        public async Task<CabDriverActiveTripDto> GetActivetripSelect(CabDriverActiveTripRequestDto requestDto)
        {
            return await _cabDriverProfileRepository.GetActivetripSelect(requestDto);
        }

        public async Task<CabDriverRouteListDto> GetCabDriverAppRoute(int AcademicYearId, long CabDriverId)
        {
            return await _cabDriverProfileRepository.GetCabDriverAppRoute(AcademicYearId, CabDriverId);
        }

        public async Task<CabdriverAppStoppageStudentDto> GetCabDriverAppStoppageStudent(int AcademicYearId, long? RouteId, string TripType)
        {
            return await _cabDriverProfileRepository.GetCabDriverAppStoppageStudent(AcademicYearId, RouteId, TripType);
        }

        public async Task<CabDriverProfileAppDto> GetCabDriverProfile(long? CabDriverId)
        {
            return await _cabDriverProfileRepository.GetCabDriverProfile(CabDriverId);
        }
        public async Task<StudentInformationDto> GetStudent(int AcademicYearId, string QRCode)
        {
            return await _cabDriverProfileRepository.GetStudent(AcademicYearId, QRCode);
        }
        public async Task<CabDriverTripNotificationResponceDto> GetStudentList(long TripId)
        {
            return await _cabDriverProfileRepository.GetStudentList(TripId);

        }


        public async Task<int> UpdateCabDriverLocationByTrip(CabDriverLocationDto currentLocation)
        {
            return await _cabDriverProfileRepository.UpdateCabDriverLocationByTrip(currentLocation);

        }

        public async Task<CabDriverActiveTripDto> GetCurrentActiveTripId(int CabDriverUserId)
        {
            return await _cabDriverProfileRepository.GetCurrentActiveTripId(CabDriverUserId);

        }

    }
}
