using Dapper;
using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.ParentAppModule.FeePayment;
using SchoolApiApplication.DTO.SchoolCalendarModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ParentAppModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ParentAppModule
{
    public class ParentAppRepository : IParentAppRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ParentAppRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<MissingAttendanceParentAppDto> AttendanceMissingParentDetails(int academicYearId, int StudentId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@StudentId", StudentId);
            return await db.QueryFirstOrDefaultAsync<MissingAttendanceParentAppDto>("uspAttendanceStatusParentAppSelect ", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<FeePaymentTopSectionDto> GetParentFeePaymentDetails(long studentId, int academicYearId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspParentAppFeePaymentSelect",
                     new { StudentId = studentId, AcademicYearId = academicYearId }, commandType: CommandType.StoredProcedure))
                {
                    FeePaymentTopSectionDto result = multi.Read<FeePaymentTopSectionDto>().First();
                    result.FeePaymentParticularSectionDtoList = multi.Read<FeePaymentParticularSectionDto>().ToList();
                    result.FeePaymentAndDiscountSectionDtoList = multi.Read<FeePaymentAndDiscountSectionDto>().ToList();
                    result.PaymentHistoryReceiptDtoList = multi.Read<PaymentHistoryReceiptDto>().ToList();
                    result.FeeInstallmentDetailDtoList = multi.Read<FeeInstallmentDetailDto>().ToList();
                    return result;
                }
            }

        }

        public async Task<TransportFeePaymentTopSectionDto> GetParentTransportFeePaymentDetails(long studentId, int academicYearId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspParentAppTransportFeePaymentSelect",
                     new { StudentId = studentId, AcademicYearId = academicYearId }, commandType: CommandType.StoredProcedure))
                {
                    TransportFeePaymentTopSectionDto result = multi.Read<TransportFeePaymentTopSectionDto>().First();
                    result.TransportFeePaymentParticularSectionDtoList = multi.Read<TransportFeePaymentParticularSectionDto>().ToList();
                    result.TransportPaymentHistoryReceiptDtoList = multi.Read<TransportPaymentHistoryReceiptDto>().ToList();
                    return result;
                }
            }

        }

        public async Task<OneMonthEventParentAppResponseDto> OneMonthEventDetails(int academicYearId, int classId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@ClassId", classId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspOneMonthEventParentAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var oneMonthEventParentAppResponseDto = new OneMonthEventParentAppResponseDto();
                oneMonthEventParentAppResponseDto.OneMonthEventList = multiResultSet.Read<OneMonthEventParentAppDto>().ToList();
                var lstEventDetail = multiResultSet.Read<OneMonthEventFileDetailsParentAppDto>().ToList();
                var lstEventDate = multiResultSet.Read<OneMonthEventDateParentAppDto>().ToList();
                if (lstEventDetail.Count > 0)
                {
                    oneMonthEventParentAppResponseDto.OneMonthEventList.ForEach(schoolEvent =>
                    {
                        schoolEvent.LstEventDetail = lstEventDetail.Where(x => x.SchoolEventId == schoolEvent.SchoolEventId).ToList();
                    });
                }
                if (lstEventDate.Count > 0)
                {
                    oneMonthEventParentAppResponseDto.OneMonthEventList.ForEach(schoolEventDate =>
                    {
                        schoolEventDate.LstEventDate = lstEventDate.Where(x => x.SchoolEventId == schoolEventDate.SchoolEventId).ToList();
                    });
                }
                return oneMonthEventParentAppResponseDto;
            }
        }

        public async Task<TeacherOneDayLecturesParentAppResponseDto> TeacherOneDayLecturesParentDetails(int academicYearId, int classId, int dayNo)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@ClassId", classId);
            parameters.Add("@DayNo", dayNo);
            var teacherOneDayLecturesParentAppResponseDto = new TeacherOneDayLecturesParentAppResponseDto();
            var lstUpcomingLecture = await db.QueryAsync<TeacherOneDayLecturesParentAppDto>("uspTeacherUpcomingLecturesParentAppSelect", parameters, commandType: CommandType.StoredProcedure);
            lstUpcomingLecture ??= new List<TeacherOneDayLecturesParentAppDto>();
            teacherOneDayLecturesParentAppResponseDto.TeacherOneDayLectureList = lstUpcomingLecture.ToList();
            return teacherOneDayLecturesParentAppResponseDto;
        }
        public async Task<StudentGradeDivisionParentAppDto> StudentGradeDivisionSelect(int academicYearId, int parentId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@ParentId", parentId);
            return await db.QueryFirstOrDefaultAsync<StudentGradeDivisionParentAppDto>("uspStudentGradeDivisionParentAppSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<SchoolParentCalendarResponseDto> GetParentAppListSelect(int academicYearId, int classId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@ClassId", classId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolCalendarEventHolidaysForParentAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var schoolParentCalendarResponseDto = new SchoolParentCalendarResponseDto();
                schoolParentCalendarResponseDto.ParentLstEvents = multiResultSet.Read<CalendarParentAppModuleDto>().ToList();
                var lstEventDetail = multiResultSet.Read<SchoolParentCalendarEventDetailAppDto>().ToList();
                if (lstEventDetail.Count > 0)
                {
                    schoolParentCalendarResponseDto.ParentLstEvents.ForEach(schoolEvent =>
                    {
                        if (schoolEvent.EventType == "Event")
                        {
                            schoolEvent.LstEventDetail = lstEventDetail.Where(x => x.SchoolEventId == schoolEvent.Id).ToList();
                        }
                    });
                }

                return schoolParentCalendarResponseDto;
            }
        }
        public async Task<StudentAttendanceMobileResponseDto> GetAttendanceDetailByStudentId(long StudentId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            var attendanceList = await db.QueryAsync<StudentAttendanceMobileDto>("uspStudentAttendanceMobileAppSelect", parameters, commandType: CommandType.StoredProcedure);
            StudentAttendanceMobileResponseDto responseDto = new StudentAttendanceMobileResponseDto();
            if (attendanceList != null && attendanceList.Any())
            {
                responseDto.LstStudentAttendance = attendanceList.ToList();
            }
            return responseDto;
        }

        public async Task<VehicleTrackResponseDto> GetVehicleTrackListSelect(long StudentId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            var VehicleTrackList = await db.QueryAsync<VehicleTrackDto>("uspCabDriverTripCurrentLocationAppSelect", parameters, commandType: CommandType.StoredProcedure);
            VehicleTrackResponseDto responseDto = new VehicleTrackResponseDto();
            if (VehicleTrackList != null && VehicleTrackList.Any())
            {
                responseDto.VehicleTrackList = VehicleTrackList.ToList();
            }
            return responseDto;
        }

        public async Task<StoppageTrackResponseDto> GetStoppageTrackListSelect(long StudentId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            var StoppageTrackList = await db.QueryAsync<VehicleTrackDto>("uspStoppageLatLagSelect", parameters, commandType: CommandType.StoredProcedure);
            StoppageTrackResponseDto responseDto = new StoppageTrackResponseDto();
            if (StoppageTrackList != null && StoppageTrackList.Any())
            {
                responseDto.StoppageTrackList = StoppageTrackList.ToList();
            }
            return responseDto;
        }
    }
}
