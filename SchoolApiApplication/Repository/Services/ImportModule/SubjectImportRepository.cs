using Dapper;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.ImportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ImportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ImportModule
{
    public class SubjectImportRepository : ISubjectImportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SubjectImportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<int> UploadSubjectData(List<ImportSubjectDataDto> subjectList, int UserId, string schoolCode)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable documentDT = new DataTable();
            ImportSubjectDataDto dto = new ImportSubjectDataDto();
            documentDT.Columns.Add(nameof(ImportSubjectDataDto.Subject_Name), typeof(string));
            subjectList.ForEach(document =>
            {
                var row = documentDT.NewRow();
                row[nameof(ImportSubjectDataDto.Subject_Name)] = document.Subject_Name;


                documentDT.Rows.Add(row);
            });

            var parameters = new
            {
                UserId,
                schoolCode,
                SubjectImportType = documentDT.AsTableValuedParameter("[dbo].[SubjectImportType]")

            };

            return await db.QueryFirstOrDefaultAsync<int>("uspImportSubjectData", parameters, commandType: CommandType.StoredProcedure);

        }

    }
}
