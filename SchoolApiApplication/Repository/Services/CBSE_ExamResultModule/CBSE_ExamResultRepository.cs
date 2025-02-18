using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamResultModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.CBSE_ExamResultModule
{
    public class CBSE_ExamResultRepository : ICBSE_ExamResultRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CBSE_ExamResultRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CBSE_ExamResultDto> GetExamResultGridList(CBSE_ExamResultRequestDto requestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            CBSE_ExamResultDto cbse_ExamResultDto = new CBSE_ExamResultDto();

            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@GradeId", requestDto.GradeId);
            parameters.Add("@DivisionId", requestDto.DivisionId);
            parameters.Add("@ExamMasterId", requestDto.ExamMasterId);
            parameters.Add("@SubjectMasterId", requestDto.SubjectMasterId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspExamResultGridSelect", parameters, commandType: CommandType.StoredProcedure))
            {
               
                var studentList = await multiResultSet.ReadAsync<CBSE_ExamResultStudentDto>();
                var objectList = await multiResultSet.ReadAsync<CBSE_ExamResultObjectDto>();

                var processedStudentList = new List<CBSE_ExamResultStudentDto>();
                foreach (var item in studentList)
                {
                    List<CBSE_ExamResultObjectDto> processedObjectList = objectList.Where(x => x.StudentId == item.StudentId).ToList();
                    processedStudentList.Add(new CBSE_ExamResultStudentDto()
                    {
                        RollNumber = item.RollNumber,
                        StudentId =  item.StudentId,
                        StudentName = item.StudentName,
                        ObjectList = processedObjectList
                    });
                }

                return new CBSE_ExamResultDto()
                {
                    StudentList = processedStudentList,
                    HeaderObjectList = objectList
                    .GroupBy(x => new { x.ObjectName, x .OutOfMarks, x.ExamObjectId})   // Group by the property you want distinct values for
                    .Select(group => group.First()) // Select the first item from each group
                    .ToList()
                };
            }

        }

        public async Task<int> ExamResultUpsert(CBSE_ExamResultDto obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable projectsDT = new();
            projectsDT.Columns.Add(nameof(CBSE_ExamResultUpsertListDto.StudentId), typeof(Int64));
            projectsDT.Columns.Add(nameof(CBSE_ExamResultUpsertListDto.ExamObjectId), typeof(int));
            projectsDT.Columns.Add(nameof(CBSE_ExamResultUpsertListDto.OutOfMarks), typeof(int));
            projectsDT.Columns.Add(nameof(CBSE_ExamResultUpsertListDto.ActualMarks), typeof(decimal));
            projectsDT.Columns.Add(nameof(CBSE_ExamResultUpsertListDto.TotalMarks), typeof(decimal));
            projectsDT.Columns.Add(nameof(CBSE_ExamResultUpsertListDto.Percentage), typeof(decimal));
            projectsDT.Columns.Add(nameof(CBSE_ExamResultUpsertListDto.Grade), typeof(string));
            obj.CBSE_ExamResultList.ForEach(permission =>
            {
                var row = projectsDT.NewRow();
                row[nameof(CBSE_ExamResultUpsertListDto.StudentId)] = permission.StudentId;
                row[nameof(CBSE_ExamResultUpsertListDto.ExamObjectId)] = permission.ExamObjectId;
                row[nameof(CBSE_ExamResultUpsertListDto.OutOfMarks)] = permission.OutOfMarks;
                row[nameof(CBSE_ExamResultUpsertListDto.ActualMarks)] = permission.ActualMarks != null ? permission.ActualMarks : DBNull.Value;
                row[nameof(CBSE_ExamResultUpsertListDto.TotalMarks)] = permission.TotalMarks != null ? permission.TotalMarks : DBNull.Value;
                row[nameof(CBSE_ExamResultUpsertListDto.Percentage)] = permission.Percentage != null ? permission.Percentage : DBNull.Value;
                row[nameof(CBSE_ExamResultUpsertListDto.Grade)] = permission.Grade;

                projectsDT.Rows.Add(row);
            });
            var parameters = new
            {
                obj.AcademicYearId,
                UserId,
              ExamResultType = projectsDT.AsTableValuedParameter("[dbo].[CBSE_ExamResultType]")
            };
            return await db.ExecuteAsync("uspExamResultUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<ExamResultResponseDto> ExamNameList(int AcademicYearId, int GradeId, int DivisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            var ExamNameList = await db.QueryAsync<ExamNameDto>("uspExamNameDropdownSelect", parameters, commandType: CommandType.StoredProcedure);
            ExamResultResponseDto responseDto = new ExamResultResponseDto();
            if (ExamNameList.Any())
            {
                responseDto.ExamNameList = ExamNameList.ToList();
            }
            return responseDto;
        }

        public async Task<ExamResultResponseDto> SubjectNameList(int AcademicYearId, int ExamMasterId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ExamMasterId", ExamMasterId);
            var SubjectNameList = await db.QueryAsync<SubjectNameDto>("uspSubjectNameDropdownSelect", parameters, commandType: CommandType.StoredProcedure);
            ExamResultResponseDto responseDto = new ExamResultResponseDto();
            if (SubjectNameList.Any())
            {
                responseDto.SubjectNameList = SubjectNameList.ToList();
            }
            return responseDto;
        }
        public async Task<ExamResultResponseDto> MarkGradeList(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var MarkGradeList = await db.QueryAsync<MarkGradeDto>("uspMarksGradeSelect", parameters, commandType: CommandType.StoredProcedure);
            ExamResultResponseDto responseDto = new ExamResultResponseDto();
            if (MarkGradeList.Any())
            {
                responseDto.MarkGradeList = MarkGradeList.ToList();
            }
            return responseDto;
        }

        public async Task<DatatableResponseModel> GetCBSE_ExamResultGridSelect(DatatableRequestWrapper requestObjectWrapper)
        {

                DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
                String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
                using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                using (var connection = new SqlConnection(db.ConnectionString))
                {
                    using (var multi = await connection.QueryMultipleAsync("uspCBSE_ExamResultGridSelect",
                         new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                    {
                        datatableResponseModel.recordsTotal = multi.Read<int>().First();
                        datatableResponseModel.data = multi.Read<CBSE_ExamResultDto>()?.ToList();
                        datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                    }
                }
                return datatableResponseModel;
            }
        }

       
}
