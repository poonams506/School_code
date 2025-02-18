using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.SchoolCalendarModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentCalendarModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.SchoolCalendarModule
{
    public class SchoolCalendarRepository : ISchoolCalendarRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SchoolCalendarRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
    
        public async Task<SchoolCalendarResponseDto> SchoolCalendarHolidayEventSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);


            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolCalendarEventHolidaysSelect", parameters,  commandType: CommandType.StoredProcedure))
            {
                var schoolCalendarResponseDto = new SchoolCalendarResponseDto();
                var result = multiResultSet.Read<SchoolCalendarDto>()?.ToList();
                schoolCalendarResponseDto.EventHolidayList = result == null ? new List<SchoolCalendarDto>() : result;
                return schoolCalendarResponseDto;
            }
        }

        public async Task<SchoolCalendarAppResponseDto> GetSchoolCalendarEventsForTeacherApp(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
           
            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolCalendarEventHolidaysForTeacherAppSelect",new { AcademicYearId }, commandType: CommandType.StoredProcedure))
            {
                var schoolCalendarAppResponseDto = new SchoolCalendarAppResponseDto();
                schoolCalendarAppResponseDto.LstEvents = multiResultSet.Read<SchoolCalendarDto>().ToList();
               var lstEventDetail= multiResultSet.Read<SchoolCalendarEventDetailAppDto>().ToList();
                if (lstEventDetail.Count > 0)
                {
                    schoolCalendarAppResponseDto.LstEvents.ForEach(schoolEvent =>
                    {
                        if (schoolEvent.EventType == "Event")
                        {
                            schoolEvent.LstEventDetail= lstEventDetail.Where(x=>x.SchoolEventId==schoolEvent.Id).ToList();
                        }
                    });
                }
               
                return schoolCalendarAppResponseDto;
            }
        }
    }
}
