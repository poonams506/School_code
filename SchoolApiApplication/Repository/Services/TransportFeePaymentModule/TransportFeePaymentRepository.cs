using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.TransportFeePaymentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.TransportFeePaymentModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.TransportFeePaymentModule
{
    public class TransportFeePaymentRepository : ITransportFeePaymentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TransportFeePaymentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetTransportFeePaymentDueListByAY(int consumerId, int roleId, bool currentAcademicYearInclude)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ConsumerId", consumerId);
            parameters.Add("@RoleId", roleId);
            parameters.Add("@CurrentAcademicYearInclude", currentAcademicYearInclude);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportFeePaymentDueByAYSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                datatableResponseModel.data = multiResultSet.Read<TransportFeePaymentStudentGridDto>().ToList();
            }
            return datatableResponseModel;
        }

        public async Task<DatatableResponseModel> GetTransportFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspTransportFeePaymentHistoryGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<TransportPaymentHistoryGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<TransportFeePaymentHistorySelectDto> GetTransportFeePaymentHistorySelect(int roleId, short academicYearId, long consumerId, long transportFeePaymentId, int transportConsumerStoppageMappingId)
        {
            var result = new TransportFeePaymentHistorySelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@ConsumerId", consumerId);
            parameters.Add("@RoleId", roleId);
            parameters.Add("@TransportFeePaymentId", transportFeePaymentId);
            parameters.Add("@TransportConsumerStoppageMappingId", transportConsumerStoppageMappingId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportFeePaymentHistorySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<TransportFeePaymentHistorySelectDto>().First();
                result.TransportFeeSelectList = multiResultSet.Read<TransportFeeSelectDto>().ToList();
                result.PaidMonthList = multiResultSet.Read<string>().ToList();
            }
            return result;
        }

        public async Task<TransportFeeMonthMastersDto> GetTransportFeePaymentMonths(int academicYearId, long consumerId, int roleId, int transportConsumerStoppageMappingId)
        {
            var result = new TransportFeeMonthMastersDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ConsumerId", consumerId);
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@RoleId", roleId);
            parameters.Add("@TransportConsumerStoppageMappingId", transportConsumerStoppageMappingId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportFeePaymentMonthMastersSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result.TransportFeeMonthMastersList = multiResultSet.Read<TransportFeeMonthMasterDto>().ToList();
            }
            return result;
        }

        public async Task<TransportFeePaymentStoppageGridDto> GetTransportFeePaymentStoppageGridLIst(int academicYearId, long consumerId, int roleId)
        {
            var result = new TransportFeePaymentStoppageGridDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@ConsumerId", consumerId);
            parameters.Add("@RoleId", roleId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportFeePaymentStoppageGridSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result.TransportFeePaymentStoppageDtoList = multiResultSet.Read<TransportFeePaymentStoppageDto>().ToList();
            }
            return result;
        }

        public async Task<TransportFeePaymentSelectDto> GetTransportFeePaymentSelect(int academicYearId, long consumerId, int roleId, int transportConsumerStoppageMappingId)
        {
            var result = new TransportFeePaymentSelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@ConsumerId", consumerId);
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@RoleId", roleId);
            parameters.Add("@TransportConsumerStoppageMappingId", transportConsumerStoppageMappingId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportFeePaymentSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<TransportFeePaymentSelectDto>().First();
                result.TransportFeePaymentAppliedMonthList = multiResultSet.Read<TransportFeePaymentAppliedMonths>().ToList();
                result.TransportFeePaymentAdditionalDiscountList = multiResultSet.Read<TransportFeePaymentAdditionalDiscount>().ToList();
                result.TransportFeePaymentParticularsList = multiResultSet.Read<TransportFeePaymentParticulars>().ToList();
            }
            return result;
        }

        public async Task<DatatableResponseModel> GetTransportFeePaymentStaffGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspTransportFeePaymentStaffGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<TransportFeePaymentStaffGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<DatatableResponseModel> GetTransportFeePaymentStudentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspTransportFeePaymentStudentGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<TransportFeePaymentStudentGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<bool> TransportClearCheque(long transportFeePaymentId, int userId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TransportFeePaymentId", transportFeePaymentId);
            parameters.Add("@UserId", userId);
            await db.ExecuteAsync("uspTransportFeePaymentChequeClear", parameters, commandType: CommandType.StoredProcedure);
            return true;
        }

        public async Task<int> TransportFeePaymentDelete(long transportFeePaymentId, int userId)
        {
            var result = 0;
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@TransportFeePaymentId", transportFeePaymentId);
            parameters.Add("@UserId", userId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportFeePaymentDelete", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<int>().First();
            }
            return result;
        }

        public async Task<int> TransportFeePaymentUpsert(TransportFeePaymentUpsertDto feeTransportPaymentUpsertDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable feeTransportPaymentAppliedMonthMappingTypeUpsertDT = new();
            feeTransportPaymentAppliedMonthMappingTypeUpsertDT.Columns.Add(nameof(TransportFeePaymentAppliedMonthMappingTypeUpsertDto.MonthMasterId), typeof(int));
            feeTransportPaymentAppliedMonthMappingTypeUpsertDT.Columns.Add(nameof(TransportFeePaymentAppliedMonthMappingTypeUpsertDto.DiscountedPercent), typeof(decimal));
            feeTransportPaymentAppliedMonthMappingTypeUpsertDT.Columns.Add(nameof(TransportFeePaymentAppliedMonthMappingTypeUpsertDto.DiscountedAmount), typeof(decimal));
            feeTransportPaymentUpsertDto.TransportFeePaymentAppliedMonthMappingTypeUpsertDtoList.ForEach(item =>
            {
                var row = feeTransportPaymentAppliedMonthMappingTypeUpsertDT.NewRow();
                row[nameof(TransportFeePaymentAppliedMonthMappingTypeUpsertDto.MonthMasterId)] = item.MonthMasterId;
                row[nameof(TransportFeePaymentAppliedMonthMappingTypeUpsertDto.DiscountedPercent)] = item.DiscountedPercent;
                row[nameof(TransportFeePaymentAppliedMonthMappingTypeUpsertDto.DiscountedAmount)] = item.DiscountedAmount;
                feeTransportPaymentAppliedMonthMappingTypeUpsertDT.Rows.Add(row);
            });

            DataTable feeTransportPaymentDetailTypeDT = new();
            feeTransportPaymentDetailTypeDT.Columns.Add(nameof(TransportFeePaymentDetailTypeUpsertDto.OtherFeeReason), typeof(string));
            feeTransportPaymentDetailTypeDT.Columns.Add(nameof(TransportFeePaymentDetailTypeUpsertDto.FeeAfterDiscount), typeof(decimal));
            feeTransportPaymentDetailTypeDT.Columns.Add(nameof(TransportFeePaymentDetailTypeUpsertDto.PaidAmount), typeof(decimal));
            feeTransportPaymentDetailTypeDT.Columns.Add(nameof(TransportFeePaymentDetailTypeUpsertDto.AdditionalDiscInPercentage), typeof(decimal));
            feeTransportPaymentDetailTypeDT.Columns.Add(nameof(TransportFeePaymentDetailTypeUpsertDto.AdditionalDiscAmount), typeof(decimal));
            feeTransportPaymentUpsertDto.TransportFeePaymentDetailTypeUpsertDtoList.ForEach(item =>
            {
                var row = feeTransportPaymentDetailTypeDT.NewRow();

                row[nameof(TransportFeePaymentDetailTypeUpsertDto.OtherFeeReason)] = item.OtherFeeReason;
                row[nameof(TransportFeePaymentDetailTypeUpsertDto.FeeAfterDiscount)] = item.FeeAfterDiscount;
                row[nameof(TransportFeePaymentDetailTypeUpsertDto.PaidAmount)] = item.PaidAmount;
                row[nameof(TransportFeePaymentDetailTypeUpsertDto.AdditionalDiscInPercentage)] = item.AdditionalDiscInPercentage;
                row[nameof(TransportFeePaymentDetailTypeUpsertDto.AdditionalDiscAmount)] = item.AdditionalDiscAmount;
                feeTransportPaymentDetailTypeDT.Rows.Add(row);
            });
            var parameters = new
            {
                AcademicYearId = feeTransportPaymentUpsertDto.AcademicYearId == null ? 0 : feeTransportPaymentUpsertDto.AcademicYearId,
                RoleId = feeTransportPaymentUpsertDto.RoleId == null ? 0 : feeTransportPaymentUpsertDto.RoleId,
                ConsumerId = feeTransportPaymentUpsertDto.ConsumerId == null ? 0 : feeTransportPaymentUpsertDto.ConsumerId,
                TransportConsumerStoppageMappingId = feeTransportPaymentUpsertDto.TransportConsumerStoppageMappingId == null ? 0 : feeTransportPaymentUpsertDto.TransportConsumerStoppageMappingId,
                OnlineTransactionId = feeTransportPaymentUpsertDto.OnlineTransactionId == null ? "" : feeTransportPaymentUpsertDto.OnlineTransactionId,
                OnlineTransactionDateTime = feeTransportPaymentUpsertDto.OnlineTransactionDateTime == null ? null : feeTransportPaymentUpsertDto.OnlineTransactionDateTime,
                OnlinePaymentRequest = feeTransportPaymentUpsertDto.OnlinePaymentRequest == null ? "" : feeTransportPaymentUpsertDto.OnlinePaymentRequest,
                OnlinePaymentResponse = feeTransportPaymentUpsertDto.OnlinePaymentResponse == null ? "" : feeTransportPaymentUpsertDto.OnlinePaymentResponse,
                PaidToBank = feeTransportPaymentUpsertDto.PaidToBank == null ? "" : feeTransportPaymentUpsertDto.PaidToBank,
                PaidAmount = feeTransportPaymentUpsertDto.PaidAmount == null ? 0 : feeTransportPaymentUpsertDto.PaidAmount,
                PaymentTypeId = feeTransportPaymentUpsertDto.PaymentTypeId == null ? 0 : feeTransportPaymentUpsertDto.PaymentTypeId,
                ChequeNumber = feeTransportPaymentUpsertDto.ChequeNumber == null ? "" : feeTransportPaymentUpsertDto.ChequeNumber,
                ChequeDate = feeTransportPaymentUpsertDto.ChequeDate == null ? null : feeTransportPaymentUpsertDto.ChequeDate,
                ChequeBank = feeTransportPaymentUpsertDto.ChequeBank == null ? "" : feeTransportPaymentUpsertDto.ChequeBank,
                ChequeAmount = feeTransportPaymentUpsertDto.ChequeAmount == null ? 0 : feeTransportPaymentUpsertDto.ChequeAmount,
                IsChequeClear = feeTransportPaymentUpsertDto.IsChequeClear == null ? false : feeTransportPaymentUpsertDto.IsChequeClear,
                Remark = feeTransportPaymentUpsertDto.Remark == null ? "" : feeTransportPaymentUpsertDto.Remark,
                AdditionalDiscountedAmount = feeTransportPaymentUpsertDto.AdditionalDiscountedAmount == null ? 0 : feeTransportPaymentUpsertDto.AdditionalDiscountedAmount,
                InstallmentPaybleFee = feeTransportPaymentUpsertDto.InstallmentPaybleFee == null ? 0 : feeTransportPaymentUpsertDto.InstallmentPaybleFee,
                AdditionalDiscountedRemark = feeTransportPaymentUpsertDto.AdditionalDiscountedRemark == null ? "" : feeTransportPaymentUpsertDto.AdditionalDiscountedRemark,
                UserId = feeTransportPaymentUpsertDto.UserId == null ? 0 : feeTransportPaymentUpsertDto.UserId,
                TransportFeePaymentAppliedMonthMapping = feeTransportPaymentAppliedMonthMappingTypeUpsertDT.AsTableValuedParameter("[dbo].[TransportFeePaymentAppliedMonthMappingType]"),
                TransportFeePaymentDetails = feeTransportPaymentDetailTypeDT.AsTableValuedParameter("[dbo].[TransportFeePaymentDetailType]"),

            };
            try
            {
                await db.ExecuteAsync("uspTransportFeePaymentUpsert", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
            return 1;
        }
        #region Transport Fee Payment Report

        public async Task<TransportPaymentReportDaywiseDto> GetDayWiseTransportPaymentReport(DateTime StartDate, DateTime EndDate)
        {
            var result = new TransportPaymentReportDaywiseDto();
            result.CashDaywiseTransportPaymentReport = new CashDaywiseTransportPaymentReport();
            result.UpiPaymentDaywiseTransportPaymentReport = new UpiPaymentDaywiseTransportPaymentReport();
            result.DDDaywiseTransportPaymentReport = new DDDaywiseTransportPaymentReport();
            result.ChequeDaywiseTransportPaymentReport = new ChequeDaywiseTransportPaymentReport();
            result.CardDaywiseTransportPaymentReport = new CardDaywiseTransportPaymentReport();
            result.NetBankingDaywiseTransportPaymentReport = new NetBankingTransportDaywisePaymentReport();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StartDate", StartDate);
            parameters.Add("@EndDate", EndDate);

            using (var multiResultSet = await db.QueryMultipleAsync("uspTransportPaymentReportDaywise", parameters, commandType: CommandType.StoredProcedure))
            {
                result.CashDaywiseTransportPaymentReport.CashDaywiseTransportPaymentReportList = multiResultSet.Read<DaywiseTransportPaymentReport>().ToList();
                result.CashDaywiseTransportPaymentReport.CashDaywiseTransportPaymentReportTotal = multiResultSet.Read<DaywiseTransportPaymentReportTotal>().First();
                result.ChequeDaywiseTransportPaymentReport.ChequeDaywiseTransportPaymentReportList = multiResultSet.Read<DaywiseTransportPaymentReport>().ToList();
                result.ChequeDaywiseTransportPaymentReport.ChequeDaywiseTransportPaymentReportTotal = multiResultSet.Read<DaywiseTransportPaymentReportTotal>().First();
                result.DDDaywiseTransportPaymentReport.DDDaywiseTransportPaymentReportList = multiResultSet.Read<DaywiseTransportPaymentReport>().ToList();
                result.DDDaywiseTransportPaymentReport.DDDaywiseTransportPaymentReportTotal = multiResultSet.Read<DaywiseTransportPaymentReportTotal>().First();
                result.CardDaywiseTransportPaymentReport.CardDaywiseTransportPaymentReportList = multiResultSet.Read<DaywiseTransportPaymentReport>().ToList();
                result.CardDaywiseTransportPaymentReport.CardDaywiseTransportPaymentReportTotal = multiResultSet.Read<DaywiseTransportPaymentReportTotal>().First();
                result.NetBankingDaywiseTransportPaymentReport.NetBankingDaywiseTransportPaymentReportList = multiResultSet.Read<DaywiseTransportPaymentReport>().ToList();
                result.NetBankingDaywiseTransportPaymentReport.NetBankingDaywiseTransportPaymentReportTotal = multiResultSet.Read<DaywiseTransportPaymentReportTotal>().First();
                result.UpiPaymentDaywiseTransportPaymentReport.UpiPaymentDaywiseTransportPaymentReportList = multiResultSet.Read<DaywiseTransportPaymentReport>().ToList();
                result.UpiPaymentDaywiseTransportPaymentReport.UpiPaymentDaywiseTransportPaymentReportTotal = multiResultSet.Read<DaywiseTransportPaymentReportTotal>().First();

            }
            return result;
        }
        #endregion
    }

}
