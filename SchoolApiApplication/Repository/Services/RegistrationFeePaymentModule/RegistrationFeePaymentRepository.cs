using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.AdhocFeePaymentModule;
using SchoolApiApplication.DTO.AdminModule;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.RegistrationFeeModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.RegistrationFeePaymentModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.RegistrationFeePaymentModule
{
    public class RegistrationFeePaymentRepository : IRegistrationFeePaymentRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public RegistrationFeePaymentRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetRegistrationFeePaymentGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspRegistrationFeeGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<RegistrationFeePaymentGridDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<RegistrationFeePaymentSelectDto> GetRegistrationFeePaymentSelect(int academicYearId, long StudentEnquiryId)
        {
            var result = new RegistrationFeePaymentSelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@StudentEnquiryId", StudentEnquiryId);
            parameters.Add("@AcademicYearId", academicYearId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspRegistrationFeeSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<RegistrationFeePaymentSelectDto>().First();
                result.RegistrationFeeParticularList = multiResultSet.Read<RegistrationFeeParticularSelectDto>().ToList();
            }
            return result;
        }

        public async Task<int> RegistrationFeePaymentDelete(int RegistrationFeeId, int UserId)
        {
           
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@RegistrationFeeId", RegistrationFeeId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspRegistrationFeeDelete", parameters, commandType: CommandType.StoredProcedure);

           
        }
    

        public async Task<int> RegistrationFeePaymentUpsert(RegistrationFeePaymentDto registrationFeePaymentDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable registrationFeeDetailsDT = new();
            registrationFeeDetailsDT.Columns.Add(nameof(RegistrationFeeDetailsTypeDto.FeeParticularId), typeof(long));
            registrationFeeDetailsDT.Columns.Add(nameof(RegistrationFeeDetailsTypeDto.InvoiceNumber), typeof(string));
            registrationFeeDetailsDT.Columns.Add(nameof(RegistrationFeeDetailsTypeDto.PaidAmount), typeof(int));
            registrationFeeDetailsDT.Columns.Add(nameof(RegistrationFeeDetailsTypeDto.PaymentTypeId), typeof(string));
            

            registrationFeePaymentDto.RegistrationFeeDetailsParticularList?.ForEach(fileDetail =>
            {
                var row = registrationFeeDetailsDT.NewRow();
                row[nameof(RegistrationFeeDetailsTypeDto.FeeParticularId)] = fileDetail.FeeParticularId;
                row[nameof(RegistrationFeeDetailsTypeDto.InvoiceNumber)] = "";
                row[nameof(RegistrationFeeDetailsTypeDto.PaidAmount)] = fileDetail.PaidAmount;
                row[nameof(RegistrationFeeDetailsTypeDto.PaymentTypeId)] = registrationFeePaymentDto.PaymentTypeId;
                

                registrationFeeDetailsDT.Rows.Add(row);
            });

            var parameters = new
            {
                StudentEnquiryId = registrationFeePaymentDto.StudentEnquiryId == null ? 0 : registrationFeePaymentDto.StudentEnquiryId,
                AcademicYearId = registrationFeePaymentDto.AcademicYearId == null ? 0 : registrationFeePaymentDto.AcademicYearId,
                OnlineTransactionId = registrationFeePaymentDto.OnlineTransactionId == null ? "" : registrationFeePaymentDto.OnlineTransactionId,
                OnlineTransactionDateTime = registrationFeePaymentDto.OnlineTransactionDateTime == null ? null : registrationFeePaymentDto.OnlineTransactionDateTime,
                OnlinePaymentRequest = registrationFeePaymentDto.OnlinePaymentRequest == null ? "" : registrationFeePaymentDto.OnlinePaymentRequest,
                OnlinePaymentResponse = registrationFeePaymentDto.OnlinePaymentResponse == null ? "" : registrationFeePaymentDto.OnlinePaymentResponse,
                PaidToBank = registrationFeePaymentDto.PaidToBank == null ? "" : registrationFeePaymentDto.PaidToBank,
                PaidAmount = registrationFeePaymentDto.TotalFee == null ? 0 : registrationFeePaymentDto.TotalFee,
                PaymentTypeId = registrationFeePaymentDto.PaymentTypeId == null ? 0 : registrationFeePaymentDto.PaymentTypeId,
                Remark = registrationFeePaymentDto.Remark == null ? "" : registrationFeePaymentDto.Remark,
                UserId = registrationFeePaymentDto.UserId == null ? 0 : registrationFeePaymentDto.UserId,
                RegistrationFeeDetails = registrationFeeDetailsDT.AsTableValuedParameter("[dbo].[RegistrationFeeDetailsType]"),

            };
            try
            {
                await db.ExecuteAsync("uspRegistrationFeeUpsert", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw;
            }
            return 1;
        }

        public async Task<DatatableResponseModel> GetRegistrationFeePaymentHistoryGridList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspRegistrationHistoryGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<RegistrationFeePaymentHistorySelectDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async Task<RegistrationFeePaymentHistorySelectDto> GetRegistrationFeePaymentHistorySelect(int AcademicYearId, long StudentEnquiryId, int RegistrationFeeId)
        {
            var result = new RegistrationFeePaymentHistorySelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@StudentEnquiryId", StudentEnquiryId);
            parameters.Add("@RegistrationFeeId", RegistrationFeeId);

            using (var multiResultSet = await db.QueryMultipleAsync("uspRegistrationHistorySelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<RegistrationFeePaymentHistorySelectDto>().First();
                result.FeeParticularsSelectList = multiResultSet.Read<RegistrationFeeParticularSelectDto>().ToList();
            }
            return result;
        }

    }

}
