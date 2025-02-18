using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentAttendanceModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentAttendanceModule
{
    public class StudentAttendanceReportRepository : IStudentAttendanceReportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentAttendanceReportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DatatableResponseModel> GetStudentAttendanceReportGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspStudentAttendanceReportGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().FirstOrDefault();
                    datatableResponseModel.data = multi.Read<StudentAttendanceReportDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

    }
}
