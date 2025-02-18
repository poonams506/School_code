using Dapper;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.CadDriverAppModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TeacherAppModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.DTO.TransportPaymentAnalyticsModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.CadDriverAppModule;
using SchoolApiApplication.Repository.Interfaces.UserModule;
using System.Data;
using System.Reflection.Metadata.Ecma335;

namespace SchoolApiApplication.Repository.Services.CadDriverAppModule
{
    public class CabDriverProfileRepository: ICabDriverProfileRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        public CabDriverProfileRepository(IHttpContextAccessor httpContextAccessor,
            IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }
        public async Task<int> CabDriverProfileUpdate(CabDriverProfileAppDto cabDriverProfileAppDtoObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CabDriverId", cabDriverProfileAppDtoObj.CabDriverId);
            parameters.Add("@MobileNumber", cabDriverProfileAppDtoObj.MobileNumber);
            parameters.Add("@EmailId", cabDriverProfileAppDtoObj.EmailId);
            parameters.Add("@AddressLine1", cabDriverProfileAppDtoObj.AddressLine1);
            parameters.Add("@AddressLine2", cabDriverProfileAppDtoObj.AddressLine2);
            parameters.Add("@TalukaId", cabDriverProfileAppDtoObj.TalukaId);
            parameters.Add("@DistrictId",cabDriverProfileAppDtoObj.DistrictId);
            parameters.Add("@StateId", cabDriverProfileAppDtoObj.StateId);
            parameters.Add("@CountryId", cabDriverProfileAppDtoObj.CountryId);
            parameters.Add("@ZipCode", cabDriverProfileAppDtoObj.ZipCode);
            parameters.Add("@TalukaName", cabDriverProfileAppDtoObj.TalukaName);
            parameters.Add("@DistrictName", cabDriverProfileAppDtoObj.DistrictName);
            parameters.Add("@StateName", cabDriverProfileAppDtoObj.StateName);
            parameters.Add("@CountryName", cabDriverProfileAppDtoObj.CountryName);
            parameters.Add("@Education", cabDriverProfileAppDtoObj.Education);
            parameters.Add("@BloodGroup", cabDriverProfileAppDtoObj.BloodGroup);
            parameters.Add("@ProfileImageUrl", cabDriverProfileAppDtoObj.ProfileImageURL);
            parameters.Add("@UserId", UserId);

            return await db.QueryFirstOrDefaultAsync<int>("uspCabDriverProfileAppUpdate", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> CabDriverTripDetailUpsert(CabDriverAppTripDetailsDto TripDetail, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TripId", TripDetail.TripId);
            parameters.Add("@StudentId", TripDetail.StudentId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspCabDriverTripDetailUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> CabDriverTripUpsert(CabDriverTripDto Trip, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RouteId", Trip.RouteId);
            parameters.Add("@TripId", Trip.TripId);
            parameters.Add("@TripType", Trip.TripType);
            parameters.Add("@UserId", UserId);
            parameters.Add("@IsTripEnd", Trip.IsTripEnd);
            return await db.QueryFirstOrDefaultAsync<int>("uspCabDriverTripUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<CabDriverRouteListDto> GetCabDriverAppRoute(int AcademicYearId, long CabDriverId)
        {
            CabDriverRouteListDto cabDriverAppRouteListDto = new CabDriverRouteListDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@CabDriverId", CabDriverId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspCabDriverRouteSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                cabDriverAppRouteListDto.CabDriverRouteList = multiResultSet.Read<CabDriverAppRouteDto>().ToList();
            }
            return cabDriverAppRouteListDto;
        }

        public async Task<CabdriverAppStoppageStudentDto> GetCabDriverAppStoppageStudent(int AcademicYearId, long? RouteId, string TripType)
        {
            CabdriverAppStoppageStudentDto cabdriverAppStoppageStudentDto = new CabdriverAppStoppageStudentDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@RouteId", RouteId);
            parameters.Add("@TripType", TripType);

            using (var multiResultSet = await db.QueryMultipleAsync("uspCabDriverStoppageStudentSelect", parameters, commandType: CommandType.StoredProcedure))
            {               
                cabdriverAppStoppageStudentDto.CabDriverStoppageList = multiResultSet.Read<CabdriverAppStoppageDto>().ToList();
                cabdriverAppStoppageStudentDto.CabDriverStudentList = multiResultSet.Read<CabdriverAppStudentDto>().ToList();
                cabdriverAppStoppageStudentDto.TripId = cabdriverAppStoppageStudentDto.CabDriverStoppageList
                    .Where(x => x.TripId != null && x.TripId > 0)
                    .Select(x => x.TripId)
                    .FirstOrDefault();
            }
            return cabdriverAppStoppageStudentDto;

        }

        public async Task<CabDriverProfileAppDto> GetCabDriverProfile(long? CabDriverId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CabDriverId", CabDriverId);
            return await db.QueryFirstOrDefaultAsync<CabDriverProfileAppDto>("uspCabDriverSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<StudentInformationDto> GetStudent(int AcademicYearId, string QRCode)
        {

            var splittedQRCode = QRCode.Split("-");
            var schoolCode = splittedQRCode[0];
            var studentId = Convert.ToInt32(splittedQRCode[1]);
            var schoolConnectionString =  await _userRepository.GetTenantConnectionString(schoolCode);

            using IDbConnection db = new SqlConnection(schoolConnectionString);
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@StudentId", studentId);
            return await db.QueryFirstOrDefaultAsync<StudentInformationDto>("uspCabDriverStudentInfoSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> UpdateCabDriverLocationByTrip(CabDriverLocationDto currentLocation)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TripId", currentLocation.TripId);
            parameters.Add("@Lat", currentLocation.Lat);
            parameters.Add("@Long", currentLocation.Long);
            return await db.ExecuteAsync("uspCabDriverLocationInsert", parameters, commandType: CommandType.StoredProcedure);

        }
        public async Task<CabDriverTripNotificationResponceDto> GetStudentList(long TripId)
        {
            CabDriverTripNotificationResponceDto cabDriverTripNotificationResponceDto = new CabDriverTripNotificationResponceDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TripId", TripId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspTripStudentSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                cabDriverTripNotificationResponceDto.NotificationStudentList = multiResultSet.Read<CabDriverTripNotificationDto>().ToList();
               
            }
            return cabDriverTripNotificationResponceDto;
        }

        public async Task<CabDriverActiveTripDto> GetActivetripSelect(CabDriverActiveTripRequestDto requestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", requestDto.UserId);
            parameters.Add("@RouteId", requestDto.RouteId);
            parameters.Add("@TripType", requestDto.TripType);
            return await db.QueryFirstOrDefaultAsync<CabDriverActiveTripDto>("uspCabDriveActiveTripSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<CabDriverActiveTripDto> GetCurrentActiveTripId(int CabDriverUserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CabDriverUserId", CabDriverUserId);
            return await db.QueryFirstOrDefaultAsync<CabDriverActiveTripDto>("uspCurrentActiveTripIdSelect", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
