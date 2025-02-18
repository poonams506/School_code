using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentAttendanceModule
{
    public class StudentAttendanceDatewiseReportRepository:IStudentAttendanceDateWiseReportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentAttendanceDatewiseReportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DatatableResponseModel> StudentAttendanceReportDateWise(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
          

            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
           
                var parameters = new DynamicParameters();
                parameters.Add("@TakenOn", requestObjectWrapper.takenOn);
                parameters.Add("@AcademicYearId", requestObjectWrapper.academicYearId);

                var result = await db.QueryFirstOrDefaultAsync<StudentAttendanceReportDateWiseDto>("uspClassAttendanceDateExitsReportSelect", parameters, commandType: CommandType.StoredProcedure);


            if (result.IsSchoolHoliday == 0) {
                using IDbConnection dbd = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                using (var connection = new SqlConnection(dbd.ConnectionString))
                {
                    using (var multi = await connection.QueryMultipleAsync("uspClassAttendanceReportDatewise",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                    {
                        datatableResponseModel.recordsTotal = multi.Read<int>().First();
                        datatableResponseModel.data = multi.Read<StudentAttendanceReportDateWiseDto>()?.ToList();
                        datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                    }
                    
                }
                return datatableResponseModel;
            }
            else
            {
                datatableResponseModel.data = 1;

            }
               
           
            return datatableResponseModel;
        }

      

        //public async Task<IActionResult> CheckAttendanceDateForHoliday(DateTime attendanceDateTime)
        //{
        //    int isSchoolHoliday = 0;

        //    using (IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString()))
        //    {
        //        var parameters = new
        //        {
        //            AttendanceDateTime = attendanceDateTime
        //        };

        //        isSchoolHoliday = await db.ExecuteScalarAsync<int>("uspClassAttendanceDateExitsReportSelect", parameters, commandType: CommandType.StoredProcedure);
        //    }

        //    return isSchoolHoliday;
        //}
    }
}
