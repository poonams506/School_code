using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.DTO.WeeklyDayOffModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.WeeklyDayOffModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.WeeklyDayOffModule
{
    public class WeeklyDayOffRepository: IWeeklyDayOffRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public WeeklyDayOffRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<int> WeeklyDayOffInsert(WeeklyDayOffDto obj, int UserId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable weeklyDayOffDT = new();
            weeklyDayOffDT.Columns.Add(nameof(WeeklyDayOffListDto.DayNo), typeof(int));

            obj.MultipleDayList?.ForEach(fileDetail =>
            {
                var row = weeklyDayOffDT.NewRow();
                row[nameof(WeeklyDayOffListDto.DayNo)] = fileDetail.DayNo;
                weeklyDayOffDT.Rows.Add(row);
            });

            var parameters = new
            {
                obj.AcademicYearId,
                obj.WeeklyOffId,
                UserId,
                WeeklyDayOffs = weeklyDayOffDT.AsTableValuedParameter("[dbo].[WeekDays]")

            };
            return await db.ExecuteAsync("uspWeeklyDayOffInsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<WeeklyDayOffDto> WeeklyDayOffSelect(int AcademicYearId)
        {
            WeeklyDayOffDto response = new WeeklyDayOffDto();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspWeeklyDayOffSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.MultipleDayList = multiResultSet.Read<WeeklyDayOffListDto>()?.ToList() ?? new List<WeeklyDayOffListDto>();
                return response;
            }
        }
    }
}
