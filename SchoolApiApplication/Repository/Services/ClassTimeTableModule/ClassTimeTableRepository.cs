using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using SchoolApiApplication.DTO.ClassTimeTableModule;
using SchoolApiApplication.DTO.ClerkModule;
using SchoolApiApplication.DTO.NoticeModule;
using SchoolApiApplication.Extensions;
using SchoolApiApplication.Repository.Interfaces.ClassTimeTableModule;
using System.Data;

namespace SchoolApiApplication.Repository.Services.ClassTimeTableModule
{
    public class ClassTimeTableRepository : IClassTimeTableRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ClassTimeTableRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ClassTimeTableSelectResponseDto> GetClassTimeTable(int ClassId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspClassTimeTableSelect",
                     new { ClassId  }, commandType: CommandType.StoredProcedure))
                {
                    ClassTimeTableSelectResponseDto responseDto = multi.Read<ClassTimeTableSelectResponseDto>().FirstOrDefault() ?? new ClassTimeTableSelectResponseDto();
                    responseDto.ClassTimeTable = multi.Read<ClassTimeTableDto>()?.ToList() ?? new List<ClassTimeTableDto>();
                    if (responseDto.ClassTimeTable.Any())
                    {
                        var lstRows = multi.Read<ClassTimeTableRowDetailDto>().ToList();
                        var lstColumns = multi.Read<ClassTimeTableColumnDetailDto>().ToList();

                        responseDto.ClassTimeTable.ForEach(timeTable =>
                        {
                            timeTable.LstClassTimeTableRow = lstRows.Where(x => x.ClassTimeTableId == timeTable.ClassTimeTableId).OrderBy(x=>x.EndingHour).ToList();
                            timeTable.LstClassTimeTableRow.ForEach(row =>
                            {
                                row.LstClassTimeTableColumn= lstColumns.Where(y => y.SequenceId == row.SequenceId ).OrderBy(x=>x.Day).ToList();
                            });
                        });
                    }
                    return responseDto;
                }
            }
           
        }

        public async Task<DatatableResponseModel> GetClassTimeTableList(DatatableRequestWrapper requestObjectWrapper)
        {
            DatatableResponseModel datatableResponseModel = new DatatableResponseModel();
            string strRequestModel = JsonConvert.SerializeObject(requestObjectWrapper);
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspClassTimeTableGridSelect",
                     new { RequestModel = strRequestModel }, commandType: CommandType.StoredProcedure))
                {
                    datatableResponseModel.recordsTotal = multi.Read<int>().First();
                    var timeTableGridData= multi.Read<ClassTimeTableListDto>().ToList();
                    var allTimeTableName= multi.Read<TimeTableIsActiveSelectListItem>().ToList();
                    foreach (var gridItem in timeTableGridData)
                    {
                        gridItem.TimeTableIsActiveSelectList= allTimeTableName.Where(x=>x.ClassId== gridItem.ClassId).ToList();
                        gridItem.LstActiveTimeTable = gridItem.TimeTableIsActiveSelectList.Where(x => x.IsActive).Select(x => x.ClassTimeTableId).ToList();
                    }
                    datatableResponseModel.data = timeTableGridData.ToList();
                    datatableResponseModel.recordsFiltered = datatableResponseModel.recordsTotal;
                }
            }
            return datatableResponseModel;
        }

        public async  Task<int> ClassTimeTableUpsert(ClassTimeTableDto classTimeTable)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable rowDT = new();
            rowDT.Columns.Add(nameof(ClassTimeTableRowDetailDto.ClassTimeTableId), typeof(int));
            rowDT.Columns.Add(nameof(ClassTimeTableRowDetailDto.PeriodTypeId), typeof(int));
            rowDT.Columns.Add(nameof(ClassTimeTableRowDetailDto.StartingHour), typeof(int));
            rowDT.Columns.Add(nameof(ClassTimeTableRowDetailDto.StartingMinute), typeof(int));
            rowDT.Columns.Add(nameof(ClassTimeTableRowDetailDto.EndingHour), typeof(int));
            rowDT.Columns.Add(nameof(ClassTimeTableRowDetailDto.EndingMinute), typeof(int));
            rowDT.Columns.Add(nameof(ClassTimeTableRowDetailDto.SequenceId), typeof(int));
            




            DataTable columnDT = new();
            columnDT.Columns.Add(nameof(ClassTimeTableColumnDetailDto.ClassTimeTableId), typeof(int));
            columnDT.Columns.Add(nameof(ClassTimeTableColumnDetailDto.Day), typeof(int));
            columnDT.Columns.Add(nameof(ClassTimeTableColumnDetailDto.SubjectId), typeof(int));
            columnDT.Columns.Add(nameof(ClassTimeTableColumnDetailDto.TeacherId), typeof(int));
            columnDT.Columns.Add(nameof(ClassTimeTableColumnDetailDto.SequenceId), typeof(int));
           

            var SequenceId = 1;
            classTimeTable.LstClassTimeTableRow.ForEach(crow =>
            {
                var row = rowDT.NewRow();
                row[nameof(ClassTimeTableRowDetailDto.ClassTimeTableId)] = crow.ClassTimeTableId;
                row[nameof(ClassTimeTableRowDetailDto.PeriodTypeId)] = crow.PeriodTypeId;
                row[nameof(ClassTimeTableRowDetailDto.StartingHour)] = crow.StartingHour;
                row[nameof(ClassTimeTableRowDetailDto.StartingMinute)] = crow.StartingMinute;
                row[nameof(ClassTimeTableRowDetailDto.EndingHour)] = crow.EndingHour;
                row[nameof(ClassTimeTableRowDetailDto.EndingMinute)] = crow.EndingMinute;
                row[nameof(ClassTimeTableRowDetailDto.SequenceId)] = SequenceId;
               

                rowDT.Rows.Add(row);

                crow.LstClassTimeTableColumn.ForEach(ccolumn =>
                {
                    var row= columnDT.NewRow();
                    row[nameof(ClassTimeTableRowDetailDto.ClassTimeTableId)] = crow.ClassTimeTableId;
                    row[nameof(ClassTimeTableColumnDetailDto.Day)] = ccolumn.Day;
                    if(ccolumn.SubjectId!=null) row[nameof(ClassTimeTableColumnDetailDto.SubjectId)] = ccolumn.SubjectId;
                    if (ccolumn.TeacherId != null) row[nameof(ClassTimeTableColumnDetailDto.TeacherId)] = ccolumn.TeacherId;
                    row[nameof(ClassTimeTableColumnDetailDto.SequenceId)] = SequenceId;
                    

                    columnDT.Rows.Add(row);

                });

                SequenceId++;
            });

            var parameters = new
            {
                classTimeTable.ClassTimeTableId,
                classTimeTable.ClassId,
                classTimeTable.ClassTimeTableName,
                TimeTableRowDetail = rowDT.AsTableValuedParameter("[dbo].[ClassTimeTableRowDetailType]"),
                TimeTableColumnDetail = columnDT.AsTableValuedParameter("[dbo].[ClassTimeTableColumnDetailType]"),
                classTimeTable.AcademicYearId,
                classTimeTable.UserId

            };
            return await db.ExecuteScalarAsync<int>("uspClassTimeTableUpsert", parameters, commandType: CommandType.StoredProcedure);


        }

        public async Task<int> ClassTimeTableDelete(int ClassTimeTableId, int UserId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            var parameters = new
            {
                ClassTimeTableId,
                UserId
            };
            return await db.ExecuteScalarAsync<int>("uspClassTimeTableDelete", parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<ClassTimeTableSelectResponseDto> GetTeacherClassTimeTable(TeacherClassTimeTableRequestDto RequestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                DataTable classIdDT = new();
                classIdDT.Columns.Add("Id", typeof(string));

                RequestDto.ClassId.ForEach(Id =>
                {
                    var row = classIdDT.NewRow();
                    row["Id"] = Id;
                    classIdDT.Rows.Add(row);
                });

                var parameters = new
                {
                    RequestDto.TeacherId,
                    ClassId = classIdDT.AsTableValuedParameter("[dbo].[SingleIdType]"),
                    RequestDto.AcademicYearId

                };
                using (var multi = await connection.QueryMultipleAsync("uspTeacherClassTimeTableSelect",
                     parameters, commandType: CommandType.StoredProcedure))
                {
                    ClassTimeTableSelectResponseDto responseDto = multi.Read<ClassTimeTableSelectResponseDto>().FirstOrDefault() ?? new ClassTimeTableSelectResponseDto();
                    responseDto.ClassTimeTable = multi.Read<ClassTimeTableDto>()?.ToList() ?? new List<ClassTimeTableDto>();
                    if (responseDto.ClassTimeTable.Any())
                    {
                        var lstRows = multi.Read<ClassTimeTableRowDetailDto>().ToList();
                        var lstColumns = multi.Read<ClassTimeTableColumnDetailDto>().ToList();

                        responseDto.ClassTimeTable.ForEach(timeTable =>
                        {
                            timeTable.LstClassTimeTableRow = lstRows.Where(x => x.ClassTimeTableId == timeTable.ClassTimeTableId).ToList();
                            timeTable.LstClassTimeTableRow.ForEach(row =>
                            {
                                row.LstClassTimeTableColumn = lstColumns.Where(y => y.SequenceId == row.SequenceId).ToList();
                            });
                        });

                        responseDto.ClassTimeTable= responseDto.ClassTimeTable.Where(x => x.LstClassTimeTableRow.Any()).ToList();
                    }
                    return responseDto;
                }
            }

        }

        public async Task<ClassTimeTableSelectResponseDto> GetStudentClassTimeTable(StudentClassTimeTableRequestDto RequestDto)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                
                var parameters = new
                {
                    RequestDto.ClassId,
                    RequestDto.AcademicYearId

                };
                using (var multi = await connection.QueryMultipleAsync("uspStudentClassTimeTableSelect",
                     parameters, commandType: CommandType.StoredProcedure))
                {
                    ClassTimeTableSelectResponseDto responseDto = multi.Read<ClassTimeTableSelectResponseDto>().FirstOrDefault() ?? new ClassTimeTableSelectResponseDto();
                    responseDto.ClassTimeTable = multi.Read<ClassTimeTableDto>()?.ToList() ?? new List<ClassTimeTableDto>();
                    if (responseDto.ClassTimeTable.Any())
                    {
                        var lstRows = multi.Read<ClassTimeTableRowDetailDto>().ToList();
                        var lstColumns = multi.Read<ClassTimeTableColumnDetailDto>().ToList();

                        responseDto.ClassTimeTable.ForEach(timeTable =>
                        {
                            timeTable.LstClassTimeTableRow = lstRows.Where(x => x.ClassTimeTableId == timeTable.ClassTimeTableId).ToList();
                            timeTable.LstClassTimeTableRow.ForEach(row =>
                            {
                                row.LstClassTimeTableColumn = lstColumns.Where(y => y.SequenceId == row.SequenceId).ToList();
                            });
                        });

                        responseDto.ClassTimeTable = responseDto.ClassTimeTable.Where(x => x.LstClassTimeTableRow.Any()).ToList();
                    }
                    return responseDto;
                }
            }

        }

       
        public async Task<int> MarkTimeTableActiveUpsert(MarkTimeTableActiveRequestModel requestModel)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());

            DataTable isActiveDT = new();
            isActiveDT.Columns.Add(nameof(MarkTimeTableActiveSelectModel.ClassTimeTableId), typeof(int));
            isActiveDT.Columns.Add(nameof(MarkTimeTableActiveSelectModel.IsActive), typeof(bool));
            requestModel.LstActiveTimeTableId.ForEach(checkBox =>
            {
                var row = isActiveDT.NewRow();
                row[nameof(MarkTimeTableActiveSelectModel.ClassTimeTableId)] = checkBox.ClassTimeTableId;
                row[nameof(MarkTimeTableActiveSelectModel.IsActive)] = checkBox.IsActive;
                isActiveDT.Rows.Add(row);
            });

            var parameters = new
            {
                @ClassTimeTableId = isActiveDT.AsTableValuedParameter("[dbo].[ClassTimeTableMarkActiveType]"),
            };
            return await db.ExecuteAsync("uspClassTimeTableIsActiveUpsert", parameters, commandType: CommandType.StoredProcedure);

        }

        public async Task<ClassTimeTableDto> GetClassTimeTableById(int ClassTimeTableId)
        {
            using IDbConnection db = new SqlConnection(_httpContextAccessor.GetSchoolDBConnectionString());
            using (var connection = new SqlConnection(db.ConnectionString))
            {
                using (var multi = await connection.QueryMultipleAsync("uspClassTimeTableSelectById",
                     new { ClassTimeTableId }, commandType: CommandType.StoredProcedure))
                {
                    ClassTimeTableDto responseDto = multi.Read<ClassTimeTableDto>().FirstOrDefault() ?? new ClassTimeTableDto();
                    
                    var lstRows = multi.Read<ClassTimeTableRowDetailDto>().ToList();
                    var lstColumns = multi.Read<ClassTimeTableColumnDetailDto>().ToList();

                    responseDto.LstClassTimeTableRow = lstRows.Where(x => x.ClassTimeTableId == responseDto.ClassTimeTableId).ToList();
                    responseDto.LstClassTimeTableRow.ForEach(row =>
                    {
                        row.LstClassTimeTableColumn = lstColumns.Where(y => y.SequenceId == row.SequenceId).ToList();
                    });

                    return responseDto;
                }
            }

        }
    }
}