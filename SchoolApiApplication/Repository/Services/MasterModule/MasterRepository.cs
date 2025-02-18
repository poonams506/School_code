using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Data;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.MasterModule;
using SchoolApiApplication.DTO.MasterModule;
using DocumentFormat.OpenXml.Spreadsheet;

namespace SchoolApiApplication.Repository.Services.MasterModule
{
    public class MasterRepository : IMasterRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MasterRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<AddressMasterDto> GetAddressMasterData()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var multiResultSet = await db.QueryMultipleAsync("uspCountryMasterSelect", commandType: CommandType.StoredProcedure))
            {
                var countryMasterData = await multiResultSet.ReadAsync<CountryMasterDto>();
                var stateMasterData = await multiResultSet.ReadAsync<StateMasterDto>();
                var districtMasterData = await multiResultSet.ReadAsync<DistrictMasterDto>();
                var talukaMasterData = await multiResultSet.ReadAsync<TalukaMasterDto>();
                return new AddressMasterDto()
                {
                    CountryList = countryMasterData.ToList(),
                    StateList = stateMasterData.ToList(),
                    DistrictList = districtMasterData.ToList(),
                    TalukaList = talukaMasterData.ToList()
                };
            }

        }
        public async Task<List<MediumType>> GetMediumTypeData()
        {
           using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
           var mediumTypeList= await db.QueryAsync<MediumType>("uspMediumTypeSelect", commandType: CommandType.StoredProcedure);
           return mediumTypeList.ToList();
        }

        public async Task<List<AcademicYear>> GetAcademicYearData()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var academicYearList = await db.QueryAsync<AcademicYear>("uspAcademicYearSelect", commandType: CommandType.StoredProcedure);
            return academicYearList.ToList();
        }
        public async Task<GradeDivisionMasterDto> GetGradeDivisionMasterList(int AcademicYearId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var schoolGradeDivisionMatrixCascadeList = await db.QueryAsync<SchoolGradeDivisionMatrixDto>("uspSchoolGradeDivisionMatrixCascadeSelect", parameters, commandType: CommandType.StoredProcedure);
            using (var multiResultSet = await db.QueryMultipleAsync("uspGradeDivisionMasterSelect", commandType: CommandType.StoredProcedure))
            {
                var gradeList = await multiResultSet.ReadAsync<Grade>();
                var divisionList = await multiResultSet.ReadAsync<Division>();
                return new GradeDivisionMasterDto()
                {
                    Grades = gradeList?.ToList(),
                    Divisions = divisionList?.ToList(),
                    SchoolGradeDivisionMatrixCascadeList= schoolGradeDivisionMatrixCascadeList?.ToList()
                };
            }
        }

        public async Task<List<MonthMasterDto>> GetMonthMasterList()
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var monthMasterList = await db.QueryAsync<MonthMasterDto>("uspMonthMasterSelect", commandType: CommandType.StoredProcedure);
            return monthMasterList.ToList();
        }

        public async Task<CommonDropdownSelectListItemResponseDto> GetStudentDropdownData(int AcademicYearId)
        {
            CommonDropdownSelectListItemResponseDto responseDto=new CommonDropdownSelectListItemResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            var resultList = await db.QueryAsync<CommonDropdownSelectListItemDto>("uspStudentDropdownMasterSelect", parameters, commandType: CommandType.StoredProcedure);
            resultList ??= new List<CommonDropdownSelectListItemDto>();
            responseDto.LstDropdownValues = resultList.ToList();
            return responseDto;

        }

        public async Task<TeacherDropdownSelectListResponseDto> GetTeacherDropdownData(int AcademicYearId)
        {
            TeacherDropdownSelectListResponseDto responseDto = new TeacherDropdownSelectListResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("AcademicYearId", AcademicYearId);
            var resultList = await db.QueryAsync<TeacherDropdownSelectListDto>("uspTeacherDropdownMasterSelect", parameters, commandType: CommandType.StoredProcedure);
            resultList ??= new List<TeacherDropdownSelectListDto>();
            responseDto.LstDropdownValues = resultList.ToList();
            return responseDto;
        }

        public async Task<TeacherDropdownSelectListResponseDto> GetTeacherDropdownWithoutSubject()
        {
            TeacherDropdownSelectListResponseDto responseDto = new TeacherDropdownSelectListResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var resultList = await db.QueryAsync<TeacherDropdownSelectListDto>("uspTeacherDropdownMasterWithoutSubjectSelect", commandType: CommandType.StoredProcedure);
            resultList ??= new List<TeacherDropdownSelectListDto>();
            responseDto.LstDropdownValues = resultList.ToList();
            return responseDto;
        }

        public async Task<CommonDropdownSelectListItemResponseDto> GetClerkDropdownData(int AcademicYearId)
        {
            CommonDropdownSelectListItemResponseDto responseDto = new CommonDropdownSelectListItemResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var resultList = await db.QueryAsync<CommonDropdownSelectListItemDto>("uspClerkDropdownMasterSelect", commandType: CommandType.StoredProcedure);
            resultList ??= new List<CommonDropdownSelectListItemDto>();
            responseDto.LstDropdownValues = resultList.ToList();
            return responseDto;
        }

        public async Task<CommonDropdownSelectListItemResponseDto> GetCabDriverDropdownData(int AcademicYearId)
        {
            CommonDropdownSelectListItemResponseDto responseDto = new CommonDropdownSelectListItemResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            
            var resultList = await db.QueryAsync<CommonDropdownSelectListItemDto>("uspCabDriverDropdownMasterSelect", commandType: CommandType.StoredProcedure);
            resultList ??= new List<CommonDropdownSelectListItemDto>();
            responseDto.LstDropdownValues = resultList.ToList();
            return responseDto;
        }




    }
}
