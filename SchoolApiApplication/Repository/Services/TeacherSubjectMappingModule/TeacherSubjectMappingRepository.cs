using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.TeacherSubjectMapping;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TeacherSubjectMappingModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TeacherSubjectMappingModule
{
    public class TeacherSubjectMappingRepository: ITeacherSubjectMappingRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TeacherSubjectMappingRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetTeacherSubjectMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspTeacherSubjectMappingGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    //  datatableResponseModel.data = multi.Read<TeacherSubjectMappingDto>()?.ToList();
                    var teacherSubjectList = multi.Read<TeacherSubjectMappingDto>()?.ToList();
                    foreach (var row in teacherSubjectList)
                    {
                        row.AcademicYearId=requestObjectWrapper.academicYearId??0;
                        if (!string.IsNullOrEmpty(row.SubjectMasterIds))
                        {
                            row.TeacherSubjectList=row.SubjectMasterIds.Split(",").Where(x => !string.IsNullOrEmpty(x)).Select(y => Int32.Parse(y)).ToList();
                        }
                    }
                    datatableResponseModel.data=teacherSubjectList;
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

       
        public async Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingInsert(TeacherSubjectMappingDto TeacherSubjectMappingObj, int UserId, int academicYearId, int teacherId)
        {
            List<TeacherSubjectExistResposeDto> existResponse = new List<TeacherSubjectExistResposeDto>();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(TeacherSubjectMappingTypeDto.SubjectMasterId), typeof(int));

            TeacherSubjectMappingObj.TeacherSubjectList?.ForEach(subjectMasterId =>
            {
                var row = fileDT.NewRow();
                row[nameof(TeacherSubjectMappingTypeDto.SubjectMasterId)] = subjectMasterId;
                fileDT.Rows.Add(row);
            });

            var parameters = new
            {
                TeacherSubjectMappingObj.TeacherSubjectMappingId,
                TeacherSubjectMappingObj.AcademicYearId,
                TeacherSubjectMappingObj.TeacherId,
                TeacherSubjectMappingObj.LecturePerWeek,
                UserId,
                Subject = fileDT.AsTableValuedParameter(" [dbo].[SubjectMappingType]"),


            };
            var success = await db.ExecuteAsync("uspTeacherSubjectMappingUpsert", parameters, commandType: CommandType.StoredProcedure);
            existResponse.ForEach(item => item.Success = success);

            return existResponse;
        }
        public async Task<List<TeacherSubjectExistResposeDto>> TeacherSubjectMappingDelete(int UserId, int academicYearId, int teacherId, int subjectId)

        {
            var canTrigger = true;
            List<TeacherSubjectExistResposeDto> existResponse = new List<TeacherSubjectExistResposeDto>();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new
            {
                AcademicYearId = academicYearId,
                TeacherId = teacherId,
                SubjectId = subjectId

            };

            using (var multiResultSet = await db.QueryMultipleAsync("uspCheckExistSubjectTimetable", parameters, commandType: CommandType.StoredProcedure))
            {

                existResponse = multiResultSet.Read<TeacherSubjectExistResposeDto>()?.ToList();

            }
            if (existResponse != null)
            {
                canTrigger = existResponse.All(item => item.ExistsInClassTimeTable != 1);
            }

            if (canTrigger)
            {
                var success = await db.ExecuteAsync("uspTeacherSujectMappingDelete", parameters, commandType: CommandType.StoredProcedure);
            }

            return existResponse;

        }

    }
}
