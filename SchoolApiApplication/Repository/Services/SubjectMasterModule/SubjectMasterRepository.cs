using Dapper;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.SubjectMasterModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.SubjectMasterModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.SubjectMasterModule
{
    public class SubjectMasterRepository: ISubjectMasterRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SubjectMasterRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<DatatableResponseModel> GetSubjectMasterList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            String strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspSubjectMasterGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    datatableResponseModel.data = multi.Read<SubjectMasterDto>()?.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }
        public async Task<SubjectMasterDto> GetSubjectMaster(int SubjectMasterId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SubjectMasterId", SubjectMasterId);
            return await db.QueryFirstOrDefaultAsync<SubjectMasterDto>("uspSubjectMasterSelect", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task<int> SubjectMasterUpsert(SubjectMasterDto SubjectMasterObj, int UserId)
        {

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SubjectMasterId", SubjectMasterObj.SubjectMasterId);
            parameters.Add("@SubjectName", SubjectMasterObj.SubjectName);
            parameters.Add("@UserId", UserId);
            return await db.ExecuteScalarAsync<int>("uspSubjectMasterUpsert", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<SubjectMasterDeleteResponceDto> SubjectMasterDelete(int SubjectMasterId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@SubjectMasterId", SubjectMasterId);
          
            var parameters2 = new DynamicParameters();
            parameters2.Add("@SubjectMasterId", SubjectMasterId);
            parameters2.Add("@UserId", UserId);
            var result = await db.QueryFirstOrDefaultAsync<SubjectMasterDeleteResponceDto>("uspCheckSubjectExist", parameters, commandType: CommandType.StoredProcedure);
           
                if (result.SubjectMappingCount==0 && result.TeacherSubjectMappingCount==0 && result.ObjectCount==0) 
                {
                    return await db.QueryFirstOrDefaultAsync<SubjectMasterDeleteResponceDto>("uspSubjectMasterDelete", parameters2, commandType: CommandType.StoredProcedure);
                }

            return result;
        }



        public async Task<TimetableSubjectDropdownResponseDto> GetAllSubjectsByClassList(TimetableSubjectDropdownRequestDto requestDto)
        {
            TimetableSubjectDropdownResponseDto response = new TimetableSubjectDropdownResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            DataTable classIdDT = new();
            classIdDT.Columns.Add("Id", typeof(string));

            requestDto.LstClass.ForEach(Id =>
            {
                var row = classIdDT.NewRow();
                row["Id"] = Id;
                classIdDT.Rows.Add(row);
            });
            parameters.Add("@ClassId", classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"));
            parameters.Add("@AcademicYearId", requestDto.AcademicYearId);
            var result = await db.QueryAsync<TimetableSubjectDropdownDto>("uspSubjectDropdownSelectByClass", parameters, commandType: CommandType.StoredProcedure);
            result ??= new List<TimetableSubjectDropdownDto>();
            response.Subjects = result.ToList();
            return response;
        }
    }
}
