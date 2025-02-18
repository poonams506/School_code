using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.DTO.CadDriverAppModule;

namespace SchoolApiApplication.BusinessLayer.Interfaces.CadDriverAppModule
{
    public interface ICabDriverProfileService
    {
         Task<int> CabDriverProfileUpdate(CabDriverProfileAppDto cabDriverProfileAppDtoObj, int UserId);
         Task<CabDriverProfileAppDto> GetCabDriverProfile(long? CabDriverId);
         Task<CabDriverRouteListDto> GetCabDriverAppRoute(int AcademicYearId, long CabDriverId);
         Task<CabdriverAppStoppageStudentDto> GetCabDriverAppStoppageStudent(int AcademicYearId, long? RouteId, string TripType);
         Task<int> CabDriverTripUpsert(CabDriverTripDto Trip, int UserId);

        Task<StudentInformationDto> GetStudent(int AcademicYearId, string QRCode);
        Task<int> CabDriverTripDetailUpsert(CabDriverAppTripDetailsDto TripDetail, int UserId);
        Task<CabDriverTripNotificationResponceDto> GetStudentList(long TripId);
        Task<int> UpdateCabDriverLocationByTrip(CabDriverLocationDto currentLocation);
        Task<CabDriverActiveTripDto> GetActivetripSelect(CabDriverActiveTripRequestDto requestDto);
        Task<CabDriverActiveTripDto> GetCurrentActiveTripId(int CabDriverUserId);
    }
}
