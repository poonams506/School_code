using SchoolApiApplication.DTO.CadDriverAppModule;
namespace SchoolApiApplication.Repository.Interfaces.CadDriverAppModule
{
    public interface ICabDriverProfileRepository
    {
         
         Task<int> CabDriverProfileUpdate(CabDriverProfileAppDto cabDriverProfileAppDtoObj, int UserId);
         Task<CabDriverProfileAppDto> GetCabDriverProfile(long? CabDriverId);
         Task<CabDriverRouteListDto> GetCabDriverAppRoute (int AcademicYearId,long CabDriverId);
         Task<CabdriverAppStoppageStudentDto> GetCabDriverAppStoppageStudent(int AcademicYearId, long? RouteId, string TripType);
         Task<int> CabDriverTripUpsert(CabDriverTripDto Trip, int UserId);

         Task<int> CabDriverTripDetailUpsert(CabDriverAppTripDetailsDto TripDetail, int UserId);
         Task<StudentInformationDto> GetStudent(int AcademicYearId,string QRCode );
         Task<CabDriverTripNotificationResponceDto> GetStudentList(long TripId);
         Task<CabDriverActiveTripDto> GetActivetripSelect(CabDriverActiveTripRequestDto requestDto);

         Task<int> UpdateCabDriverLocationByTrip(CabDriverLocationDto currentLocation);
         Task<CabDriverActiveTripDto> GetCurrentActiveTripId(int CabDriverUserId);
    }
}
 