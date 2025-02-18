using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.SchedularNotificationModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SchedularNotificationModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.SchedularNotificationModule
{
    public class SchedularNotificationRepository: ISchedularNotificationRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SchedularNotificationRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<SchoolHolidaysDto> SchoolHolidaysSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<SchoolHolidaysDto>("uspUpcomingTeacherLectureSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<EventSelectResponseDto> EventSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspEventSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var EventSelectResponseDto = new EventSelectResponseDto();
                var result = multiResultSet.Read<EventSelectDto>().ToList();
                EventSelectResponseDto.EventSelectList = result == null ? new List<EventSelectDto>() : result;
                return EventSelectResponseDto;
            }
        }

        public async Task<UpcomingTeacherLectureResponseDto> UpcomingTeacherLectureSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspUpcomingTeacherLectureSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var UpcomingTeacherLectureResponseDto = new UpcomingTeacherLectureResponseDto();
                var result = multiResultSet.Read<UpcomingTeacherLectureDto>().ToList();
                UpcomingTeacherLectureResponseDto.UpcomingTeacherLectureList = result == null ? new List<UpcomingTeacherLectureDto>() : result;
                return UpcomingTeacherLectureResponseDto;
            }
        }

        public async Task<BulkPaymentReminderResponseDto> BulkPaymentReminderSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspBulkPaymentReminderSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var BulkPaymentReminderResponseDto = new BulkPaymentReminderResponseDto();
                var result = multiResultSet.Read<BulkPaymentReminderDto>().ToList();
                BulkPaymentReminderResponseDto.BulkPaymentReminderList = result == null ? new List<BulkPaymentReminderDto>(): result;
                return BulkPaymentReminderResponseDto;
            }

        }
    }
}
