using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.CBSE_ExamModule;
using SchoolApiApplication.DTO.CBSE_ExamResultModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.SubjectMappingModule;
using SchoolApiApplication.DTO.SubjectMasterModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SubjectMappingModule;
using System.Data;
using System.Data.Common;

namespace SchoolApiApplication.Repository.Services.SubjectMappingModule
{
    public class SubjectMappingRepository : ISubjectMappingRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SubjectMappingRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DatatableResponseModel> GetSubjectMappingList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSubjectMappingGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    // datatableResponseModel.data = multi.Read<SubjectMappingDto>()?.ToList();
                    var subjectList = multi.Read<SubjectMappingDto>()?.ToList();
                    foreach (var row in subjectList)
                    {
                        row.AcademicYearId = requestObjectWrapper.academicYearId ?? 0;
                        if (!string.IsNullOrEmpty(row.SubjectMasterIds))
                        {
                            row.SubjectList = row.SubjectMasterIds.Split(",").Where(x => !string.IsNullOrEmpty(x)).Select(y => Int32.Parse(y)).ToList();
                        }
                    }
                    datatableResponseModel.data = subjectList;
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<SubjectMappingDto> GetSubjectMasterDropDown()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var subjectDropdownList = await db.QueryAsync<SubjectMasterDropdownDto>("uspSubjectMasterDropdown", commandType: CommandType.StoredProcedure);
            SubjectMappingDto responseDto = new SubjectMappingDto();
            if (subjectDropdownList != null && subjectDropdownList.Any())
            {
                responseDto.SubjectDropdownList = subjectDropdownList.ToList();
            }
            return responseDto;
        }

        public async Task<List<SubjectExistResposeDto>> SubjectMappingInsert(SubjectMappingDto subjectMappingObj, int UserId, int academicYearId, int gradeId, int divisionId)

        {
            List<SubjectExistResposeDto> existResponse = new List<SubjectExistResposeDto>();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable fileDT = new();
            fileDT.Columns.Add(nameof(SubjectMappingTypeDto.SubjectMasterId), typeof(int));

            subjectMappingObj.SubjectList?.ForEach(subjectMasterId =>
            {
                var row = fileDT.NewRow();
                row[nameof(SubjectMappingTypeDto.SubjectMasterId)] = subjectMasterId;
                fileDT.Rows.Add(row);
            });

            var parameters = new
            {
                subjectMappingObj.SubjectMappingId,
                subjectMappingObj.AcademicYearId,
                subjectMappingObj.GradeId,
                subjectMappingObj.DivisionId,
                UserId,
                Subject = fileDT.AsTableValuedParameter(" [dbo].[SubjectMappingType]"),

            };


            var success = await db.ExecuteAsync("uspSubjectMappingUpsert", parameters, commandType: CommandType.StoredProcedure);
            existResponse.ForEach(item => item.Success = success);

            return existResponse;

        }

        public async Task<List<SubjectExistResposeDto>> SubjectMappingDelete(int UserId, int academicYearId, int gradeId, int divisionId, int subjectId)

        {
            var canTrigger = true;
            List<SubjectExistResposeDto> existResponse = new List<SubjectExistResposeDto>();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            var parameters = new
            {
                AcademicYearId = academicYearId,
                GradeId = gradeId,
                DivisionId = divisionId,
                SubjectId = subjectId

            };

            using (var multiResultSet = await db.QueryMultipleAsync("uspCheckExistSubject", parameters, commandType: CommandType.StoredProcedure))
            {

                existResponse = multiResultSet.Read<SubjectExistResposeDto>()?.ToList();

            }
            if (existResponse != null)
            {
                canTrigger = existResponse.All(item => item.ExistsInHomeWork != 1 && item.ExistsInClassTimeTable != 1);
            }

            if (canTrigger)
            {
                var success = await db.ExecuteAsync("uspSubjectMappingDelete", parameters, commandType: CommandType.StoredProcedure);
            }

            return existResponse;

        }

        public async Task<SubjectIndexNumberDetailsDto> SubjectIndexNumberDetailsSelect(int GradeId, int DivisionId, int AcademicYearId)
        {
            SubjectIndexNumberDetailsDto response = new SubjectIndexNumberDetailsDto();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", AcademicYearId);

            using (var multi = await db.QueryMultipleAsync("uspSubjectIndexNumberDetailsSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var generalDetails = await multi.ReadFirstOrDefaultAsync<SubjectIndexNumberDetailsDto>();
                if (generalDetails != null)
                {
                    response = generalDetails;
                }

                response.SubjectMasterIndexList = (await multi.ReadAsync<SubjectMasterIndexTypeDto>()).ToList();
            }

            return response;
        }

        //public async Task<int> UpsertSubjectIndexNumberDetails(UpsertSubjectIndexNumberDetailsDto obj, int UserId)
        //{
        //    using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
        //    DataTable subjectIndexNumberContentDT = new();

        //    subjectIndexNumberContentDT.Columns.Add(nameof(SubjectMasterIndexTypeDto.SubjectMasterId), typeof(long));
        //    subjectIndexNumberContentDT.Columns.Add(nameof(SubjectMasterIndexTypeDto.IndexNumber), typeof(int));
        //    subjectIndexNumberContentDT.Columns.Add(nameof(SubjectMasterIndexTypeDto.SubjectName), typeof(string));

        //    obj.SubjectIndexNumbersListUpsert?.ForEach(SubjectIndexNumber =>
        //    {
        //        var row = subjectIndexNumberContentDT.NewRow();
        //        row[nameof(SubjectMasterIndexTypeDto.SubjectMasterId)] = SubjectIndexNumber.SubjectMasterId;
        //        row[nameof(SubjectMasterIndexTypeDto.IndexNumber)] = SubjectIndexNumber.IndexNumber;
        //        row[nameof(SubjectMasterIndexTypeDto.SubjectName)] = SubjectIndexNumber.SubjectName;

        //        subjectIndexNumberContentDT.Rows.Add(row);
        //    });

        //    var parameters = new
        //    {
        //        obj.SubjectMappingId,
        //        obj.GradeId,
        //        obj.DivisionId,
        //        obj.AcademicYearId,
        //        UserId,
        //        SubjectDetails = subjectIndexNumberContentDT.AsTableValuedParameter("[dbo].[SubjectMasterIndexType]")
        //    };

        //    return await db.ExecuteAsync("uspUpsertSubjectIndexNumberDetails", parameters, commandType: CommandType.StoredProcedure);
        //}



        public async Task<string> UpsertSubjectIndexNumberDetails(UpsertSubjectIndexNumberDetailsDto obj, int UserId)
        {
            List<DuplicateCheckResultResponswDto> existResponse = new List<DuplicateCheckResultResponswDto>();

            using (IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString()))
            {
                DataTable subjectIndexNumberContentDT = new DataTable();
                subjectIndexNumberContentDT.Columns.Add(nameof(SubjectMasterIndexTypeDto.SubjectMasterId), typeof(long));
                subjectIndexNumberContentDT.Columns.Add(nameof(SubjectMasterIndexTypeDto.IndexNumber), typeof(int));
                subjectIndexNumberContentDT.Columns.Add(nameof(SubjectMasterIndexTypeDto.SubjectName), typeof(string));

                obj.SubjectIndexNumbersListUpsert?.ForEach(SubjectIndexNumber =>
                {
                    var row = subjectIndexNumberContentDT.NewRow();
                    row[nameof(SubjectMasterIndexTypeDto.SubjectMasterId)] = SubjectIndexNumber.SubjectMasterId;
                    row[nameof(SubjectMasterIndexTypeDto.IndexNumber)] = SubjectIndexNumber.IndexNumber;
                    row[nameof(SubjectMasterIndexTypeDto.SubjectName)] = SubjectIndexNumber.SubjectName;
                    subjectIndexNumberContentDT.Rows.Add(row);
                });

                var parameters2 = new
                {
                    obj.GradeId,
                    obj.DivisionId,
                    obj.AcademicYearId,
                    SubjectDetails = subjectIndexNumberContentDT.AsTableValuedParameter("[dbo].[SubjectMasterIndexType]")
                };

                using (var multiResultSet = await db.QueryMultipleAsync("uspCheckSubjectIndexNumberExists", parameters2, commandType: CommandType.StoredProcedure))
                {
                    existResponse = multiResultSet.Read<DuplicateCheckResultResponswDto>()?.ToList() ?? new List<DuplicateCheckResultResponswDto>();
                }

                if (existResponse.Any(item => item.IsDuplicate == 1))
                {
                    var duplicateSubjects = existResponse.Where(item => item.IsDuplicate == 1)
                                                         .Select(item => item.SubjectName)
                                                         .ToList();

                    return $"Duplicate subject names found: {string.Join(", ", duplicateSubjects)}";
                }

                var parameters = new
                {
                    obj.SubjectMappingId,
                    obj.GradeId,
                    obj.DivisionId,
                    obj.AcademicYearId,
                    UserId,
                    SubjectDetails = subjectIndexNumberContentDT.AsTableValuedParameter("[dbo].[SubjectMasterIndexType]")
                };

                await db.QueryFirstOrDefaultAsync("uspUpsertSubjectIndexNumberDetails", parameters, commandType: CommandType.StoredProcedure);

                return "Success"; 
            }
        }

        public async Task<int> SubjectMappingCloneDetails(SubjectMappingCloneDto cloneRequest, int userId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(int));
            cloneRequest.ToClassId.ForEach(id =>
            {
                DataRow row = selectedIdTable.NewRow();
                row["Id"] = id;
                selectedIdTable.Rows.Add(row);
            });

            var parameters = new
            {
                cloneRequest.AcademicYearId,
                cloneRequest.FromClassId,
                ToClassId = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]"),
                UserId = userId
            };

            return await db.ExecuteAsync("uspSubjectMappingClone", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionSubjectMappingMasterList(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new
            {
                AcademicYearId,
            };
            var schoolGradeDivisionMatrixCascadeList = await db.QueryAsync<SchoolGradeDivisionMatrixWithDisabledDto>("uspGradeDivisionMatrixForSubjectMappingCascadeSelect", parameters, commandType: CommandType.StoredProcedure);
            using (var multiResultSet = await db.QueryMultipleAsync("uspGradeDivisionMasterSelect", commandType: CommandType.StoredProcedure))
            {
                var gradeList = await multiResultSet.ReadAsync<Grade>();
                var divisionList = await multiResultSet.ReadAsync<CommonDivisionWithDisabled>();
                return new GradeDivisionWithDisabledCommonMasterDto()
                {
                    Grades = gradeList?.ToList(),
                    Divisions = divisionList?.ToList(),
                    SchoolGradeDivisionMatrixCascadeList = schoolGradeDivisionMatrixCascadeList?.ToList()
                };
            }
        }
    }



}