using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.FeeParticularModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.FeePaymentModule;
using System.Data;
using YamlDotNet.Core;

namespace SchoolApiApplication.Repository.Services.FeePaymentModule
{
    public class FeePaymentRepository : IFeePaymentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public FeePaymentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        #region Fee Payment
        public async Task<DatatableResponseModel> GetFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspFeePaymentGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<FeePaymentGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<DatatableResponseModel> GetFeePaymentDueListByAY(int studentId, bool currentAcademicYearInclude)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", studentId);
            parameters.Add("@CurrentAcademicYearInclude", currentAcademicYearInclude);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeePaymentDueByAYSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                datatableResponseModel.data = multiResultSet.Read<FeePaymentGridDto>().ToList();
            }
            return datatableResponseModel;
        }

        public async Task<FeePaymentSelectDto> GetFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId)
        {
            var result = new FeePaymentSelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@StudentId", studentId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeePaymentSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<FeePaymentSelectDto>().First();
                result.FeePaymentDiscountList = multiResultSet.Read<FeePaymentDiscount>().ToList();
                result.FeePaymentAdditionalDiscountList = multiResultSet.Read<FeePaymentAdditionalDiscount>().ToList();
                result.FeePaymentParticularsList = multiResultSet.Read<FeePaymentParticulars>().OrderByDescending(x => x.FeeParticularId).ToList();
                result.UsedInstallmentList = multiResultSet.Read<long>().ToList();
            }
            return result;
        }

        public async Task<int> FeePaymentUpsert(FeePaymentUpsertDto feePaymentUpsertDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable feePaymentAppliedWavierMappingTypeUpsertDT = new();
            feePaymentAppliedWavierMappingTypeUpsertDT.Columns.Add(nameof(FeePaymentAppliedWavierMappingTypeUpsertDto.FeeParticularWavierMappingId), typeof(long));
            feePaymentAppliedWavierMappingTypeUpsertDT.Columns.Add(nameof(FeePaymentAppliedWavierMappingTypeUpsertDto.DiscountedPercent), typeof(decimal));
            feePaymentAppliedWavierMappingTypeUpsertDT.Columns.Add(nameof(FeePaymentAppliedWavierMappingTypeUpsertDto.DiscountedAmount), typeof(decimal));
            feePaymentUpsertDto.FeePaymentAppliedWavierMappingTypeUpsertDtoList.ForEach(item =>
            {
                var row = feePaymentAppliedWavierMappingTypeUpsertDT.NewRow();
                row[nameof(FeePaymentAppliedWavierMappingTypeUpsertDto.FeeParticularWavierMappingId)] = item.FeeParticularWavierMappingId;
                row[nameof(FeePaymentAppliedWavierMappingTypeUpsertDto.DiscountedPercent)] = item.DiscountedPercent;
                row[nameof(FeePaymentAppliedWavierMappingTypeUpsertDto.DiscountedAmount)] = item.DiscountedAmount;
                feePaymentAppliedWavierMappingTypeUpsertDT.Rows.Add(row);
            });

            DataTable feePaymentDetailTypeDT = new();
            feePaymentDetailTypeDT.Columns.Add(nameof(FeePaymentDetailTypeUpsertDto.FeeParticularId), typeof(long));
            feePaymentDetailTypeDT.Columns.Add(nameof(FeePaymentDetailTypeUpsertDto.OtherFeeReason), typeof(string));
            feePaymentDetailTypeDT.Columns.Add(nameof(FeePaymentDetailTypeUpsertDto.FeeAfterDiscount), typeof(decimal));
            feePaymentDetailTypeDT.Columns.Add(nameof(FeePaymentDetailTypeUpsertDto.PaidAmount), typeof(decimal));
            feePaymentDetailTypeDT.Columns.Add(nameof(FeePaymentDetailTypeUpsertDto.AdditionalDiscInPercentage), typeof(decimal));
            feePaymentDetailTypeDT.Columns.Add(nameof(FeePaymentDetailTypeUpsertDto.AdditionalDiscAmount), typeof(decimal));
            feePaymentUpsertDto.FeePaymentDetailTypeUpsertDtoList.ForEach(item =>
            {
                var row = feePaymentDetailTypeDT.NewRow();
                row[nameof(FeePaymentDetailTypeUpsertDto.FeeParticularId)] = item.FeeParticularId;
                row[nameof(FeePaymentDetailTypeUpsertDto.OtherFeeReason)] = item.OtherFeeReason;
                row[nameof(FeePaymentDetailTypeUpsertDto.FeeAfterDiscount)] = item.FeeAfterDiscount;
                row[nameof(FeePaymentDetailTypeUpsertDto.PaidAmount)] = item.PaidAmount;
                row[nameof(FeePaymentDetailTypeUpsertDto.AdditionalDiscInPercentage)] = item.AdditionalDiscInPercentage;
                row[nameof(FeePaymentDetailTypeUpsertDto.AdditionalDiscAmount)] = item.AdditionalDiscAmount;
                feePaymentDetailTypeDT.Rows.Add(row);
            });
            var parameters = new
            {
                AcademicYearId = feePaymentUpsertDto.AcademicYearId == null ? 0 : feePaymentUpsertDto.AcademicYearId,
                GradeId = feePaymentUpsertDto.GradeId == null ? 0 : feePaymentUpsertDto.GradeId,
                DivisionId = feePaymentUpsertDto.DivisionId == null ? 0 : feePaymentUpsertDto.DivisionId,
                StudentId = feePaymentUpsertDto.StudentId == null ? 0 : feePaymentUpsertDto.StudentId,
                OnlineTransactionId = feePaymentUpsertDto.OnlineTransactionId == null ? "" : feePaymentUpsertDto.OnlineTransactionId,
                OnlineTransactionDateTime = feePaymentUpsertDto.OnlineTransactionDateTime == null ? null : feePaymentUpsertDto.OnlineTransactionDateTime,
                OnlinePaymentRequest = feePaymentUpsertDto.OnlinePaymentRequest == null ? "" : feePaymentUpsertDto.OnlinePaymentRequest,
                OnlinePaymentResponse = feePaymentUpsertDto.OnlinePaymentResponse == null ? "" : feePaymentUpsertDto.OnlinePaymentResponse,
                PaidToBank = feePaymentUpsertDto.PaidToBank == null ? "" : feePaymentUpsertDto.PaidToBank,
                PaidAmount = feePaymentUpsertDto.PaidAmount == null ? 0 : feePaymentUpsertDto.PaidAmount,
                PaymentTypeId = feePaymentUpsertDto.PaymentTypeId == null ? 0 : feePaymentUpsertDto.PaymentTypeId,
                ChequeNumber = feePaymentUpsertDto.ChequeNumber == null ? "" : feePaymentUpsertDto.ChequeNumber,
                ChequeDate = feePaymentUpsertDto.ChequeDate == null ? null : feePaymentUpsertDto.ChequeDate,
                ChequeBank = feePaymentUpsertDto.ChequeBank == null ? "" : feePaymentUpsertDto.ChequeBank,
                ChequeAmount = feePaymentUpsertDto.ChequeAmount == null ? 0 : feePaymentUpsertDto.ChequeAmount,
                IsChequeClear = feePaymentUpsertDto.IsChequeClear == null ? false : feePaymentUpsertDto.IsChequeClear,
                Remark = feePaymentUpsertDto.Remark == null ? "" : feePaymentUpsertDto.Remark,
                AdditionalDiscountedAmount = feePaymentUpsertDto.AdditionalDiscountedAmount == null ? 0 : feePaymentUpsertDto.AdditionalDiscountedAmount,
                InstallmentPaybleFee = feePaymentUpsertDto.InstallmentPaybleFee == null ? 0 : feePaymentUpsertDto.InstallmentPaybleFee,
                AdditionalDiscountedRemark = feePaymentUpsertDto.AdditionalDiscountedRemark == null ? "" : feePaymentUpsertDto.AdditionalDiscountedRemark,
                UserId = feePaymentUpsertDto.UserId == null ? 0 : feePaymentUpsertDto.UserId,
                SkipDiscount = feePaymentUpsertDto.SkipDiscount == null ? false : feePaymentUpsertDto.SkipDiscount,
                FeeWavierTypesInstallmentsDetailsId = feePaymentUpsertDto.FeeWavierTypesInstallmentsDetailsId == 0 ? null : feePaymentUpsertDto.FeeWavierTypesInstallmentsDetailsId,
                FeePaymentAppliedWavierMapping = feePaymentAppliedWavierMappingTypeUpsertDT.AsTableValuedParameter("[dbo].[FeePaymentAppliedWavierMappingType]"),
                FeePaymentDetails = feePaymentDetailTypeDT.AsTableValuedParameter("[dbo].[FeePaymentDetailType]"),

            };
            try
            {
                await db.ExecuteAsync("uspFeePaymentUpsert", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
            return 1;
        }

        public async Task<PaymentFeePageMasterActivityList> GetPaymentFeePageMasterActivityList(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId)
        {
            var result = new PaymentFeePageMasterActivityList();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@StudentId", StudentId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeeParticularWavierMappingSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result.TotalFee = multiResultSet.Read<int>().First();
                result.AvailFeeWavierDiscList = multiResultSet.Read<AvailFeeWavierDiscDto>().ToList();
                result.AvailFeeWavierDiscByInstallments = multiResultSet.Read<AvailFeeWavierDiscByInstallmentDto>().ToList();
                result.InstallmentDetails = multiResultSet.Read<FeeWaiverDto>().ToList();
            }
            return result;
        }
        #endregion

        #region Fee Payment history
        public async Task<DatatableResponseModel> GetFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspFeePaymentHistoryGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<PaymentHistoryGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
        public async Task<FeePaymentHistorySelectDto> GetFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long FeePaymentId)
        {
            var result = new FeePaymentHistorySelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@FeePaymentId", FeePaymentId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeePaymentHistorySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<FeePaymentHistorySelectDto>().First();
                result.FeeParticularsSelectList = multiResultSet.Read<FeeParticularsSelectDto>().ToList();
            }
            return result;
        }

        public async Task<bool> ClearCheque(long FeePaymentId, int userId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@FeePaymentId", FeePaymentId);
            parameters.Add("@UserId", userId);
            await db.ExecuteAsync("uspFeePaymentChequeClear", parameters, commandType: CommandType.StoredProcedure);
            return true;
        }

        public async Task<int> FeePaymentDelete(long FeePaymentId, int userId)
        {
            var result = 0;
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@FeePaymentId", FeePaymentId);
            parameters.Add("@UserId", userId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspFeePaymentDelete", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<int>().First();
            }
            return result;
        }

        #endregion

        #region Payment Report
        public async Task<DaywisePaymentReportDTO> GetDayWisePaymentReport(DateTime StartDate, DateTime EndDate)
        {
            var result = new DaywisePaymentReportDTO();
            result.CashDaywisePaymentReport = new CashDaywisePaymentReport();
            result.UpiPaymentDaywisePaymentReport = new UpiPaymentDaywisePaymentReport();
            result.DDDaywisePaymentReport = new DDDaywisePaymentReport();
            result.ChequeDaywisePaymentReport = new ChequeDaywisePaymentReport();
            result.CardDaywisePaymentReport = new CardDaywisePaymentReport();
            result.NetBankingDaywisePaymentReport= new NetBankingDaywisePaymentReport();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();          
            parameters.Add("@StartDate", StartDate);
            parameters.Add("@EndDate", EndDate);
           
            using (var multiResultSet = await db.QueryMultipleAsync("uspPaymentReportDaywise", parameters, commandType: CommandType.StoredProcedure))
            {
                result.CashDaywisePaymentReport.CashDaywisePaymentReportList = multiResultSet.Read<DaywisePaymentReport>().ToList();
                result.CashDaywisePaymentReport.CashDaywisePaymentReportTotal = multiResultSet.Read<DaywisePaymentReportTotal>().First();
                result.ChequeDaywisePaymentReport.ChequeDaywisePaymentReportList = multiResultSet.Read<DaywisePaymentReport>().ToList();
                result.ChequeDaywisePaymentReport.ChequeDaywisePaymentReportTotal = multiResultSet.Read<DaywisePaymentReportTotal>().First();
                result.DDDaywisePaymentReport.DDDaywisePaymentReportList = multiResultSet.Read<DaywisePaymentReport>().ToList();
                result.DDDaywisePaymentReport.DDDaywisePaymentReportTotal = multiResultSet.Read<DaywisePaymentReportTotal>().First();
                result.CardDaywisePaymentReport.CardDaywisePaymentReportList = multiResultSet.Read<DaywisePaymentReport>().ToList();
                result.CardDaywisePaymentReport.CardDaywisePaymentReportTotal = multiResultSet.Read<DaywisePaymentReportTotal>().First();
                result.NetBankingDaywisePaymentReport.NetBankingDaywisePaymentReportList = multiResultSet.Read<DaywisePaymentReport>().ToList();
                result.NetBankingDaywisePaymentReport.NetBankingDaywisePaymentReportTotal = multiResultSet.Read<DaywisePaymentReportTotal>().First();
                result.UpiPaymentDaywisePaymentReport.UpiPaymentDaywisePaymentReportList = multiResultSet.Read<DaywisePaymentReport>().ToList();
                result.UpiPaymentDaywisePaymentReport.UpiPaymentDaywisePaymentReportTotal = multiResultSet.Read<DaywisePaymentReportTotal>().First();

            }
            return result;
        }

        public async Task<int> FeePaymentPreviousAYPedingFeeUpdate(long StudentId, decimal PreviousAcademicYearPendingFeeAmount, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@PreviousAcademicYearPendingFeeAmount", PreviousAcademicYearPendingFeeAmount);
            parameters.Add("@UserId", UserId);
            return await db.ExecuteAsync("uspUpdatePreviousAcademicAYPendingFee", parameters, commandType: CommandType.StoredProcedure);

        }

        #endregion

    }
}
