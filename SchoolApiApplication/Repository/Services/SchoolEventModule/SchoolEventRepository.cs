using Dapper;
using DocumentFormat.OpenXml.Office2010.Word;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SchoolEventModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.SchoolEventModule
{
 
    public class SchoolEventRepository : ISchoolEventRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SchoolEventRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> SchoolEvent(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSchoolEventGridSelect",
                    new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<SchoolEventDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
       
        public async Task<SchoolEventDto> SchoolEventSelect(long SchoolEventId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolEventId", SchoolEventId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolEventSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var schoolEventDto = multiResultSet.Read<SchoolEventDto>().First();

                // Read all necessary result sets before exiting the using block
                schoolEventDto.FileNameList = multiResultSet.Read<SchoolEventFileDto>()?.ToList() ?? new List<SchoolEventFileDto>();
                var schoolEvent = multiResultSet.Read<PublishUnpublishSchoolEventDto>()?.ToList() ?? new List<PublishUnpublishSchoolEventDto>();
                if (schoolEvent.Any())
                {
                    foreach (var item in schoolEvent.Where(x => x.ClassId != null))
                    {
                        schoolEventDto.ClassId.Add(item.ClassId);
                    }
                }
              
                

                return schoolEventDto;
             }
            
        }


        public async Task<int> SchoolEventUpsert(SchoolEventDto sedObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(SchoolEventFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(SchoolEventFileDto.FileType), typeof(int));
            sedObj.FileNameList?.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(SchoolEventFileDto.FileName)] = fileDetail.FileName;
                row[nameof(SchoolEventFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            
            sedObj.MediaFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(SchoolEventFileDto.FileName)] = fileDetail.FileName;
                row[nameof(SchoolEventFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });
            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));

            sedObj.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });
            var parameters = new
            {
                sedObj.SchoolEventId,
                sedObj.AcademicYearId,
                sedObj.EventTitle,
                sedObj.EventDescription,
                sedObj.EventFess,
                sedObj.EventVenue,
                sedObj.EventCoordinator,
                sedObj.StartDate,
                sedObj.EndDate,
                sedObj.StartTime,
                sedObj.EndTime,
                sedObj.IsCompulsory,
                sedObj.IsPublished,
                UserId,
                schoolEventDetails = fileDT.AsTableValuedParameter("[dbo].[SchoolEventDetailType]"),
                ClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),


            };
            return await db.ExecuteAsync("uspSchoolEventUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

       public async  Task<int> PublishUnpublishSchoolEventParticular(PublishUnpublishSchoolEventDto publishRequest, int UserId)
        {
            PublishUnpublishSchoolEventDto publishUnpublishSchoolEventkDto = new PublishUnpublishSchoolEventDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@SchoolEventId", publishRequest.SchoolEventId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);


            return await db.ExecuteAsync("uspSchoolEventPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<int> SchoolEventDelete(long? SchoolEventId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolEventId", SchoolEventId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspSchoolEventDelete", parameters, commandType: CommandType.StoredProcedure);
        }

    }
}
