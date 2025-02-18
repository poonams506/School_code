using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.GalleryModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.GalleryModule
{
    public class GalleryRepository : IGalleryRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GalleryRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<DatatableResponseModel> GetGalleryGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspGalleryGridSelect",
                    new { RequestModel = strRequestModel, UserId = userId }, commandType: CommandType.StoredProcedure))
                {
                   
                    datatableResponseModel.recordsTotal = multi.Read<int>().First(); 
                    datatableResponseModel.data = multi.Read<GalleryGridDto>()?.ToList(); 
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }

            return datatableResponseModel;
        }




        public async Task<int> GalleryDelete(long? GalleryId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GalleryId", GalleryId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspGalleryDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<GalleryUpsertDto> GallerySelect(long GalleryId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GalleryId", GalleryId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspGallerySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var GalleryDto = multiResultSet.Read<GalleryUpsertDto>().First();
                GalleryDto.GalleryTextFileArray = multiResultSet.Read<GalleryFileDto>()?.ToList() ?? new List<GalleryFileDto>();
                GalleryDto.GalleryVideoText = multiResultSet.Read<GalleryMediaContentDto>()?.ToList() ?? new List<GalleryMediaContentDto>();

                var GalleryMappings = multiResultSet.Read<GalleryMappingDto>()?.ToList() ?? new List<GalleryMappingDto>();
                if (GalleryMappings.Any())
                {
                    foreach (var item in GalleryMappings.Where(x => x.ClassId != null))
                    {
                        GalleryDto.ClassId.Add(item.ClassId);
                    }
                    foreach (var item in GalleryMappings.Where(x => x.StudentId != null))
                    {
                        GalleryDto.StudentId.Add(item.StudentId);
                    }
                    foreach (var item in GalleryMappings.Where(x => x.TeacherId != null))
                    {
                        GalleryDto.TeacherId.Add(item.TeacherId);
                    }
                    foreach (var item in GalleryMappings.Where(x => x.ClerkId != null))
                    {
                        GalleryDto.ClerkId.Add(item.ClerkId);
                    }
                    foreach (var item in GalleryMappings.Where(x => x.CabDriverId != null))
                    {
                        GalleryDto.CabDriverId.Add(item.CabDriverId);
                    }
                }
                return GalleryDto;
            }
        }

        public async Task<int> GalleryUpsert(GalleryUpsertDto obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(GalleryFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(GalleryFileDto.FileType), typeof(string));

            obj.GalleryTextFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(GalleryFileDto.FileName)] = fileDetail.FileName;
                row[nameof(GalleryFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            DataTable mediaContentDT = new();
            mediaContentDT.Columns.Add(nameof(GalleryMediaContentDto.ContentUrl), typeof(string));

            obj.GalleryVideoText.ForEach(mediaContent =>
            {
                var row = mediaContentDT.NewRow();
                row[nameof(GalleryMediaContentDto.ContentUrl)] = mediaContent.ContentUrl;
                mediaContentDT.Rows.Add(row);
            });

            DataTable studentIdDT = new();
            studentIdDT.Columns.Add("Id", typeof(string));

            obj.StudentId.ForEach(Id =>
            {
                var row = studentIdDT.NewRow();
                row["Id"] = Id;
                studentIdDT.Rows.Add(row);
            });

            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));

            obj.ClassId.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });

            DataTable teacherIdDT = new();
            teacherIdDT.Columns.Add("Id", typeof(string));

            obj.TeacherId.ForEach(Id =>
            {
                var row = teacherIdDT.NewRow();
                row["Id"] = Id;
                teacherIdDT.Rows.Add(row);
            });

            DataTable clerkIdDT = new();
            clerkIdDT.Columns.Add("Id", typeof(string));

            obj.ClerkId.ForEach(Id =>
            {
                var row = clerkIdDT.NewRow();
                row["Id"] = Id;
                clerkIdDT.Rows.Add(row);
            });

            DataTable cabDriverIdDT = new();
            cabDriverIdDT.Columns.Add("Id", typeof(string));

            obj.CabDriverId.ForEach(Id =>
            {
                var row = cabDriverIdDT.NewRow();
                row["Id"] = Id;
                cabDriverIdDT.Rows.Add(row);
            });

            var parameters = new
            {
                obj.GalleryId,
                obj.AcademicYearId,
                obj.GalleryToType,
                obj.GalleryTitle,
                obj.Description,
                obj.StartDate,
                obj.IsPublished,
                UserId,
                GalleryFileDetails = fileDT.AsTableValuedParameter("[dbo].[GalleryFileDetailType]"),
                GalleryStudentId = studentIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryTeacherId = teacherIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryClerkId = clerkIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryCabDriverId = cabDriverIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                GalleryMedias = mediaContentDT.AsTableValuedParameter("[dbo].[GalleryMediaType]")
            };

            return await db.ExecuteAsync("uspGalleryUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<CommonDropdownSelectListItemResponseDto> GetGalleryFromRoleAppSelectList()
        {
            CommonDropdownSelectListItemResponseDto response = new CommonDropdownSelectListItemResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var result = await db.QueryAsync<CommonDropdownSelectListItemDto>("uspGalleryFromRoleAppSelect", commandType: CommandType.StoredProcedure);
            response.LstDropdownValues = result != null ? result.ToList() : new List<CommonDropdownSelectListItemDto>();
            return response;
        }

     

        public async Task<int> PublishUnpublishGalleryParticular(PublishUnpublishGalleryDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@GalleryId", publishRequest.GalleryId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);

            return await db.ExecuteAsync("uspGalleryPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<ParentAppGalleryResponseDto> GetAllGalleryForStudent(ParentAppGalleryRequestDto requestDto)
        {
            ParentAppGalleryResponseDto parentAppGalleryResponseDto = new ParentAppGalleryResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            parameters.Add("@StudentId", requestDto.StudentId);
            parameters.Add("@FromDate", requestDto.FromDate);
            parameters.Add("@TillDate", requestDto.TillDate);
            using (var multiResultSet = await db.QueryMultipleAsync("uspGalleryParentAppSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                parentAppGalleryResponseDto.GalleryList = multiResultSet.Read<ParentAppGalleryDto>().ToList();
                var galleryDetailResult = multiResultSet.Read<ParentAppGalleryDetailDto>().ToList();
                var galleryMediaResults = multiResultSet.Read<MediaGalleryContentDto>().ToList();
                if (galleryDetailResult.Count > 0)
                {
                    parentAppGalleryResponseDto.GalleryList.ForEach(gallery =>
                    {
                        gallery.LstGalleryDetail = galleryDetailResult.Where(result => result.GalleryId == gallery.GalleryId).ToList();
                    });

                }
                if (galleryMediaResults.Count > 0)
                {
                    parentAppGalleryResponseDto.GalleryList.ForEach(gallery =>
                    {
                        gallery.LstGalleryMediaDetail = galleryMediaResults.Where(x => x.GalleryId == gallery.GalleryId).ToList();
                    });
                }
                return parentAppGalleryResponseDto;

            }
        }
    }
}
