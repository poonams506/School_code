using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.DashboardModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TeacherModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.DashBoardModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.DashBoardModule
{
    public class DashBoardRepository : IDashBoardRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DashBoardRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DashboardCountDto> GetDashboardCount()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            return await db.QueryFirstAsync<DashboardCountDto>("uspDashboardCountSelect", commandType: CommandType.StoredProcedure);
        }

        public async Task<AdminDashboardCountDto> GetAdminDashboardCount(short AcademicYearId)
        {
            
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspAdminDashboardCountSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var dashboardCountDto = new AdminDashboardCountDto();
                dashboardCountDto.AddmissionCount = multiResultSet.Read<AddmissionCount>().First();
                dashboardCountDto.AttendancePercentage = multiResultSet.Read<AttendancePercentage>().First();
                dashboardCountDto.GirlsBoysCount = multiResultSet.Read<GirlsBoysCount>().First();
                dashboardCountDto.FeeCollectionPercentage = multiResultSet.Read<FeeCollectionPercentage>().First();
                return dashboardCountDto;
            }
           
        }

        public async Task<TeacherDashboardCountDto> GetTeacherDashboardCount(short AcademicYearId, short TeacherId)
        {
            var dashboardCountDto = new TeacherDashboardCountDto();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@@TeacherId", TeacherId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTeacherDashboardCountSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                dashboardCountDto.GirlsBoysCount = multiResultSet.Read<GirlsBoysCount>().First();
                dashboardCountDto.AttendancePercentage= multiResultSet.Read<AttendancePercentage>().First();
                return dashboardCountDto;
            }
           
        }

       
        public async Task<DashBoardStaffDetailsDto> GetDashBoardStaffDetails()
        {
            var dashBoardStaffDetailsDto = new DashBoardStaffDetailsDto();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            using (var multiResultSet = await db.QueryMultipleAsync("uspDashBoardStaffDetailsSelect", commandType: CommandType.StoredProcedure))
            {
                dashBoardStaffDetailsDto.DashBoardStaffDetails = multiResultSet.Read<DashBoardStaffDetails>().ToList();

                return dashBoardStaffDetailsDto;
            }
           
        }

        public async Task<GirlsBoysCountDto> GetDashboardGirlsBoysCount()
        {
            var girlsBoysCountDto = new GirlsBoysCountDto();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            using (var multiResultSet = await db.QueryMultipleAsync("uspDashboardGirlsBoysCountSelect", commandType: CommandType.StoredProcedure))
            {
                girlsBoysCountDto.GirlsBoysCount = multiResultSet.Read<GirlsBoysCount>().ToList();
                return girlsBoysCountDto;
            }
           
        }

        public async Task<IdealTeacherListResponseDto> GetIdealTeacherList(short AcademicYearId)
        {
            IdealTeacherListResponseDto result = new IdealTeacherListResponseDto();
          
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspDashboardIdealTeachersSelect", parameters, commandType: CommandType.StoredProcedure))
            {
              var  headerTimeData = multiResultSet.Read<IdealTeacher>().ToList();
              var  withAllData = multiResultSet.Read<IdealTeacher>().ToList();
              var  teacherData = multiResultSet.Read<IdealTeacher>().ToList();
              List<IdealTeachersWithHrsAndMinsDto> processHrsAndMinsList = new List<IdealTeachersWithHrsAndMinsDto>();
                foreach (var headerItem in headerTimeData)
                {
                    List<IdealTeacher> idealTeacherList = new List<IdealTeacher>();
                    foreach (var teacherItem in teacherData)
                    {
                        var checkTeacherHaveLecture = withAllData.Exists(x => x.StartingHour == headerItem.StartingHour && x.StartingMinute == headerItem.StartingMinute
                          && x.EndingHour == headerItem.EndingHour && x.EndingMinute == headerItem.EndingMinute && x.TeacherId == teacherItem.TeacherId);
                        if (!checkTeacherHaveLecture)
                        {
                            idealTeacherList.Add(teacherItem);
                        }
                    }
                    processHrsAndMinsList.Add(new IdealTeachersWithHrsAndMinsDto
                    {
                        StartingHour = headerItem.StartingHour,
                        StartingMinute = headerItem.StartingMinute,
                        EndingHour = headerItem.EndingHour,
                        EndingMinute = headerItem.EndingMinute,
                        IdealTeacherList = idealTeacherList
                    });
                }
                result.SchoolTimeSlotList = processHrsAndMinsList;
                return result;
            }
         
        }
    }
}
