using Azure;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.GalleryModule;
using SchoolApiApplication.DTO.GradeModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.StudentModule;
using SchoolApiApplication.DTO.SubjectMasterModule;
using SchoolApiApplication.DTO.TeacherGradeDivisionMappingModule;
using SchoolApiApplication.DTO.TeacherSubjectMapping;
using SchoolApiApplication.DTO.TransportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.CBSE_ExamModule;
using System.Data;
using static Google.Apis.Requests.BatchRequest;

namespace SchoolApiApplication.Repository.Services.CBSE_ExamModule 
{
    public class CBSE_ExamObjectRepository : ICBSE_ExamObjectRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CBSE_ExamObjectRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ExamObjectDeleteRespose> CBSE_ExamObjectDelete(long? ExamMasterId, long SubjectMasterId, int AcademicYearId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamMasterId", ExamMasterId);
            parameters.Add("@SubjectMasterId", SubjectMasterId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<ExamObjectDeleteRespose>("uspExamObjectDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<DatatableResponseModel> CBSE_ExamObjectGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspExamObjectGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<CBSE_ExamObjectDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<ExamMasterDeleteResponceDto> CBSE_ExamMasterDelete(long? ExamMasterId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamMasterId", ExamMasterId);

            var parameters1 = new DynamicParameters();
            parameters1.Add("@ExamMasterId", ExamMasterId);
            parameters1.Add("@UserId", UserId);
            //return await db.QueryFirstOrDefaultAsync<ExamMasterDeleteResponceDto>("uspExamMasterDelete", parameters1, commandType: CommandType.StoredProcedure);
            var result = await db.QueryFirstOrDefaultAsync<ExamMasterDeleteResponceDto>("uspCheckExamExist", parameters, commandType: CommandType.StoredProcedure);

            if (result.ExamMappingCount == 0 && result.ExamObjectCount == 0)
            {
                return await db.QueryFirstOrDefaultAsync<ExamMasterDeleteResponceDto>("uspExamMasterDelete", parameters1, commandType: CommandType.StoredProcedure);
            }

            return result;

        }

        public async Task<DatatableResponseModel> CBSE_ExamMasterGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspExamMasterGridSelect",
                    new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {

                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<CBSE_ExamMasterDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }

            return datatableResponseModel;
        }

        public async Task<CBSE_ExamMasterDto> CBSE_ExamMasterSelect(int ExamMasterId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamMasterId", ExamMasterId);
            return await db.QueryFirstOrDefaultAsync<CBSE_ExamMasterDto>("uspExamMasterSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> CBSE_ExamMasterUpsert(CBSE_ExamMasterDto obj, int UserId, int AcademicYearId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamMasterId", obj.ExamMasterId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ExamTypeId", obj.ExamTypeId);
            parameters.Add("@TermId", obj.TermId);
            parameters.Add("@ExamName", obj.ExamName);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspExamMasterUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> CBSE_ClassExamMappingDelete(long? examMasterId, int academicYearId, int gradeId, int divisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@examMasterId", examMasterId);
            parameters.Add("@academicYearId", academicYearId);
            parameters.Add("@gradeId", gradeId);
            parameters.Add("@divisionId", divisionId);
            return await db.QueryFirstOrDefaultAsync<int>("uspClassExamMappingDelete", parameters, commandType: CommandType.StoredProcedure);
        }
 
        public async Task<DatatableResponseModel> CBSE_ClassExamMappingGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspClassExamMappingGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    var ClassList = multi.Read<CBSE_ClassExamMappingDto>()?.ToList();
                    foreach (var row in ClassList)
                    {
                        row.AcademicYearId = requestObjectWrapper.academicYearId ?? 0;
                        if (!string.IsNullOrEmpty(row.ClassIds))
                        {
                            row.ClassList = row.ClassIds.Split(",").Where(x => !string.IsNullOrEmpty(x)).Select(y => Int32.Parse(y)).ToList();
                        }
                    }
                    datatableResponseModel.data = ClassList;
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<CBSE_ClassExamMappingDto> CBSE_ClassExamMappingSelect(int ClassExamMappingId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ClassExamMappingId", ClassExamMappingId);
            return await db.QueryFirstOrDefaultAsync<CBSE_ClassExamMappingDto>("uspClassExamMappingSelect", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> CBSE_ClassExamMappingUpsert(CBSE_ClassExamMappingDto obj, int userId, int academicYearId, int examMasterId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable classIdDT = new();
            classIdDT.Columns.Add(nameof(ClassSelectDto.Id), typeof(int));

            obj.ClassList?.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row[nameof(ClassSelectDto.Id)] = Id;
                classIdDT.Rows.Add(row);
            });

            var parameters = new
            {
                obj.ClassExamMappingId,
                obj.ExamMasterId,
                obj.AcademicYearId,
                userId,
                ClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
               
            };

            return await db.ExecuteAsync("uspClassExamMappingUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

      

        public async Task<CBSE_ExamNameResponseDto> CBSE_ExamNameSelect(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var ExamNameList = await db.QueryAsync<CBSE_ExamNameSelectDto>("uspExamMasterDropdown",parameters, commandType: CommandType.StoredProcedure);
            CBSE_ExamNameResponseDto responseDto = new CBSE_ExamNameResponseDto();
            if (ExamNameList != null && ExamNameList.Any())
            {
                responseDto.ExamNameList = ExamNameList.ToList();
            }
            return responseDto;
        }

        public async Task<CBSE_ExamObjectDto> CBSE_ExamObjectSelect(long ExamMasterId, int SubjectMasterId, int AcademicYearId)
        {
            CBSE_ExamObjectDto response = new CBSE_ExamObjectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamMasterId", ExamMasterId);
            parameters.Add("@SubjectMasterId", SubjectMasterId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspExamObjectSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                response=multiResultSet.Read<CBSE_ExamObjectDto>().First();
                response.ObjectNameDetailsList = multiResultSet.Read<ExamObjectTypeDetailsDto>()?.ToList() ?? new List<ExamObjectTypeDetailsDto>();
                return response;
            }
        }


        public async Task<ExamObjectExistResponseDto> CBSE_ExamObjectUpsert(CBSE_ExamObjectDto obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            ExamObjectExistResponseDto examObjectExistResponseDto = new ExamObjectExistResponseDto();
            DataTable examObjectContentDT = new();

            // Define columns for the table-valued parameter
            examObjectContentDT.Columns.Add(nameof(ExamObjectTypeDetailsDto.ExamObjectId), typeof(long));
            examObjectContentDT.Columns.Add(nameof(ExamObjectTypeDetailsDto.ObjectName), typeof(string));
            examObjectContentDT.Columns.Add(nameof(ExamObjectTypeDetailsDto.OutOfMarks), typeof(int));

            // Populate the table with data
            obj.ObjectNameDetailsList?.ForEach(examObject =>
            {
                var row = examObjectContentDT.NewRow();
                row[nameof(ExamObjectTypeDetailsDto.ExamObjectId)] = examObject.ExamObjectId;
                row[nameof(ExamObjectTypeDetailsDto.ObjectName)] = examObject.ObjectName;
                row[nameof(ExamObjectTypeDetailsDto.OutOfMarks)] = examObject.OutOfMarks;
                examObjectContentDT.Rows.Add(row);
            });

            // Define the parameters for the 'uspExistExamObject' procedure
            var parameters2 = new
            {
                obj.ExamMasterId,
                obj.SubjectMasterId,
                obj.AcademicYearId,
                Objectdetails = examObjectContentDT.AsTableValuedParameter("[dbo].[CBSE_ExamObjectDetailType]"),
            };

            // Check for duplicate objects using 'uspExistExamObject'
            using (var multiResultSet = await db.QueryMultipleAsync("uspExistExamObject", parameters2, commandType: CommandType.StoredProcedure))
            {
                examObjectExistResponseDto.DublicateObjects = multiResultSet.Read<ExamObjectTypeDetailsDto>()?.ToList() ?? new List<ExamObjectTypeDetailsDto>();
                examObjectExistResponseDto.ObjectNames = string.Join(", ", examObjectExistResponseDto.DublicateObjects.Select(x => x.ObjectName));

                if (examObjectExistResponseDto.ObjectNames=="")
                {
                    examObjectExistResponseDto.ObjectExist =0;
                }
                else {
                    examObjectExistResponseDto.ObjectExist = examObjectExistResponseDto.DublicateObjects.Count();
                }
            }

            // If no duplicates, proceed with the upsert
            if (examObjectExistResponseDto.ObjectExist==0)
            {
                var parameters = new
                {
                    obj.ExamMasterId,
                    obj.SubjectMasterId,
                    obj.AcademicYearId,
                    Objectdetails = examObjectContentDT.AsTableValuedParameter("[dbo].[CBSE_ExamObjectDetailType]"),
                    UserId,
                };

                await db.ExecuteAsync("uspExamObjectUpsert", parameters, commandType: CommandType.StoredProcedure);
                return examObjectExistResponseDto;
            }

            // If duplicates exist, return them in the response

            return examObjectExistResponseDto;
        }



        public async Task<CBSE_ResponseDto> CBSE_ExamTypeNameSelect()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var ExamTypeNameList = await db.QueryAsync<CBSE_ExamTypeDto>("uspExamTypeSelect", commandType: CommandType.StoredProcedure);
            CBSE_ResponseDto responseDto = new CBSE_ResponseDto();
            if (ExamTypeNameList  != null && ExamTypeNameList.Any())
            {
                responseDto.ExamTypeList= ExamTypeNameList.ToList();
            }
            return responseDto;
        }

        public async Task<CBSE_ResponseDto> CBSE_TermNameSelect()
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var TermNameList = await db.QueryAsync<CBSE_TermDto>("uspTermSelect", commandType: CommandType.StoredProcedure);
            CBSE_ResponseDto responseDto = new CBSE_ResponseDto();
            if ( TermNameList.Any())
            {
                responseDto.TermList= TermNameList.ToList();
            }
            return responseDto;
        }

        public async Task<MarksGradeRelationDeleteRespose> CBSE_MarksGradeRelationDelete(long MarksGradeRelationId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@MarksGradeRelationId", MarksGradeRelationId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<MarksGradeRelationDeleteRespose>("uspCBSE_MarksGradeRelationDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<DatatableResponseModel> CBSE_MarksGradeRelationGridSelect(DatatableRequestWrapper requestObjectWrapper, int userId)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspCBSE_MarksGradeRelationGridSelect",
                    new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {

                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<CBSE_MarksGradeRelationDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }

            return datatableResponseModel;
        }

    
    public  async Task<CBSE_MarksGradeRelationDto> CBSE_MarksGradeRelationSelect(long MarksGradeRelationId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@MarksGradeRelationId", MarksGradeRelationId);
            return await db.QueryFirstOrDefaultAsync<CBSE_MarksGradeRelationDto>("uspCBSE_MarksGradeRelationSelect", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> CBSE_MarksGradeRelationUpsert(CBSE_MarksGradeRelationDto obj, int UserId, int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@MarksGradeRelationId", obj.MarksGradeRelationId);
            parameters.Add("@AcademicYearId",AcademicYearId);
            parameters.Add("@MinMark", obj.MinMark);
            parameters.Add("@MaxMark", obj.MaxMark);
            parameters.Add("@Grade", obj.Grade);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspCBSE_MarksGradeRelationUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> PublishUnpublishExamObjectParticular(PublishUnpublishExamObjectDto publishRequest, int UserId)
        {
            PublishUnpublishExamObjectDto PublishUnpublishExamObjectDto = new PublishUnpublishExamObjectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new DynamicParameters();
            parameters.Add("@ExamObjectId", publishRequest.ExamObjectId);
            parameters.Add("@IsPublished", publishRequest.IsPublished);
            parameters.Add("@UserId", UserId);


            return await db.ExecuteAsync("uspSchoolEventPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<ExamObjectDeleteResponseDto> CBSE_ObjectDelete(ExamObjectDeleteRequestDto obj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ExamObjectId", obj.ExamObjectId);
            parameters.Add("@ExamMasterId", obj.ExamMasterId);
            parameters.Add("@SubjectMasterId", obj.SubjectMasterId);
            parameters.Add("@AcademicYearId", obj.AcademicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<ExamObjectDeleteResponseDto>("uspObjectDelete", parameters, commandType: CommandType.StoredProcedure);
        }



        //public Task<int> CBSE_ExamObjectUpsert(CBSE_ExamObjectDto obj, int UserId)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
