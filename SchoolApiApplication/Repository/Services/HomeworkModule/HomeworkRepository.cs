using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.HomeworkModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.HomeworkModule
{
    public class HomeworkRepository : IHomeworkRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HomeworkRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DatatableResponseModel> GetHomeworkGridList(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspHomeWorkGridSelect",
                    new { RequestModel = strRequestModel, UserId = userId }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<HomeworkGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<HomeworkUpsertDto> HomeWorkSelect(long HomeworkId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@HomeWorkId", HomeworkId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspHomeWorkSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var HomeworkDto = multiResultSet.Read<HomeworkUpsertDto>().First();
                HomeworkDto.HomeworkTextFileArray = multiResultSet.Read<HomeworkFileDto>()?.ToList() ?? new List<HomeworkFileDto>();
                HomeworkDto.MediaVideoText = multiResultSet.Read<HomeworkMediaContentDto>()?.ToList() ?? new List<HomeworkMediaContentDto>();
                return HomeworkDto;
            }
        }

        public async Task<int> HomeWorkUpsert(HomeworkUpsertDto hwudObj, Int32 UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(HomeworkFileDto.FileName), typeof(string));
            fileDT.Columns.Add(nameof(HomeworkFileDto.FileType), typeof(string));

            hwudObj.HomeworkTextFileArray.ForEach(fileDetail =>
            {
                var row = fileDT.NewRow();
                row[nameof(HomeworkFileDto.FileName)] = fileDetail.FileName;
                row[nameof(HomeworkFileDto.FileType)] = fileDetail.FileType;
                fileDT.Rows.Add(row);
            });

            DataTable mediaContentDT = new();
            mediaContentDT.Columns.Add(nameof(HomeworkMediaContentDto.ContentUrl), typeof(string));

            hwudObj.MediaVideoText.ForEach(mediaContent =>
            {
                var row = mediaContentDT.NewRow();
                row[nameof(HomeworkMediaContentDto.ContentUrl)] = mediaContent.ContentUrl;
                mediaContentDT.Rows.Add(row);
            });

            var parameters = new
            {
                hwudObj.HomeworkId,
                hwudObj.AcademicYearId,
                hwudObj.ClassId,
                hwudObj.SubjectId,
                hwudObj.HomeworkTitle,
                hwudObj.HomeworkDescription,
                hwudObj.StartDate,
                hwudObj.EndDate,
                hwudObj.IsPublished,
                UserId,
                HomeWorkFileDetails = fileDT.AsTableValuedParameter("[dbo].[HomeWorkFileDetailType]"),
                Mediadetails = mediaContentDT.AsTableValuedParameter("[dbo].[MediaType]")
            };

            return await db.ExecuteAsync("uspHomeWorkUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> HomeWorkDelete(long? HomeworkId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@HomeworkId", HomeworkId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspHomeWorkDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> PublishUnpublishHomeworkParticular(PublishUnpublishHomeworkDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@HomeworkId", publishRequest.HomeworkId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);

            return await db.ExecuteAsync("uspHomeworkPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<SubjectMappingDropdownResponseDto> GetSubjectMappingDropdown(short AcademicYearId, short GradeId, short DivisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            var subjectsList = await db.QueryAsync<SubjectMappingDropdownDto>("uspSubjectDropDownSelect", parameters, commandType: CommandType.StoredProcedure);
            SubjectMappingDropdownResponseDto responseDto = new SubjectMappingDropdownResponseDto();
            if (subjectsList != null && subjectsList.Any())
            {
                responseDto.SubjectsList = subjectsList.ToList();
            }
            return responseDto;
        }

        //public async Task<ParentAppHomeworkResponseDto> GetAllHomeworkForStudent(ParentAppHomeworkRequestDto requestDto)
        //{
        //    ParentAppHomeworkResponseDto homeworkParentAppSelectResponseDto = new ParentAppHomeworkResponseDto();
        //    using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
        //    var parameters = new DynamicParameters();
        //    parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
        //    parameters.Add("@FromDate", requestDto.FromDate);
        //    parameters.Add("@TillDate", requestDto.TillDate);
        //    parameters.Add("@StudentId", requestDto.StudentId);
        //    using (var multiResultSet = await db.QueryMultipleAsync("uspHomeworkParentAppSelect", parameters, commandType: CommandType.StoredProcedure))
        //    {
        //        var homeworkList = multiResultSet.Read<ParentAppHomeworkDto>().ToList();
        //        var homeworkDetailList = multiResultSet.Read<ParentAppHomeworkDetailDto>().ToList();

        //        homeworkList.ForEach(homework =>
        //        {
        //            homework.LstHomeworkDetail = homeworkDetailList.Where(x => x.HomeworkId == homework.HomeworkId).ToList();
        //        });

        //        homeworkParentAppSelectResponseDto.HomeworkList = homeworkList;
        //    }
        //    return homeworkParentAppSelectResponseDto;
        //}

        public async Task<ParentAppHomeworkResponseDto> GetAllHomeworkForStudent(ParentAppHomeworkRequestDto requestDto)
        {
            ParentAppHomeworkResponseDto homeworkParentAppSelectResponseDto = new ParentAppHomeworkResponseDto();

            using (IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString()))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
                parameters.Add("@Month", requestDto.Month);
                parameters.Add("@Year", requestDto.Year);
                parameters.Add("@StudentId", requestDto.StudentId);

                using (var multiResultSet = await db.QueryMultipleAsync("uspHomeworkParentAppSelect", parameters, commandType: CommandType.StoredProcedure))
                {
                    var homeworkList = multiResultSet.Read<ParentAppHomeworkDto>().ToList();
                    var homeworkDetailList = multiResultSet.Read<ParentAppHomeworkDetailDto>().ToList();
                    var mediaContentList = multiResultSet.Read<ParentAppHomeworkMediaContentDto>().ToList();

                    // Assign homework details to respective homework items
                    homeworkList.ForEach(homework =>
                    {
                        homework.LstHomeworkDetail = homeworkDetailList.Where(x => x.HomeworkId == homework.HomeworkId).ToList();
                        homework.LstMediaVideoText = mediaContentList.Where(x => x.HomeworkId == homework.HomeworkId).ToList();
                    });

                    homeworkParentAppSelectResponseDto.HomeworkList = homeworkList;
                }
            }

            return homeworkParentAppSelectResponseDto;
        }

    }
}
