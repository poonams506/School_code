using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.DivisionModule;
using SchoolApiApplication.DTO.FeeparticularModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.FeeWavierTypeModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.FeeparticularModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.FeeparticularModule
{
    public class FeeParticularRepository : IFeeParticularRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FeeParticularRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DatatableResponseModel> GetFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var multi = await db.QueryMultipleAsync("uspFeeParticularGridSelect", new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
            {
                datatableResponseModel.recordsTotal = multi.Read<int>().First();
                datatableResponseModel.data = multi.Read<FeeParticularGridDto>()?.ToList();
                datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
            }

            return datatableResponseModel;
        }
        public async Task<FeeStructureDto> GetFeeParticularSelect(int ClassId, int AcademicYearId)
        {
            FeeStructureDto FeeParticularSelectDto = new FeeStructureDto();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ClassId", ClassId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeeParticularSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var gradeDivisionResult = multiResultSet.Read<FeeStructureGradeDivisionDBDto>()?.ToList();
                if (gradeDivisionResult != null && gradeDivisionResult.Any())
                {
                    FeeParticularSelectDto.AcademicYearId = AcademicYearId;
                    
                    FeeParticularSelectDto.GradeId = gradeDivisionResult[0].GradeId;
                    FeeParticularSelectDto.DivisionId = new List<int> { gradeDivisionResult[0].DivisionId };
                    FeeParticularSelectDto.GradeName = gradeDivisionResult[0].GradeName;
                    FeeParticularSelectDto.DivisionName = gradeDivisionResult[0].DivisionName;
                    FeeParticularSelectDto.ClassId = new List<int> { gradeDivisionResult[0].ClassId??0 };
                    FeeParticularSelectDto.ClassName = gradeDivisionResult[0].ClassName;

                    var feeParticularResult = multiResultSet.Read<FeeParticularsDto>()?.ToList();
                    if (feeParticularResult != null && feeParticularResult.Count > 0)
                    {
                        FeeParticularSelectDto.IsPublish = feeParticularResult[0].IsPublish;
                    }
                    var feeWaiverResult = multiResultSet.Read<FeeWaiverDto>()?.ToList();
                    var installmentDetails = multiResultSet.Read<FeeWaiverDto>()?.ToList();
                    FeeParticularSelectDto.FeeParticulars = feeParticularResult ?? new List<FeeParticularsDto>();
                    FeeParticularSelectDto.FeeParticularWaiverMappings = feeWaiverResult ?? new List<FeeWaiverDto>();
                    FeeParticularSelectDto.InstallmentDetails = installmentDetails ?? new List<FeeWaiverDto>();

                }


            }
            return FeeParticularSelectDto;
        }
        public async Task<int> FeeParticularInsert(FeeStructureDto FeeParticularInsertObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());


            DataTable feeParticularDT = new();
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.FeeParticularId), typeof(int));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.ParticularName), typeof(string));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.Amount), typeof(decimal));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.IsDiscountApplicable), typeof(bool));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.IsRTEApplicable), typeof(bool));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.SortBy), typeof(int));
            FeeParticularInsertObj.FeeParticulars?.ForEach(feeParticular =>
            {
                var row = feeParticularDT.NewRow();
                row[nameof(FeeParticularsDto.FeeParticularId)] = feeParticular.FeeParticularId;
                row[nameof(FeeParticularsDto.ParticularName)] = feeParticular.ParticularName;
                row[nameof(FeeParticularsDto.Amount)] = feeParticular.Amount;
                row[nameof(FeeParticularsDto.IsDiscountApplicable)] = feeParticular.IsDiscountApplicable;
                row[nameof(FeeParticularsDto.IsRTEApplicable)] = feeParticular.IsRTEApplicable;
                row[nameof(FeeParticularsDto.SortBy)] = feeParticular.SortBy;
                feeParticularDT.Rows.Add(row);
            });

            DataTable wavierMappingDT = new();
            wavierMappingDT.Columns.Add(nameof(FeeParticularWaiverMappingsDto.FeeParticularWavierMappingId), typeof(long));
            wavierMappingDT.Columns.Add(nameof(FeeParticularWaiverMappingsDto.FeeWavierTypeId), typeof(long));
            var feeWaiversToSave = FeeParticularInsertObj.FeeParticularWaiverMappings?.Where(x => x.IsAlreadyAdded).ToList();
            if (feeWaiversToSave?.Count > 0)
            {
                feeWaiversToSave.ForEach(waiverMapping =>
                {
                    var row = wavierMappingDT.NewRow();
                    row[nameof(FeeParticularWaiverMappingsDto.FeeParticularWavierMappingId)] = 0;
                    row[nameof(FeeParticularWaiverMappingsDto.FeeWavierTypeId)] = waiverMapping.FeeWavierTypeId;

                    wavierMappingDT.Rows.Add(row);
                });
            }
            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(int));

            FeeParticularInsertObj.ClassId.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });

            var parameters = new
            {
                FeeParticularInsertObj.AcademicYearId,
                FeeParticularInsertObj.IsPublish,
                UserId,
                ClassId = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]"),
                FeeParticulars = feeParticularDT.AsTableValuedParameter("[dbo].[FeeParticularType]"),
                FeeParticularWavierMappingTypes = wavierMappingDT.AsTableValuedParameter("[dbo].[FeeParticularWavierMappingType]")

            };
            return await db.ExecuteAsync("uspFeeParticularInsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> FeeParticularUpdate(FeeStructureDto FeeParticularUpdateObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable feeParticularDT = new();
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.FeeParticularId), typeof(int));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.ParticularName), typeof(string));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.Amount), typeof(decimal));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.IsDiscountApplicable), typeof(bool));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.IsRTEApplicable), typeof(bool));
            feeParticularDT.Columns.Add(nameof(FeeParticularsDto.SortBy), typeof(int));

            FeeParticularUpdateObj.FeeParticulars?.ForEach(feeParticular =>
            {
                var row = feeParticularDT.NewRow();
                row[nameof(FeeParticularsDto.FeeParticularId)] = feeParticular.FeeParticularId;
                row[nameof(FeeParticularsDto.ParticularName)] = feeParticular.ParticularName;
                row[nameof(FeeParticularsDto.Amount)] = feeParticular.Amount;
                row[nameof(FeeParticularsDto.IsDiscountApplicable)] = feeParticular.IsDiscountApplicable;
                row[nameof(FeeParticularsDto.IsRTEApplicable)] = feeParticular.IsRTEApplicable;
                row[nameof(FeeParticularsDto.SortBy)] = feeParticular.SortBy;
                feeParticularDT.Rows.Add(row);
            });


            DataTable wavierMappingDT = new();
            wavierMappingDT.Columns.Add(nameof(FeeParticularWaiverMappingsDto.FeeParticularWavierMappingId), typeof(long));
            wavierMappingDT.Columns.Add(nameof(FeeParticularWaiverMappingsDto.FeeWavierTypeId), typeof(long));

            var feeWaiversToSave = FeeParticularUpdateObj.FeeParticularWaiverMappings?.Where(x => x.IsAlreadyAdded).ToList();
            if (feeWaiversToSave?.Count > 0)
            {
                feeWaiversToSave.ForEach(waiverMapping =>
                {
                    var row = wavierMappingDT.NewRow();
                    row[nameof(FeeParticularWaiverMappingsDto.FeeParticularWavierMappingId)] = waiverMapping.FeeParticularWavierMappingId;
                    row[nameof(FeeParticularWaiverMappingsDto.FeeWavierTypeId)] = waiverMapping.FeeWavierTypeId;

                    wavierMappingDT.Rows.Add(row);
                });
            }

            var ClassId = FeeParticularUpdateObj.ClassId?.FirstOrDefault();
            var parameters = new
            {
                FeeParticularUpdateObj.AcademicYearId,
                ClassId,
                FeeParticularUpdateObj.IsPublish,
                UserId,
                FeeParticulars = feeParticularDT.AsTableValuedParameter("[dbo].[FeeParticularType]"),
                FeeParticularWavierMappingTypes = wavierMappingDT.AsTableValuedParameter("[dbo].[FeeParticularWavierMappingType]"),
            };
            return await db.ExecuteAsync("uspFeeParticularUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<FeeWaiverResponseDto> GetAllApplicableWaiverData(int AcademicYearId)
        {
            FeeWaiverResponseDto FeeWaiverDto = new FeeWaiverResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeeWaiverTypeSelectAllByAcademic", parameters, commandType: CommandType.StoredProcedure))
            {
                var feeWaivers = await multiResultSet.ReadAsync<FeeWaiverDto>();
                var installmentDetails = await multiResultSet.ReadAsync<FeeWaiverDto>();
                FeeWaiverDto.FeeWaivers = feeWaivers.ToList();
                FeeWaiverDto.InstallmentDetails = installmentDetails.ToList();
            }
            return FeeWaiverDto;
        }

        public async Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionFeeParticularMasterList(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new
            {
                AcademicYearId,
            };
            var schoolGradeDivisionMatrixCascadeList = await db.QueryAsync<SchoolGradeDivisionMatrixWithDisabledDto>("uspGradeDivisionMatrixForFeesStructureCascadeSelect", parameters, commandType: CommandType.StoredProcedure);
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

        public async Task<int> PublishUnpublishGradeDivisionParticulars(PublishUnpublishParticularDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new
            {
                publishRequest.AcademicYearId,
                publishRequest.GradeId,
                publishRequest.DivisionId,
                publishRequest.IsPublish,
                UserId

            };
            return await db.ExecuteAsync("uspFeeParticularIsPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> FeeParticularClone(FeeParticularCloneDto cloneRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(int));

            cloneRequest.ToClassId.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });

            var parameters = new
            {
                cloneRequest.AcademicYearId,
                cloneRequest.FromClassId,
                ToClassId = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]"),
                UserId

            };
            return await db.ExecuteAsync("uspFeeParticularClone", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> FeeParticularDelete(int GradeId, int DivisionId, int academicYearId,int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspFeeParticularDelete", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> CopyFeeParticularsFromLastAY(int GradeId, int DivisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);

            return await db.QueryFirstOrDefaultAsync<int>("uspFeeParticularCopyFromLastAY", parameters, commandType: CommandType.StoredProcedure);

        }


        #region Student Kit Fee Structure
        public async Task<DatatableResponseModel> GetStudentKitFeeParticularGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var multi = await db.QueryMultipleAsync("uspStudentKitFeeParticularGridSelect", new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
            {
                datatableResponseModel.recordsTotal = multi.Read<int>().First();
                datatableResponseModel.data = multi.Read<FeeParticularGridDto>()?.ToList();
                datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
            }

            return datatableResponseModel;
        }
        public async Task<StudentKitFeeStructureDto> GetStudentKitFeeParticularByClassId(int ClassId, int AcademicYearId)
        {
            StudentKitFeeStructureDto FeeParticularSelectDto = new StudentKitFeeStructureDto();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@ClassId", ClassId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitFeeParticularSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var gradeDivisionResult = multiResultSet.Read<FeeStructureGradeDivisionDBDto>()?.ToList();
                if (gradeDivisionResult != null && gradeDivisionResult.Any())
                {
                    FeeParticularSelectDto.AcademicYearId = AcademicYearId;

                    FeeParticularSelectDto.GradeId = gradeDivisionResult[0].GradeId;
                    FeeParticularSelectDto.DivisionId = new List<int> { gradeDivisionResult[0].DivisionId };
                    FeeParticularSelectDto.GradeName = gradeDivisionResult[0].GradeName;
                    FeeParticularSelectDto.DivisionName = gradeDivisionResult[0].DivisionName;
                    FeeParticularSelectDto.ClassId = new List<int> { gradeDivisionResult[0].ClassId ?? 0 };
                    FeeParticularSelectDto.ClassName = gradeDivisionResult[0].ClassName;

                    var feeParticularResult = multiResultSet.Read<StudentKitFeeParticularsDto>()?.ToList();
                    if (feeParticularResult != null && feeParticularResult.Count > 0)
                    {
                        FeeParticularSelectDto.IsPublish = feeParticularResult[0].IsPublish;
                    }
                   FeeParticularSelectDto.FeeParticulars = feeParticularResult ?? new List<StudentKitFeeParticularsDto>();
                   
                }
            }
            return FeeParticularSelectDto;
        }

        public async Task<int> StudentKitFeeParticularInsert(StudentKitFeeStructureDto FeeParticularInsertObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());


            DataTable feeParticularDT = new();
            feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.FeeParticularId), typeof(int));
            feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.ParticularName), typeof(string));
            feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.Amount), typeof(decimal));
            feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.SortBy), typeof(int));
            FeeParticularInsertObj.FeeParticulars?.ForEach(feeParticular =>
            {
                var row = feeParticularDT.NewRow();
                row[nameof(StudentKitFeeParticularsDto.FeeParticularId)] = feeParticular.FeeParticularId;
                row[nameof(StudentKitFeeParticularsDto.ParticularName)] = feeParticular.ParticularName;
                row[nameof(StudentKitFeeParticularsDto.Amount)] = feeParticular.Amount;
                row[nameof(StudentKitFeeParticularsDto.SortBy)] = feeParticular.SortBy;
                feeParticularDT.Rows.Add(row);
            });

           
            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(int));

            FeeParticularInsertObj.ClassId.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });

            var parameters = new
            {
                FeeParticularInsertObj.AcademicYearId,
                FeeParticularInsertObj.IsPublish,
                UserId,
                ClassId = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]"),
                FeeParticulars = feeParticularDT.AsTableValuedParameter("[dbo].[StudentKitFeeParticularType]"),
               
            };
            return await db.ExecuteAsync("uspStudentKitFeeParticularInsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> StudentKitFeeParticularUpdate(StudentKitFeeStructureDto FeeParticularUpdateObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable feeParticularDT = new();
            feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.FeeParticularId), typeof(int));
            feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.ParticularName), typeof(string));
            feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.Amount), typeof(decimal));
           feeParticularDT.Columns.Add(nameof(StudentKitFeeParticularsDto.SortBy), typeof(int));

            FeeParticularUpdateObj.FeeParticulars?.ForEach(feeParticular =>
            {
                var row = feeParticularDT.NewRow();
                row[nameof(FeeParticularsDto.FeeParticularId)] = feeParticular.FeeParticularId;
                row[nameof(FeeParticularsDto.ParticularName)] = feeParticular.ParticularName;
                row[nameof(FeeParticularsDto.Amount)] = feeParticular.Amount;
                row[nameof(FeeParticularsDto.SortBy)] = feeParticular.SortBy;
                feeParticularDT.Rows.Add(row);
            });


            var ClassId = FeeParticularUpdateObj.ClassId?.FirstOrDefault();
            var parameters = new
            {
                FeeParticularUpdateObj.AcademicYearId,
                ClassId,
                FeeParticularUpdateObj.IsPublish,
                UserId,
                FeeParticulars = feeParticularDT.AsTableValuedParameter("[dbo].[StudentKitFeeParticularType]"),
            };
            return await db.ExecuteAsync("uspStudentKitFeeParticularUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<GradeDivisionWithDisabledCommonMasterDto> GetGradeDivisionStudentKitFeeParticularMasterList(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new
            {
                AcademicYearId,
            };
            var schoolGradeDivisionMatrixCascadeList = await db.QueryAsync<SchoolGradeDivisionMatrixWithDisabledDto>("uspGradeDivisionMatrixForStudentKitFeesStructureCascadeSelect", parameters, commandType: CommandType.StoredProcedure);
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


        public async Task<int> PublishUnpublishGradeDivisionStudentKitParticulars(PublishUnpublishParticularDto publishRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new
            {
                publishRequest.AcademicYearId,
                publishRequest.GradeId,
                publishRequest.DivisionId,
                publishRequest.IsPublish,
                UserId

            };
            return await db.ExecuteAsync("uspStudentKitFeeParticularIsPublishUpdate", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> StudentKitFeeParticularClone(FeeParticularCloneDto cloneRequest, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(int));

            cloneRequest.ToClassId.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });

            var parameters = new
            {
                cloneRequest.AcademicYearId,
                cloneRequest.FromClassId,
                ToClassId = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]"),
                UserId

            };
            return await db.ExecuteAsync("uspStudentKitFeeParticularClone", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> StudentKitFeeParticularDelete(int GradeId, int DivisionId, int academicYearId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspStudentKitFeeParticularDelete", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<int> CopyStudentKitFeeParticularsFromLastAY(int GradeId, int DivisionId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);

            return await db.QueryFirstOrDefaultAsync<int>("uspStudentKitFeeParticularCopyFromLastAY", parameters, commandType: CommandType.StoredProcedure);

        }


        #endregion
    }
}

