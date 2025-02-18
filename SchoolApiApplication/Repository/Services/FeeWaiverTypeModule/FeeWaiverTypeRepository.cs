using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.Extensions;
using System.Data;
using SchoolApiApplication.Repository.Interfaces.FeeWavierTypeModule;
using SchoolApiApplication.DTO.FeeWavierTypeModule;
using Dapper;
using SchoolApiApplication.DTO.FeeWaiverTypeModule;
using SchoolApiApplication.Common;


namespace SchoolApiApplication.Repository.Services.FeeWavierTypeModule
{
    public class FeeWavierTypeRepository : IFeeWavierTypeRepository

    {
            private readonly IHttpContextAccessor _httpContextAccessor;
            public FeeWavierTypeRepository(IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
            }

        public async Task<CommonSuccessResponse> FeeWavierTypeUpsert(FeeWavierTypeUpsertDto FeeWavierTypeObj, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable feeWavierTypesInstallmentsDetailsTypeDT = new();
            feeWavierTypesInstallmentsDetailsTypeDT.Columns.Add(nameof(FeeWavierTypesInstallmentsDetailsTypeDto.FeeWavierTypesInstallmentsDetailsTypeId), typeof(long));
            feeWavierTypesInstallmentsDetailsTypeDT.Columns.Add(nameof(FeeWavierTypesInstallmentsDetailsTypeDto.LateFeeStartDate), typeof(DateTime));
            feeWavierTypesInstallmentsDetailsTypeDT.Columns.Add(nameof(FeeWavierTypesInstallmentsDetailsTypeDto.DiscountEndDate), typeof(DateTime));


            FeeWavierTypeObj.FeeWavierTypesInstallmentsDetailsTypes?.ForEach(item =>
            {
                var row = feeWavierTypesInstallmentsDetailsTypeDT.NewRow();
                row[nameof(FeeWavierTypesInstallmentsDetailsTypeDto.FeeWavierTypesInstallmentsDetailsTypeId)] = item.FeeWavierTypesInstallmentsDetailsTypeId;
                row[nameof(FeeWavierTypesInstallmentsDetailsTypeDto.LateFeeStartDate)] = item.LateFeeStartDate == null ? DBNull.Value : item.LateFeeStartDate;
                row[nameof(FeeWavierTypesInstallmentsDetailsTypeDto.DiscountEndDate)] = item.DiscountEndDate == null ? DBNull.Value : item.DiscountEndDate;
                feeWavierTypesInstallmentsDetailsTypeDT.Rows.Add(row);
            });

            var parameters = new DynamicParameters();
            parameters.Add("@FeeWavierTypeId", FeeWavierTypeObj.FeeWavierTypeId);
            parameters.Add("@AcademicYearId", FeeWavierTypeObj.AcademicYearId);
            parameters.Add("@FeeWavierTypeName", FeeWavierTypeObj.FeeWavierTypeName);
            parameters.Add("@FeeWavierTypeDisplayName", FeeWavierTypeObj.FeeWavierDisplayName);
            parameters.Add("@Description", FeeWavierTypeObj.Description);
            parameters.Add("@CategoryId", FeeWavierTypeObj.CategoryId);
            parameters.Add("@NumberOfInstallments", FeeWavierTypeObj.NumberOfInstallments);
            parameters.Add("@DiscountInPercent", FeeWavierTypeObj.DiscountInPercent);
            parameters.Add("@LatePerDayFeeInPercent", FeeWavierTypeObj.LatePerDayFeeInPercent);
            parameters.Add("@IsActive", FeeWavierTypeObj.IsActive);
            parameters.Add("@UserId", FeeWavierTypeObj.UserId);
            parameters.Add("@FeeWavierTypesInstallmentsDetailsType", feeWavierTypesInstallmentsDetailsTypeDT.AsTableValuedParameter("[dbo].[FeeWavierTypesInstallmentsDetailsType]"));
            var result= await db.QueryFirstOrDefaultAsync<CommonSuccessResponse>("uspFeeWavierTypesUpsert", parameters, commandType: CommandType.StoredProcedure);
            return result ?? new CommonSuccessResponse();
        }


        public async Task<DatatableResponseModel> GetFeeWavierTypeGridList(DatatableRequestWrapper RequestWrapper)
            {
                DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
                string strRequestModel = JsonConvert.SerializeObject(RequestWrapper);
                using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                using (var connection = new SqlConnection(db.ConnectionString))
                {
                    using (var multi = await connection.QueryMultipleAsync("uspFeeWavierTypeGridSelect",
                        new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                    {
                        datatableResponseModel.recordsTotal = multi.Read<int>().First();
                        datatableResponseModel.data = multi.Read<FeeWavierTypeGridDto>()?.ToList();
                        datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                    }
                }
                return datatableResponseModel;

            }

        public async Task<FeeWavierTypeSelectDto> GetFeeWavierTypeSelect(long FeeWavierTypeId, short AcademicYearId)
        {
               using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
                var parameters = new DynamicParameters();
                parameters.Add("@FeeWavierTypeId", FeeWavierTypeId);
                parameters.Add("@AcademicYearId", AcademicYearId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeeWavierTypeSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                var result = multiResultSet.Read<FeeWavierTypeSelectDto>().FirstOrDefault();
                if (result != null)
                {
                    var feeWavierTypesInstallmentsDetailsTypeResult = multiResultSet.Read<FeeWavierTypesInstallmentsDetailsTypeDto>()?.ToList();
                    result.FeeWavierTypesInstallmentsDetailsTypes = feeWavierTypesInstallmentsDetailsTypeResult ?? new List<FeeWavierTypesInstallmentsDetailsTypeDto>();
                    var installmentUsedList = multiResultSet.Read<long>()?.ToList();
                    result.IsInstallmentUsedInFeePayment = installmentUsedList != null && installmentUsedList.Any(x=>x > 0) ? true : false ;
                }
                return result??new FeeWavierTypeSelectDto();
            }
            
        }

        public async Task<FeeWavierTypeDeleteResponseDto> FeeWavierTypeDelete(long FeeWavierTypeId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@FeeWavierTypeId", FeeWavierTypeId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<FeeWavierTypeDeleteResponseDto>("uspFeeWavierTypeDelete", parameters, commandType: CommandType.StoredProcedure);

        }
    }
    }
        
    
    


