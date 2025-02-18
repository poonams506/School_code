using Azure;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.StudentDocumentModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SchoolHolidayModule;
using System.Data;
using System.Linq;
using System.Reflection.Metadata.Ecma335;

namespace SchoolApiApplication.Repository.Services.SchoolHolidayModule
{
    public class SchoolHolidayRepository : ISchoolHolidayRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SchoolHolidayRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<DatatableResponseModel> GetHolidayDetails(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSchoolHolidayGridSelect",
                    new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<ScoolHolidayListDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
       
       
        public async Task<int> SchoolHolidayDelete(long? SchoolHolidayId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolHolidayId", SchoolHolidayId);
            parameters.Add("@UserId", UserId);
            return await db.QueryFirstOrDefaultAsync<int>("uspSchoolHolidayDelete", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<SchoolHolidayResponseDto> SchoolHolidaySelect(int SchoolHolidayId)
        {
            SchoolHolidayResponseDto response = new SchoolHolidayResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SchoolHolidayId", SchoolHolidayId);
            using (var multiResultSet = await db.QueryMultipleAsync("uspSchoolHolidaySelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.HolidayTypeDetailsList = multiResultSet.Read<SchoolHolidayDetailDto>()?.ToList() ?? new List<SchoolHolidayDetailDto>();
                return response;
            }
        }

        public async Task<string> SchoolHolidayInsert(SchoolHolidayResponseDto shdObj, int UserId)
        {
            var canTrigger = true;
            List<ExistResposeDto> existRespose = new List<ExistResposeDto>();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            DataTable holidayDetailsDT = new();
            holidayDetailsDT.Columns.Add(nameof(SchoolHolidayDetailDto.SchoolHolidayId), typeof(long));
            holidayDetailsDT.Columns.Add(nameof(SchoolHolidayDetailDto.CalendarDate), typeof(DateTime));
            holidayDetailsDT.Columns.Add(nameof(SchoolHolidayDetailDto.HolidayReason), typeof(string));
            holidayDetailsDT.Columns.Add(nameof(SchoolHolidayDetailDto.DayNo), typeof(int));

            shdObj.HolidayTypeDetailsList?.ForEach(fileDetail =>
            {
                var row = holidayDetailsDT.NewRow();
                row[nameof(SchoolHolidayDetailDto.SchoolHolidayId)] = fileDetail.SchoolHolidayId;
                row[nameof(SchoolHolidayDetailDto.CalendarDate)] = fileDetail.CalendarDate;
                row[nameof(SchoolHolidayDetailDto.HolidayReason)] = fileDetail.HolidayReason;
                row[nameof(SchoolHolidayDetailDto.DayNo)] = fileDetail.DayNo;

                holidayDetailsDT.Rows.Add(row);
            });

            var parameters = new
            {
                shdObj.AcademicYearId,
                UserId,
                HolidayDetails = holidayDetailsDT.AsTableValuedParameter("[dbo].[HolidayDetailsTypes]"),

            };
            var parameters2 = new
            {
                HolidayDetails = holidayDetailsDT.AsTableValuedParameter("[dbo].[HolidayDetailsTypes]"),
                AcademicYearId =shdObj.AcademicYearId

            };
            //var result = await db.QueryFirstOrDefaultAsync<List<ExistResposeDto>>("uspCheckHolidayExits", parameters2, commandType: CommandType.StoredProcedure);
            using (var multiResultSet = await db.QueryMultipleAsync("uspCheckHolidayExits", parameters2, commandType: CommandType.StoredProcedure))
            {

                existRespose = multiResultSet.Read<ExistResposeDto>()?.ToList() ?? new List<ExistResposeDto>();
   
            }
            if (existRespose != null)
            {
                foreach (var item in existRespose)
                {
                    if (item.Exist == 1)
                    {
                        canTrigger = false;
                        break;
                    }
                    else 
                    {
                        canTrigger = true;
                    }
                }
            }
            if (canTrigger) { 

                await db.ExecuteAsync("uspSchoolHolidayInsert", parameters, commandType: CommandType.StoredProcedure);
            }
            if(existRespose != null && existRespose.Count > 0 && existRespose.Where(x => x.Exist == 1).ToList().Count > 0)
            {
                return string.Join(", ", existRespose.Where(x=>x.Exist == 1).Select(x => x.CalendarDate.Value.ToString("dd/MM/yyyy")).ToList());
            }
            return "success";


        }

        public async Task<ExistResposeDto> CheckExistResponse(CalendarDateRequestDto obj)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@CalendarDate", obj.CalendarDate);

            return await db.QueryFirstOrDefaultAsync<ExistResposeDto>("uspCheckHolidayExits", parameters, commandType: CommandType.StoredProcedure);
        }

     
    }
}

