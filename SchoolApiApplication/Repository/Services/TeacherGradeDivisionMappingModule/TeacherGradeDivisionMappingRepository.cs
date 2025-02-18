using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.GradeDivisionMatrixModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TeacherGradeDivisionMappingModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TeacherGradeDivisionMappingModule
{
    public class TeacherGradeDivisionMappingRepository : ITeacherGradeDivisionMappingRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherGradeDivisionMappingRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetTeacherGradeDivisionMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspTeacherGradeDivisionMappingGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    var teacherList = multi.Read<TeacherGradeDivisionMappingDto>()?.ToList();
                    foreach (var row in teacherList)
                    {
                        row.AcademicYearId=requestObjectWrapper.academicYearId??0;
                        if (!string.IsNullOrEmpty(row.TeacherIds))
                        {
                            row.TeacherList=row.TeacherIds.Split(",").Where(x => !string.IsNullOrEmpty(x)).Select(y => Int32.Parse(y)).ToList();
                        }
                    }
                    datatableResponseModel.data=teacherList;
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
        public async Task<int> TeacherGradeDivisionMappingInsert(TeacherGradeDivisionMappingDto teacherGradeDivisionMappingobj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(TeacherSelectDto.TeacherId), typeof(int));

            teacherGradeDivisionMappingobj.TeacherList?.ForEach(teacherId =>
            {
                var row = fileDT.NewRow();
                row[nameof(TeacherSelectDto.TeacherId)] = teacherId;
                fileDT.Rows.Add(row);
            });

            var parameters = new
            {
                teacherGradeDivisionMappingobj.TeacherGradeDivisionMappingId,
                teacherGradeDivisionMappingobj.AcademicYearId,
                teacherGradeDivisionMappingobj.GradeId,
                teacherGradeDivisionMappingobj.DivisionId,
                UserId,
                Teacher = fileDT.AsTableValuedParameter(" [dbo].[TeacherType]"),

            };
            return await db.ExecuteAsync("uspTeacherGradeDivisionMappingUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> TeacherMappingDelete(int UserId, int academicYearId, int gradeId, int divisionId, int teacherId)

        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new
            {
                AcademicYearId = academicYearId,
                GradeId = gradeId,
                DivisionId = divisionId,
                TeacherId = teacherId
            };
            return await db.QueryFirstOrDefaultAsync<int>("uspClassTeacherMappingDelete", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
