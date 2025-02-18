using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.AccessModule;
using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.AdhocFeePaymentModule;
using System.Data;
using YamlDotNet.Core;

namespace SchoolApiApplication.Repository.Services.AdhocFeePaymentModule
{
    public class AdhocFeePaymentRepository : IAdhocFeePaymentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AdhocFeePaymentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        #region Fee Payment
        public async Task<DatatableResponseModel> GetAdhocFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspAdhocFeePaymentGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<AdhocFeePaymentGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<AdhocFeePaymentSelectDto> GetAdhocFeePaymentSelect(Int32 academicYearId, long studentId, Int32 GradeId, Int32 DivisionId)
        {
            var result = new AdhocFeePaymentSelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@StudentId", studentId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspAdhocFeePaymentSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<AdhocFeePaymentSelectDto>().First();
            }
            return result;
        }

        public async Task<int> AdhocFeePaymentUpsert(AdhocFeePaymentUpsertDto adhocFeePaymentUpsertDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            
            var parameters = new
            {
                AcademicYearId = adhocFeePaymentUpsertDto.AcademicYearId == null ? 0 : adhocFeePaymentUpsertDto.AcademicYearId,
                GradeId = adhocFeePaymentUpsertDto.GradeId == null ? 0 : adhocFeePaymentUpsertDto.GradeId,
                DivisionId = adhocFeePaymentUpsertDto.DivisionId == null ? 0 : adhocFeePaymentUpsertDto.DivisionId,
                StudentId = adhocFeePaymentUpsertDto.StudentId == null ? 0 : adhocFeePaymentUpsertDto.StudentId,
                OnlineTransactionId = adhocFeePaymentUpsertDto.OnlineTransactionId == null ? "" : adhocFeePaymentUpsertDto.OnlineTransactionId,
                OnlineTransactionDateTime = adhocFeePaymentUpsertDto.OnlineTransactionDateTime == null ? null : adhocFeePaymentUpsertDto.OnlineTransactionDateTime,
                OnlinePaymentRequest = adhocFeePaymentUpsertDto.OnlinePaymentRequest == null ? "" : adhocFeePaymentUpsertDto.OnlinePaymentRequest,
                OnlinePaymentResponse = adhocFeePaymentUpsertDto.OnlinePaymentResponse == null ? "" : adhocFeePaymentUpsertDto.OnlinePaymentResponse,
                PaidToBank = adhocFeePaymentUpsertDto.PaidToBank == null ? "" : adhocFeePaymentUpsertDto.PaidToBank,
                TotalFee = adhocFeePaymentUpsertDto.TotalFee == null ? 0 : adhocFeePaymentUpsertDto.TotalFee,
                ParticularId = adhocFeePaymentUpsertDto.ParticularId == null ? 0 : adhocFeePaymentUpsertDto.ParticularId,
                PaymentTypeId = adhocFeePaymentUpsertDto.PaymentTypeId == null ? 0 : adhocFeePaymentUpsertDto.PaymentTypeId,
                ChequeNumber = adhocFeePaymentUpsertDto.ChequeNumber == null ? "" : adhocFeePaymentUpsertDto.ChequeNumber,
                ChequeDate = adhocFeePaymentUpsertDto.ChequeDate == null ? null : adhocFeePaymentUpsertDto.ChequeDate,
                ChequeBank = adhocFeePaymentUpsertDto.ChequeBank == null ? "" : adhocFeePaymentUpsertDto.ChequeBank,
                ChequeAmount = adhocFeePaymentUpsertDto.ChequeAmount == null ? 0 : adhocFeePaymentUpsertDto.ChequeAmount,
                IsChequeClear = adhocFeePaymentUpsertDto.IsChequeClear == null ? false : adhocFeePaymentUpsertDto.IsChequeClear,
                UserId = adhocFeePaymentUpsertDto.UserId == null ? 0 : adhocFeePaymentUpsertDto.UserId,

            };
            try
            {
                await db.ExecuteAsync("uspAdhocFeePaymentUpsert", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
            return 1;
        }

        #endregion

        #region Fee Payment history
        public async Task<DatatableResponseModel> GetAdhocFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspAdhocFeePaymentHistoryGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<AdhocPaymentHistoryGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
        public async Task<AdhocFeePaymentHistorySelectDto> GetAdhocFeePaymentHistorySelect(Int16 GradeId, Int16 DivisionId, Int16 AcademicYearId, long StudentId, long adhocFeePaymentId)
        {
            var result = new AdhocFeePaymentHistorySelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@AdhocFeePaymentId", adhocFeePaymentId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspAdhocFeePaymentHistorySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<AdhocFeePaymentHistorySelectDto>().First();
            }
            return result;
        }

        public async Task<bool> AdhocClearCheque(long AdhocFeePaymentId,int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AdhocFeePaymentId", AdhocFeePaymentId);
            parameters.Add("@UserId", UserId);
            await db.ExecuteAsync("uspAdhocFeePaymentChequeClear", parameters, commandType: CommandType.StoredProcedure);
            return true;
        }

        public async Task<int> AdhocFeePaymentDelete(long adhocFeePaymentId,int UserId)
        {
            var result = 0;
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AdhocFeePaymentId", adhocFeePaymentId);
            parameters.Add("@UserId", UserId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspAdhocFeePaymentDelete", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<int>().First();
            }
            return result;
        }

        #endregion

        #region Adhoc Daywise Payment Report 
        public async Task<AdhocFeePaymentDaywiseReportDto> GetDayWiseAdhocPaymentReport(DateTime StartDate, DateTime EndDate)
        {
            var result = new AdhocFeePaymentDaywiseReportDto();
            result.CashDaywiseAdhocPaymentReport = new CashDaywiseAdhocPaymentReport();
            result.UpiAdhocPaymentDaywiseReport = new UpiAdhocPaymentDaywiseReport();
            result.DDDaywiseAdhocPaymentReport = new DDDaywiseAdhocPaymentReport();
            result.ChequeDaywiseAdhocPaymentReport = new ChequeDaywiseAdhocPaymentReport();
            result.CardDaywiseAdhocPaymentReport = new CardDaywiseAdhocPaymentReport();
            result.NetBankingAdhocDaywisePaymentReport = new NetBankingAdhocDaywisePaymentReport();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StartDate", StartDate);
            parameters.Add("@EndDate", EndDate);

            using (var multiResultSet = await db.QueryMultipleAsync("uspAdhocFeePaymentReportDaywise", parameters, commandType: CommandType.StoredProcedure))
            {
                result.CashDaywiseAdhocPaymentReport.CashDaywiseAdhocPaymentReportList = multiResultSet.Read<DaywiseAdhocPaymentReport>().ToList();
                result.CashDaywiseAdhocPaymentReport.CashAdhocDaywisePaymentReportTotal = multiResultSet.Read<DaywiseAdhocPaymentReportTotal>().First();
                result.ChequeDaywiseAdhocPaymentReport.ChequeDaywiseAdhocPaymentReportList = multiResultSet.Read<DaywiseAdhocPaymentReport>().ToList();
                result.ChequeDaywiseAdhocPaymentReport.ChequeDaywiseAdhocPaymentReportTotal = multiResultSet.Read<DaywiseAdhocPaymentReportTotal>().First();
                result.DDDaywiseAdhocPaymentReport.DDDaywiseAdhocPaymentReportList = multiResultSet.Read<DaywiseAdhocPaymentReport>().ToList();
                result.DDDaywiseAdhocPaymentReport.DDDaywiseAdhocPaymentReportTotal = multiResultSet.Read<DaywiseAdhocPaymentReportTotal>().First();
                result.CardDaywiseAdhocPaymentReport.CardDaywiseAdhocPaymentReportList = multiResultSet.Read<DaywiseAdhocPaymentReport>().ToList();
                result.CardDaywiseAdhocPaymentReport.CardDaywiseAdhocPaymentReportTotal = multiResultSet.Read<DaywiseAdhocPaymentReportTotal>().First();
                result.NetBankingAdhocDaywisePaymentReport.NetBankingDaywiseAdhocPaymentReportList = multiResultSet.Read<DaywiseAdhocPaymentReport>().ToList();
                result.NetBankingAdhocDaywisePaymentReport.NetBankingDaywiseAdhocPaymentReportTotal = multiResultSet.Read<DaywiseAdhocPaymentReportTotal>().First();
                result.UpiAdhocPaymentDaywiseReport.UpiAdhocPaymentDaywisePaymentReportList = multiResultSet.Read<DaywiseAdhocPaymentReport>().ToList();
                result.UpiAdhocPaymentDaywiseReport.UpiAdhocPaymentDaywisePaymentReportTotal = multiResultSet.Read<DaywiseAdhocPaymentReportTotal>().First();

            }
            return result;
        }
        #endregion

    }
}
