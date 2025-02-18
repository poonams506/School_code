using Dapper;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Data.SqlClient;
using SchoolApiApplication.DTO.Certificate_Module;
using SchoolApiApplication.DTO.FeePaymentModule;
using SchoolApiApplication.DTO.MasterModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.StudentReportModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.StudentReportModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.StudentReportModule
{
    public class StudentReportRepository : IStudentReportRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentReportRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }



        public async Task<CasteWiseStudentCountResponseDto> GetCasteWiseStudentCountSelect(RequestReportDto obj)
        {
            CasteWiseStudentCountResponseDto response = new CasteWiseStudentCountResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());


            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string));

            obj.classIds.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });


            var parameters = new
            {
                obj.AcademicYearId,

                classIds = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };
            using (var multiResultSet = await db.QueryMultipleAsync("uspCasteWiseStudentCountReportSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.CastCountStudentList = multiResultSet.Read<StudentReportDTO>()?.ToList() ?? new List<StudentReportDTO>();
                return response;
            }
        }



        public async Task<CategoryWiseStudentCountReportResponseDTO> GetcategoryStudentCountSelect(RequestReportDto obj)
        {
            CategoryWiseStudentCountReportResponseDTO response = new CategoryWiseStudentCountReportResponseDTO();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string));

            obj.classIds.ForEach(Id =>
             {
                 var row = selectedIdTable.NewRow();
                 row["Id"] = Id;
                 selectedIdTable.Rows.Add(row);
             });


            var parameters = new
            {
                obj.AcademicYearId,

                classIds = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };
            using (var multiResultSet = await db.QueryMultipleAsync("uspCategoryWiseStudentCountReportSelect ", parameters, commandType: CommandType.StoredProcedure))
            {

                response.CategoryCountList = multiResultSet.Read<CategoryWiseStudentCountReportDTO>()?.ToList() ?? new List<CategoryWiseStudentCountReportDTO>();
                return response;
            }
        }

        public async Task<ReligionWiseStudentCountReporResponsetDTO> GetReligionStudentCountSelect(RequestReportDto obj)
        {
            ReligionWiseStudentCountReporResponsetDTO response = new ReligionWiseStudentCountReporResponsetDTO();

            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string)); 

            obj.classIds.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });

            var parameters = new
            {
                obj.AcademicYearId,

                classIds = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };

            using (var multiResultSet = await db.QueryMultipleAsync("uspReligionWiseStudentCountReportSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                response.ReligionCountList = multiResultSet.Read<ReligionWiseStudentCountReportDTO>()?.ToList() ?? new List<ReligionWiseStudentCountReportDTO>();
            }

            return response;
        }


        public async Task<RTEStudentCountReportResponseDto> GetRTEStudentCountSelect(RequestReportDto obj)
        {
            RTEStudentCountReportResponseDto response = new RTEStudentCountReportResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string));

            obj.classIds.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });


            var parameters = new
            {
                obj.AcademicYearId,

                classIds = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };
            using (var multiResultSet = await db.QueryMultipleAsync("uspRTEStudentCountReportSelect ", parameters, commandType: CommandType.StoredProcedure))
            {

                response.RTECountList = multiResultSet.Read<RTEStudentCountReportDTO>()?.ToList() ?? new List<RTEStudentCountReportDTO>();
                return response;
            }
        }

      

        public async Task<StudentGenderCountReportResponseDto> GetTotalStudentCountSelect(RequestReportDto obj)
        {
            StudentGenderCountReportResponseDto response = new StudentGenderCountReportResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string));

            obj.classIds.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });


            var parameters = new
            {
                obj.AcademicYearId,

                classIds = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentGenderCountReportSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.StudentountList = multiResultSet.Read<StudentGenderCountReportDto>()?.ToList() ?? new List<StudentGenderCountReportDto>();
                return response;
            }
        }

       

        public async Task<StudentGenderListResponseDto> GetStudentGenderListSelect(RequestReportDto obj)
        {
            StudentGenderListResponseDto response = new StudentGenderListResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string));

            obj.classIds.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });


            var parameters = new
            {
                obj.AcademicYearId,
                classIds = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentGenderListReportSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.StudentGenderList = multiResultSet.Read<StudentGenderListDto>()?.ToList() ?? new List<StudentGenderListDto>();
                return response;
            }
        }


        public async Task<StudentRTEGenderListResponseDto> GetRTEStudentListSelect(RequestReportDto obj)
        {
            StudentRTEGenderListResponseDto response = new StudentRTEGenderListResponseDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable selectedIdTable = new();
            selectedIdTable.Columns.Add("Id", typeof(string));

            obj.classIds.ForEach(Id =>
            {
                var row = selectedIdTable.NewRow();
                row["Id"] = Id;
                selectedIdTable.Rows.Add(row);
            });


            var parameters = new
            {
                obj.AcademicYearId,
                classIds = selectedIdTable.AsTableValuedParameter("[dbo].[SingleIdType]")
            };
            using (var multiResultSet = await db.QueryMultipleAsync("uspRTEStudentListReportSelect", parameters, commandType: CommandType.StoredProcedure))
            {

                response.RTEStudentGenderList = multiResultSet.Read<StudentRTEGenderListDto>()?.ToList() ?? new List<StudentRTEGenderListDto>();
                return response;
            }
        }

        public async Task<StudentAllFeeReceiptSelectDto> GetStudentAllFeeReceiptSelectDto(int academicYearId, long studentId, int classId)
        {
            var result = new StudentAllFeeReceiptSelectDto();
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", academicYearId);
            parameters.Add("@StudentId", studentId);
            parameters.Add("@ClassId", classId);         
            using (var multiResultSet = await db.QueryMultipleAsync("uspStudentPaymentReceiptReportSelect", parameters, commandType: CommandType.StoredProcedure))
            {
                result = multiResultSet.Read<StudentAllFeeReceiptSelectDto>().First();
                result.StudentFeeReceiptList = multiResultSet.Read<StudentFeeReceiptDto>().ToList();
                
            }
            return result;
        }

        public async Task<StudentNameList> GetStudentNames(short AcademicYearId, short GradeId, short DivisionId, bool WithArchive)
        {
            StudentNameList studentNameList = new StudentNameList();


            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new DynamicParameters();
            parameters.Add("@AcademicYearId", AcademicYearId);
            parameters.Add("@GradeId", GradeId);
            parameters.Add("@DivisionId", DivisionId);
            if (WithArchive == true)
            {
                using (var multiResultSet = await db.QueryMultipleAsync("uspStudentNameIsArchiveIncludedSelect", parameters, commandType: CommandType.StoredProcedure))
                {
                    var result = multiResultSet.Read<StudentListDto>()?.ToList();
                    studentNameList.StudentNames = result == null ? new List<StudentListDto>() : result;

                }
            }
            else
            {
                using (var multiResultSet = await db.QueryMultipleAsync("uspStudentNameSelect", parameters, commandType: CommandType.StoredProcedure))
                {
                    var result = multiResultSet.Read<StudentListDto>()?.ToList();
                    studentNameList.StudentNames = result == null ? new List<StudentListDto>() : result;

                }
            }

            return studentNameList;


        }
    }

}
