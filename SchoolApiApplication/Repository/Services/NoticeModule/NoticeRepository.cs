using Dapper;
using DocumentFormat.OpenXml.Office2013.Excel;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SurveyModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.NoticeModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.NoticeModule
{
    public class NoticeRepository : INoticeRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public NoticeRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel>GetNoticeGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using ( var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi =await connection.QueryMultipleAsync("uspNoticeGridSelect",
                    new { RequestModel =  strRequestModel, UserId = userId }, commandType: CommandType.StoredProcedure)) 
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<NoticeGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }




        public async Task<NoticeUpsertDto> NoticeSelect(long NoticeId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@NoticeId", NoticeId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspNoticeSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var NoticeDto = multiResultSet.Read<NoticeUpsertDto>().First();
               // NoticeDto.NoticeMediaFileArray = multiResultSet.Read<NoticeFileDto>()?.ToList() ?? new List<NoticeFileDto>();
                NoticeDto.NoticeTextFileArray = multiResultSet.Read<NoticeFileDto>()?.ToList() ?? new List<NoticeFileDto>();
                NoticeDto.VideoText = multiResultSet.Read<ProjectMediaContentDto>()?.ToList() ?? new List<ProjectMediaContentDto>();

                var noticeMappings = multiResultSet.Read<NoticeMappingDto>()?.ToList() ?? new List<NoticeMappingDto>();
                if (noticeMappings.Any())
                {

                    foreach (var item in noticeMappings.Where(x => x.ClassId != null))
                    {
                        NoticeDto.ClassId.Add(item.ClassId);
                    }
                    foreach (var item in noticeMappings.Where(x => x.StudentId != null))
                    {
                        NoticeDto.studentId.Add(item.StudentId);
                    }
                    foreach (var item in noticeMappings.Where(x => x.TeacherId != null))
                    {
                        NoticeDto.teacherId.Add(item.TeacherId);
                    }
                    foreach (var item in noticeMappings.Where(x => x.ClerkId != null))
                    {
                        NoticeDto.clerkId.Add(item.ClerkId);
                    }
                    foreach (var item in noticeMappings.Where(x => x.CabDriverId != null))
                    {
                        NoticeDto.cabDriverId.Add(item.CabDriverId);
                    }
                }
                return NoticeDto;
            }

        }


        public async Task<int> NoticeUpsert(NoticeUpsertDto notice, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(NoticeFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(NoticeFileDto.FileType), typeof(string));

            notice.NoticeTextFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(NoticeFileDto.FileName)] = fileDetail.FileName;
                row[nameof(NoticeFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            //notice.NoticeMediaFileArray.ForEach(fileDetail =>
            //{
            //    var row = fileDT.NewRow();
            //    row[nameof(NoticeFileDto.FileName)] = fileDetail.FileName;
            //    row[nameof(NoticeFileDto.FileType)] = fileDetail.FileType;
            //    fileDT.Rows.Add(row);
            //});

            DataTable mediaContentDT = new();
            mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.ContentUrl), typeof(string));
            //mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.Base64Image), typeof(string));
           // mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.ImageContentType), typeof(string));
           // mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.FileType), typeof(string));
           // mediaContentDT.Columns.Add(nameof(ProjectMediaContentDto.FullPath), typeof(string));

            notice.VideoText.ForEach(mediaContent =>
            {
                var row = mediaContentDT.NewRow();
                row[nameof(ProjectMediaContentDto.ContentUrl)] = mediaContent.ContentUrl;
               // row[nameof(ProjectMediaContentDto.Base64Image)] = mediaContent.Base64Image;
               // row[nameof(ProjectMediaContentDto.ImageContentType)] = mediaContent.ImageContentType;
               // row[nameof(ProjectMediaContentDto.FileType)] = mediaContent.FileType;
               // row[nameof(ProjectMediaContentDto.FullPath)] = mediaContent.FullPath;
                mediaContentDT.Rows.Add(row);
            });

            DataTable studentIdDT = new();
            studentIdDT.Columns.Add("Id", typeof(string));

            notice.studentId.ForEach(Id =>
            {
                var row = studentIdDT.NewRow();
                row["Id"] = Id;
                studentIdDT.Rows.Add(row);
            });

            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));

            notice.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });

            DataTable teacherIdDT = new();
            teacherIdDT.Columns.Add("Id", typeof(string));

            notice.teacherId.ForEach(Id =>
            {
                var row = teacherIdDT.NewRow();
                row["Id"] = Id;
                teacherIdDT.Rows.Add(row);
            });

            DataTable clerkIdDT = new();
            clerkIdDT.Columns.Add("Id", typeof(string));

            notice.clerkId.ForEach(Id =>
            {
                var row = clerkIdDT.NewRow();
                row["Id"] = Id;
                clerkIdDT.Rows.Add(row);
            });

            DataTable cabDriverIdDT = new();
            cabDriverIdDT.Columns.Add("Id", typeof(string));

            notice.cabDriverId.ForEach(Id =>
            {
                var row = cabDriverIdDT.NewRow();
                row["Id"] = Id;
                cabDriverIdDT.Rows.Add(row);
            });

            var parameters = new
            {
                notice.NoticeId,
                notice.IsImportant,
                notice.AcademicYearId,
                notice.NoticeToType,
                notice.NoticeTitle,
                notice.NoticeDescription,
                notice.StartDate,
                notice.EndDate,
                notice.IsPublished,
                UserId,
                NoticeFileDetails = fileDT.AsTableValuedParameter("[dbo].[NoticeFileDetailType]"),
                NoticeStudentId = studentIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeTeacherId = teacherIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeClerkId = clerkIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                NoticeCabDriverId = cabDriverIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                Mediadetails = mediaContentDT.AsTableValuedParameter("[dbo].[MediaType]")
            };

            return await db.ExecuteAsync("uspNoticeUpsert", parameters, commandType: CommandType.StoredProcedure);
        }



        public async Task<int> NoticeDelete(long? NoticeId,int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@NoticeId", NoticeId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspNoticeDelete", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> PublishUnpublishNoticeParticular(PublishUnpublishNoticeDto publishRequest, int UserId)
        {
           using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@NoticeId", publishRequest.NoticeId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);


            return await db.ExecuteAsync("uspNoticePublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<ParentAppNoticeResponseDto> GetAllNoticeForStudent(ParentAppNoticeRequestDto requestDto)
        {
            ParentAppNoticeResponseDto parentAppNoticeResponseDto = new ParentAppNoticeResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@StudentId", requestDto.StudentId);
            parameters.Add("@Month", requestDto.Month);
            parameters.Add("@Year", requestDto.Year);
            using (var multiResultSet = await db.QueryMultipleAsync("uspNoticeParentAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                parentAppNoticeResponseDto.NoticeList = multiResultSet.Read<ParentAppNoticeDto>().ToList();
                var noticeDetailResult = multiResultSet.Read<ParentAppNoticeDetailDto>().ToList();
                var noticeMediaResults = multiResultSet.Read<NoticetMediaContentDto>().ToList();
                if (noticeDetailResult.Count > 0)
                {
                    parentAppNoticeResponseDto.NoticeList.ForEach(notice =>
                    {
                        notice.LstNoticeDetail = noticeDetailResult.Where(result => result.NoticeId == notice.NoticeId).ToList();
                    });

                }
                if (noticeMediaResults.Count > 0)
                {
                    parentAppNoticeResponseDto.NoticeList.ForEach(notice =>
                    {
                        notice.LstNoticeMediaDetail = noticeMediaResults.Where(x => x.NoticeId == notice.NoticeId).ToList();
                    });
                }
                return parentAppNoticeResponseDto;

            }
        }


      public async  Task<CommonDropdownSelectListItemResponseDto> GetNoticeFromRoleAppSelectList()
      {
            CommonDropdownSelectListItemResponseDto response = new CommonDropdownSelectListItemResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var result = await db.QueryAsync< CommonDropdownSelectListItemDto>("uspNoticeFromRoleAppSelect", commandType: CommandType.StoredProcedure);
            response.LstDropdownValues = result != null ? result.ToList() : new List<CommonDropdownSelectListItemDto>();
            return response;
      }
    }
}
