using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.StudentKitFeePaymentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentKitFeePaymentModule;
using System.Data;
using Dapper;

namespace SchoolApiApplication.Repository.Services.StudentKitFeePaymentModule
{
    public class StudentKitFeePaymentRepository: IStudentKitFeePaymentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentKitFeePaymentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

      public async  Task<StudentKitFeePaymentDueByAYSelectResponseDto> GetStudentKitFeePaymentDueByAYSelect(int studentId, bool currentAcademicYearInclude)
        {
            StudentKitFeePaymentDueByAYSelectResponseDto studentKitFeePaymentDueByAYSelectResponseDto = new StudentKitFeePaymentDueByAYSelectResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentId", studentId);
            parameters.Add("@CurrentAcademicYearInclude", currentAcademicYearInclude);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitFeePaymentDueByAYSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                studentKitFeePaymentDueByAYSelectResponseDto.StudentKitFeePaymentDueByAYList = multiResultSet.Read<StudentKitFeePaymentDueByAYSelectDto>().ToList();
            }
            return studentKitFeePaymentDueByAYSelectResponseDto;
        }

        public async Task<DatatableResponseModel> GetStudentKitFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspStudentKitFeePaymentGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<StudentKitFeePaymentGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

      public async Task<DatatableResponseModel> GetStudentKitFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspStudentKitFeePaymentHistoryGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<StudentKitFeepaymentHistoryGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
       public async Task<StudentKitFeepaymentSelectDto> GetStudentKitFeePaymentSelect(int academicYearId, long studentId, int GradeId, int DivisionId)
        {
            var result = new StudentKitFeepaymentSelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@StudentId", studentId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitFeePaymentSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<StudentKitFeepaymentSelectDto>().First();
                result.StudentKitFeePaymentAdditionalDiscountList = multiResultSet.Read<StudentKitFeePaymentAdditionalDiscount>().ToList();
                result.StudentKitFeePaymentParticularsList = multiResultSet.Read<StudentKitFeePaymentParticulars>().ToList();

            }
            return result;
        }
       public async Task<StudentKitFeepaymentHistorySelectDto> GetStudentKitFeePaymentHistorySelect(short GradeId, short DivisionId, short AcademicYearId, long StudentId, long StudentKitFeePaymentId)
        {

            var result = new StudentKitFeepaymentHistorySelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@StudentId", StudentId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            parameters.Add("@StudentKitFeePaymentId", StudentKitFeePaymentId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitFeePaymentHistorySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<StudentKitFeepaymentHistorySelectDto>().First();
                result.StudentKitFeeParticularsSelectList = multiResultSet.Read<StudentKitFeeParticularsSelectDto>().ToList();
            }
            return result;
        }

    

      public async Task<bool> StudentKitClearCheque(long StudentKitFeePaymentId, int userId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentKitFeePaymentId", StudentKitFeePaymentId);
            parameters.Add("@UserId", userId);
            await db.ExecuteAsync("uspStudentKitFeePaymentChequeClear", parameters, commandType: CommandType.StoredProcedure);
            return true;
        }

       public async Task<int> StudentKitFeePaymentDelete(long StudentKitFeePaymentId, int userId)
        {
            var result = 0;
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentKitFeePaymentId", StudentKitFeePaymentId);
            parameters.Add("@UserId", userId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitFeePaymentDelete", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<int>().First();
            }
            return result;
        }

       public async Task<int> StudentKitFeePaymentUpsert(StudentKitFeepaymentUpsertDto feePaymentUpsertDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable studentKitfeePaymentDetailTypeDT = new();
            studentKitfeePaymentDetailTypeDT.Columns.Add(nameof(StudentKitFeePaymentDetailTypeUpsertDto.FeeParticularId), typeof(long));
            studentKitfeePaymentDetailTypeDT.Columns.Add(nameof(StudentKitFeePaymentDetailTypeUpsertDto.OtherFeeReason), typeof(string));
            studentKitfeePaymentDetailTypeDT.Columns.Add(nameof(StudentKitFeePaymentDetailTypeUpsertDto.FeeAfterDiscount), typeof(decimal));
            studentKitfeePaymentDetailTypeDT.Columns.Add(nameof(StudentKitFeePaymentDetailTypeUpsertDto.PaidAmount), typeof(decimal));
            studentKitfeePaymentDetailTypeDT.Columns.Add(nameof(StudentKitFeePaymentDetailTypeUpsertDto.AdditionalDiscInPercentage), typeof(decimal));
            studentKitfeePaymentDetailTypeDT.Columns.Add(nameof(StudentKitFeePaymentDetailTypeUpsertDto.AdditionalDiscAmount), typeof(decimal));
            feePaymentUpsertDto.StudentKitFeePaymentDetailTypeUpsertDtoList.ForEach(item =>
            {
                var row = studentKitfeePaymentDetailTypeDT.NewRow();
                row[nameof(StudentKitFeePaymentDetailTypeUpsertDto.FeeParticularId)] = item.FeeParticularId;
                row[nameof(StudentKitFeePaymentDetailTypeUpsertDto.OtherFeeReason)] = item.OtherFeeReason;
                row[nameof(StudentKitFeePaymentDetailTypeUpsertDto.FeeAfterDiscount)] = item.FeeAfterDiscount;
                row[nameof(StudentKitFeePaymentDetailTypeUpsertDto.PaidAmount)] = item.PaidAmount;
                row[nameof(StudentKitFeePaymentDetailTypeUpsertDto.AdditionalDiscInPercentage)] = item.AdditionalDiscInPercentage;
                row[nameof(StudentKitFeePaymentDetailTypeUpsertDto.AdditionalDiscAmount)] = item.AdditionalDiscAmount;
                studentKitfeePaymentDetailTypeDT.Rows.Add(row);
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
                StudentKitFeePaymentDetails = studentKitfeePaymentDetailTypeDT.AsTableValuedParameter("[dbo].[StudentKitFeePaymentDetailType]"),

            };
            try
            {
                await db.ExecuteAsync("uspStudentKitFeePaymentUpsert", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
            return 1;
        }
        #region StudentKit Daywise Payment Report
        public async Task<StudentKitDaywisePaymentReportDto> GetStudentKitDayWisePaymentReport(DateTime StartDate, DateTime EndDate)
        {
            var result = new StudentKitDaywisePaymentReportDto();
            result.CashStudentKitDaywisePaymentReport = new CashStudentKitDaywisePaymentReport();
            result.UpiStudentKitDaywisePaymentReport = new UpiStudentKitDaywisePaymentReport();
            result.DDStudentKitDaywisePaymentReport = new DDStudentKitDaywisePaymentReport();
            result.ChequeStudentKitDaywisePaymentReport = new ChequeStudentKitDaywisePaymentReport();
            result.CardStudentKitDaywisePaymentReport = new CardStudentKitDaywisePaymentReport();
            result.NetBankingStudentKitDaywisePaymentReport = new NetBankingStudentKitDaywisePaymentReport();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StartDate", StartDate);
            parameters.Add("@EndDate", EndDate);

            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentKitPaymentReportDaywise", parameters, commandType: CommandType.StoredProcedure))
            {
                result.CashStudentKitDaywisePaymentReport.CashStudentKitDaywisePaymentReportList = multiResultSet.Read<StudentKitDaywisePaymentReport>().ToList();
                result.CashStudentKitDaywisePaymentReport.CashStudentKitDaywisePaymentReportTotal = multiResultSet.Read<StudentKitDaywisePaymentReportTotal>().First();
                result.ChequeStudentKitDaywisePaymentReport.ChequeStudentKitDaywisePaymentReportList = multiResultSet.Read<StudentKitDaywisePaymentReport>().ToList();
                result.ChequeStudentKitDaywisePaymentReport.ChequeStudentKitDaywisePaymentReportTotal = multiResultSet.Read<StudentKitDaywisePaymentReportTotal>().First();
                result.DDStudentKitDaywisePaymentReport.DDStudentKitDaywisePaymentReportList = multiResultSet.Read<StudentKitDaywisePaymentReport>().ToList();
                result.DDStudentKitDaywisePaymentReport.DDStudentKitDaywisePaymentReportTotal = multiResultSet.Read<StudentKitDaywisePaymentReportTotal>().First();
                result.CardStudentKitDaywisePaymentReport.CardStudentKitDaywisePaymentReportList = multiResultSet.Read<StudentKitDaywisePaymentReport>().ToList();
                result.CardStudentKitDaywisePaymentReport.CardStudentKitDaywisePaymentReportTotal = multiResultSet.Read<StudentKitDaywisePaymentReportTotal>().First();
                result.NetBankingStudentKitDaywisePaymentReport.NetBankingStudentKitDaywisePaymentReportList = multiResultSet.Read<StudentKitDaywisePaymentReport>().ToList();
                result.NetBankingStudentKitDaywisePaymentReport.NetBankingStudentKitDaywisePaymentReportTotal = multiResultSet.Read<StudentKitDaywisePaymentReportTotal>().First();
                result.UpiStudentKitDaywisePaymentReport.UpiStudentKitPaymentDaywisePaymentReportList = multiResultSet.Read<StudentKitDaywisePaymentReport>().ToList();
                result.UpiStudentKitDaywisePaymentReport.UpiStudentKitPaymentDaywisePaymentReportTotal = multiResultSet.Read<StudentKitDaywisePaymentReportTotal>().First();

            }
            return result;
        }
        #endregion
    }
}
