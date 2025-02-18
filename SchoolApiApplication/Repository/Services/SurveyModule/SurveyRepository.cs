using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.SurveyModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SurveyModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.SurveyModule
{
    public class SurveyRepository: ISurveyRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SurveyRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

     

        public async Task<DatatableResponseModel> GetSurveyGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSurveyGridSelect",
                    new { RequestModel = strRequestModel, UserId = userId }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<SurveyDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<SurveyDto> SurveySelect(long SurveyId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SurveyId", SurveyId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspSurveySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var SurveyDto = multiResultSet.Read<SurveyDto>().First();
                SurveyDto.SurveyTextFileArray = multiResultSet.Read<SurveyFileDto>()?.ToList() ?? new List<SurveyFileDto>();
                SurveyDto.SurveyText = multiResultSet.Read<SurveyQuestionDto>()?.ToList() ?? new List<SurveyQuestionDto>();
                var surveyMappings = multiResultSet.Read<SurveyMappingDto>()?.ToList() ?? new List<SurveyMappingDto>();
                if (surveyMappings.Any())
                {

                    foreach (var item in surveyMappings.Where(x => x.ClassId != null))
                    {
                        SurveyDto.ClassId.Add(item.ClassId);
                    }
                    foreach (var item in surveyMappings.Where(x => x.StudentId != null))
                    {
                        SurveyDto.StudentId.Add(item.StudentId);
                    }
                    foreach (var item in surveyMappings.Where(x => x.TeacherId != null))
                    {
                        SurveyDto.TeacherId.Add(item.TeacherId);
                    }
                    foreach (var item in surveyMappings.Where(x => x.ClerkId != null))
                    {
                        SurveyDto.ClerkId.Add(item.ClerkId);
                    }
                    foreach (var item in surveyMappings.Where(x => x.CabDriverId != null))
                    {
                        SurveyDto.CabDriverId.Add(item.CabDriverId);
                    }
                    foreach (var item in surveyMappings.Where(x => x.ClassTeacherId != null))
                    {
                        SurveyDto.ClassTeacherId= item.ClassTeacherId;
                    }
                }
                return SurveyDto;
            }

        }

        public async Task<int> SurveyUpsert(SurveyDto Survey, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(SurveyFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(SurveyFileDto.FileType), typeof(string));
           // fileDT.Columns.Add(nameof(SurveyFileDto.ServeyQuestions), typeof(string));

            Survey.SurveyTextFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(SurveyFileDto.FileName)] = fileDetail.FileName;
                row[nameof(SurveyFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            DataTable fileTable = new();
            fileTable.Columns.Add(nameof(SurveyQuestionDto.SurveyQuestions), typeof(string));

            Survey.SurveyText.ForEach(fileDetails =>
            {
                var row = fileTable.NewRow();
                row[nameof(SurveyQuestionDto.SurveyQuestions)] = fileDetails.SurveyQuestions;
                fileTable.Rows.Add(row);
            });



            DataTable studentIdDT = new();
            studentIdDT.Columns.Add("Id", typeof(string));

            Survey.StudentId.ForEach(Id =>
            {
                var row = studentIdDT.NewRow();
                row["Id"] = Id;
                studentIdDT.Rows.Add(row);
            });

            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));

            Survey.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });

            DataTable teacherIdDT = new();
            teacherIdDT.Columns.Add("Id", typeof(string));

            Survey.TeacherId.ForEach(Id =>
            {
                var row = teacherIdDT.NewRow();
                row["Id"] = Id;
                teacherIdDT.Rows.Add(row);
            });

            DataTable clerkIdDT = new();
            clerkIdDT.Columns.Add("Id", typeof(string));

            Survey.ClerkId.ForEach(Id =>
            {
                var row = clerkIdDT.NewRow();
                row["Id"] = Id;
                clerkIdDT.Rows.Add(row);
            });

            DataTable cabDriverIdDT = new();
            cabDriverIdDT.Columns.Add("Id", typeof(string));

            Survey.CabDriverId.ForEach(Id =>
            {
                var row = cabDriverIdDT.NewRow();
                row["Id"] = Id;
                cabDriverIdDT.Rows.Add(row);
            });

            var parameters = new
            {
                Survey.SurveyId,
                Survey.IsImportant,
                Survey.AcademicYearId,
                Survey.SurveyToType,
                Survey.SurveyTitle,
                Survey.SurveyDescription,
                Survey.StartDate,
                Survey.EndDate,
                Survey.IsPublished,
                UserId,
                Survey.ClassTeacherId,
                SurveyFileDetails = fileDT.AsTableValuedParameter("[dbo].[SurveyFileDetailType]"),
                SurveyQuestionDetails = fileTable.AsTableValuedParameter("[dbo].[SurveyQuestionType]"),
                SurveyStudentId = studentIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                SurveyClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                SurveyTeacherId = teacherIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                SurveyClerkId = clerkIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                SurveyCabDriverId = cabDriverIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
             };
            return await db.ExecuteAsync("uspSurveyUpsert", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<int> SurveyDelete(long? SurveyId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SurveyId", SurveyId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspSurveyDelete", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<int> PublishUnpublishSurveyParticular(PublishUnpublishSurveyDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@SurveyId", publishRequest.SurveyId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);


            return await db.ExecuteAsync("uspSurveyPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<CommonDropdownSelectListItemResponseDto>GetSurveyFromRoleAppSelectList()
        {
            CommonDropdownSelectListItemResponseDto response = new CommonDropdownSelectListItemResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var result = await db.QueryAsync<CommonDropdownSelectListItemDto>("uspSurveyFromRoleAppSelect", commandType: CommandType.StoredProcedure);
            response.LstDropdownValues = result != null ? result.ToList() : new List<CommonDropdownSelectListItemDto>();
            return response;
        }
    }
}
