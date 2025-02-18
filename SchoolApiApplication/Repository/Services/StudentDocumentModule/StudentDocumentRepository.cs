using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.DTO.UserModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentDocumentModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentDocumentModule
{
    public class StudentDocumentRepository : IStudentDocumentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private object permission;

        public StudentDocumentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<StudentDocumentDto> GetStudentDocumentList(long StudentId)
        {
            StudentDocumentDto studentDocumentDto = new StudentDocumentDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multiResultSet = await connection.QueryMultipleAsync("uspStudentDocumentGridSelect",
                    parameters, commandType: CommandType.StoredProcedure))
                {
                    var result = multiResultSet.Read<StudentDocumentTypeDto>()?.ToList();
                    studentDocumentDto.StudentDocuments = result == null ? new List<StudentDocumentTypeDto>() : result;

                }
            }
            return studentDocumentDto;
        }

        public async Task<int> StudentDocumentDelete(long DocumentId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@DocumentId", DocumentId);
            //parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspStudentDocumentDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> StudentDocumentInsert(StudentDocumentDto studentDocumentDto,int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            long StudentId = studentDocumentDto.StudentId;
            DataTable documentDT = new();

            documentDT.Columns.Add(nameof(StudentDocumentTypeDto.DocumentId), typeof(long));
            documentDT.Columns.Add(nameof(StudentDocumentTypeDto.DocumentName),typeof(string));
            documentDT.Columns.Add(nameof(StudentDocumentTypeDto.DocumentUrl), typeof(string));
            documentDT.Columns.Add(nameof(StudentDocumentTypeDto.DocumentFileType), typeof(string));
            studentDocumentDto.StudentDocuments?.ForEach(document =>
            {
                var row = documentDT.NewRow();
                row[nameof(StudentDocumentTypeDto.DocumentUrl)] = document.DocumentUrl;
                row[nameof(StudentDocumentTypeDto.DocumentFileType)] = document.DocumentFileType;
                row[nameof(StudentDocumentTypeDto.DocumentName)] = document.DocumentName;
                row[nameof(StudentDocumentTypeDto.DocumentId)] = document.DocumentId;
                documentDT.Rows.Add(row);
            });

            var parameters = new
            {
                StudentId,
                UserId,
                StudentDocumentType = documentDT.AsTableValuedParameter("[dbo].[StudentDocumentType]")
              
            };
            return await db.ExecuteAsync("uspStudentDocumentInsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async  Task<StudentDocumentDto> GetStudentDocumentSelect(long DocumentId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@DocumentId", DocumentId);
            return await db.QueryFirstOrDefaultAsync<StudentDocumentDto>("uspStudentDocumentSelect", parameters, commandType: CommandType.StoredProcedure);
        }
    }
}
