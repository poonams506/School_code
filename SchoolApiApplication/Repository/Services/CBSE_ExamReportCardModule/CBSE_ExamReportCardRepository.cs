using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamReportCard;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamReportCard;
using System.Data;

namespace SchoolApiApplication.Repository.Services.CBSE_ExamReportCard
{
    public class CBSE_ExamReportCardRepository : ICBSE_ExamReportCardRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CBSE_ExamReportCardRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetExamReportCardGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspExamReportCardGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<CBSE_ExamReportCardNameDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
        public async Task<CBSE_ExamNameResponseDto> GetExamMasterListForReport(ExamNameRequestDto obj)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));
            obj.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });

            var parameters = new
            {
                obj.AcademicYearId,
                ClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]")

            };
            var ExamNameList = await db.QueryAsync<CBSE_ExamNameSelectDto>("uspExamMasterDropdownForReport", parameters, commandType: CommandType.StoredProcedure);
            CBSE_ExamNameResponseDto responseDto = new CBSE_ExamNameResponseDto();
            if (ExamNameList != null && ExamNameList.Any())
            {
                responseDto.ExamNameList = ExamNameList.ToList();
            }
            return responseDto;
        }
        public async Task<int> ExamReportCardDelete(long ExamReportCardNameId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamReportCardNameId", ExamReportCardNameId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspExamReportCardDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<CBSE_ExamReportCardNameDto> GetExamReportCardSelect(long ExamReportCardNameId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamReportCardNameId", ExamReportCardNameId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            return await db.QueryFirstOrDefaultAsync<CBSE_ExamReportCardNameDto>("uspExamReportCardSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> ExamReportCardUpsert(ExamReportCardUpsertDto obj, int UserId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));
            obj.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });
            DataTable examMasterIdDT = new();
            examMasterIdDT.Columns.Add("Id", typeof(string));
            obj.ExamMasterId.ForEach(Id =>
            {
                var row = examMasterIdDT.NewRow();
                row["Id"] = Id;
                examMasterIdDT.Rows.Add(row);
            });
            var parameters = new
            {
                obj.ExamReportCardNameId,
                AcademicYearId,
                obj.ReportCardName,
                obj.Description,
                ExamMasterIds = examMasterIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                ClassIds = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                obj.IsTwoDifferentExamSection,
                UserId
            };
            return await db.QueryFirstOrDefaultAsync<int>("uspExamReportCardUpsert", parameters, commandType: CommandType.StoredProcedure);

        }
    }
}
