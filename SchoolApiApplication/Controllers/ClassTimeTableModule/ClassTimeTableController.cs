using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.ClassTimeTableModule;
using SchoolApiApplication.DTO.ClassTimeTableModule;
using System.Security.Claims;
using System.Linq;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Azure;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.UserModule;
using SchoolApiApplication.Helper.Interfaces;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.NoticeModule;

namespace SchoolApiApplication.Controllers.ClassTimeTableModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassTimeTableController : ControllerBase
    {
        private readonly IClassTimeTableService _classTimeTableService;
        private readonly ICommonAppService _commonAppService;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IFirebaseNotificationSender _firebaseNotificationSender;
        public ClassTimeTableController(IClassTimeTableService classTimeTableService ,
            ICommonAppService commonAppService, IConfiguration config, IUserService userService, IFirebaseNotificationSender firebaseNotificationSender)
        {
            _classTimeTableService = classTimeTableService;
            _commonAppService = commonAppService;
            _firebaseNotificationSender = firebaseNotificationSender;
            _userService = userService;
            _config = config;

        }

        [Authorize]
        [HttpPost]
        [Route("GetClassTimeTable")]
        public async Task<ActionResult<ClassTimeTableSelectResponseDto>> GetClassTimeTable(int ClassId)
        {
            var result = await _classTimeTableService.GetClassTimeTable(ClassId);
            return Ok(result);
        }


        [Authorize]
        [HttpPost]
        [Route("GetClassTimeTableList")]
        public async Task<ActionResult<DatatableResponseModel>> GetClassTimeTableList(DatatableRequestWrapper requestObjectWrapper)
        {
            var result = await _classTimeTableService.GetClassTimeTableList(requestObjectWrapper);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("ClassTimeTableUpsert")]
        public async Task<ActionResult<CreateTimeTableResponse>> ClassTimeTableUpsert(ClassTimeTableDto classTimeTable)
        {
            int currentYear = DateTime.Now.Year;
            classTimeTable.UserId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            CreateTimeTableResponse response = new CreateTimeTableResponse();

            if (classTimeTable.IsSkipTimeTableValidation || !classTimeTable.IsActive)
            {
                var result = await _classTimeTableService.ClassTimeTableUpsert(classTimeTable);
                response.IsSuccess = result > 0;
            }
            else
            {
                List<TeacherOverlapComparisonErrorDto> lstOverLappedPeriod = await ValidateOverlapExistingPeriod(classTimeTable, currentYear);
               
                if (lstOverLappedPeriod.Count == 0)
                {
                    var result = await _classTimeTableService.ClassTimeTableUpsert(classTimeTable);
                    response.IsSuccess = result > 0;
                }
                else
                {
                    response.lstOverlapPeriod = lstOverLappedPeriod.GroupBy(x =>
                new
                {
                    x.TeacherId,
                    x.Day,
                    x.ClassName,
                    x.StartingHour,
                    x.StartingMinute,
                    x.EndingHour,
                    x.EndingMinute
                }).Select(y => y.First()).OrderBy(x => x.Day)
                  .ThenBy(x => x.StartingHour)
                  .ThenBy(x => x.StartingMinute)
                  .ToList();
                    response.IsSuccess = false;
                }
            }
           

            return Ok(response);

        }
        private async Task<bool> SendTimeTableNotification(MarkTimeTableActiveRequestModel inputModel)
        {
            // send notification
            foreach (var item in inputModel.LstActiveTimeTableId)
            {
                var ClassTimeTableDto = await _classTimeTableService.GetClassTimeTableById(item.ClassTimeTableId);
                if (item.IsActive == true)
                {
                    try
                    {

                        if (ClassTimeTableDto.ClassId > 0)
                        {
                            List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                            var allFCMUsers = await _userService.GetAllFCMTokenUsers(5, ClassTimeTableDto.ClassId);
                            allFCMUsers.ForEach(user =>
                            {
                                try
                                {
                                    var messageTitle = _config["FirebaseSetting:MessageTemplates:Timetable_Template:Title"];
                                    var messageBody = _config["FirebaseSetting:MessageTemplates:Timetable_Template:Body"];

                                    notificationUserDtos.Add(new FCMNotificationUserDto
                                    {
                                        Title = messageTitle,
                                        Body = messageBody,
                                        Token = user.FCMToken,
                                        Data = new Dictionary<string, string>
                                        {
                                        }
                                    });
                                }
                                catch (Exception)
                                {

                                }

                            });

                            await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);
                        }
                        else if (ClassTimeTableDto.ClassId > 0)
                        {
                            List<FCMNotificationUserDto> notificationUserDtos = new List<FCMNotificationUserDto>();
                            var list1 = ClassTimeTableDto.LstClassTimeTableRow.Where(x => x.ClassTimeTableId == ClassTimeTableDto.ClassTimeTableId).ToList();
                            if (list1.Count>0)
                            {
                                var list2 = list1.Where(x => x.ClassTimeTableId == ClassTimeTableDto.ClassTimeTableId).FirstOrDefault();
                                if (list2 != null && list2.LstClassTimeTableColumn != null)
                                {
                                    var teacherIds = list2.LstClassTimeTableColumn.Select(x => x.TeacherId).ToList();
                                    if (teacherIds.Count>0)
                                    {
                                        var allFCMUsers = await _userService.GetAllFCMTokenUsers(3, 0, 0, 0, "", string.Join(",", teacherIds));
                                        allFCMUsers.ForEach(user =>
                                        {
                                            try
                                            {
                                                var messageTitle = _config["FirebaseSetting:MessageTemplates:Notice_Template:Title"];
                                                var messageBody = _config["FirebaseSetting:MessageTemplates:Notice_Template:Body"];
                                                messageBody = messageBody.Replace("{token1}", ClassTimeTableDto.ClassName);

                                                notificationUserDtos.Add(new FCMNotificationUserDto
                                                {
                                                    Title = messageTitle,
                                                    Body = messageBody,
                                                    Token = user.FCMToken,
                                                    Data = new Dictionary<string, string>
                                                    {
                                                    }
                                                });
                                            }
                                            catch (Exception)
                                            {

                                            }

                                        });

                                        await _firebaseNotificationSender.SendFcmNotificationAsync(notificationUserDtos);

                                    }

                                }

                            }


                        }

                    }
                    catch (Exception)
                    {

                    }

                }
                
            }
            return await Task.FromResult(new bool());
        }


        [Authorize]
        [HttpPost]
        [Route("ClassTimeTableDelete")]

        public async Task<ActionResult<int>> ClassTimeTableDelete(int ClassTimeTableId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            var result = await _classTimeTableService.ClassTimeTableDelete(ClassTimeTableId, userId);
            return Ok(result);

        }

        [Authorize]
        [HttpPost]
        [Route("GetTeacherClassTimeTable")]
        public async Task<ActionResult<ClassTimeTableSelectResponseDto>> GetTeacherClassTimeTable(TeacherClassTimeTableRequestDto RequestDto)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            
            RequestDto.AcademicYearId = schoolDetail.AcademicYearId;
            
            var result = await _classTimeTableService.GetTeacherClassTimeTable(RequestDto);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("GetStudentClassTimeTable")]
        public async Task<ActionResult<ClassTimeTableSelectResponseDto>> GetStudentClassTimeTable(StudentClassTimeTableRequestDto RequestDto)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
           
            RequestDto.AcademicYearId = schoolDetail.AcademicYearId;
            
            var result = await _classTimeTableService.GetStudentClassTimeTable(RequestDto);
            return Ok(result);
        }


        [Authorize]
        [HttpPost]
        [Route("MarkTimeTableActiveUpsert")]
        public async Task<ActionResult<int>> MarkTimeTableActiveUpsert(MarkTimeTableActiveRequestModel requestModel)
        {
            var result = await _classTimeTableService.MarkTimeTableActiveUpsert(requestModel);
          //  await SendTimeTableNotification(requestModel);
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("ValidateTimeTable")]
        public async Task<ActionResult<CreateTimeTableResponse>> ValidateTimeTable(List<int> LstClassTimeTableId,int AcademicYearId)
        {
            int currentYear = DateTime.Now.Year;
            CreateTimeTableResponse response = new CreateTimeTableResponse();
            foreach (var ClassTimeTableId in LstClassTimeTableId)
            {
                var classTimeTableDetail = await _classTimeTableService.GetClassTimeTableById(ClassTimeTableId);
                classTimeTableDetail.AcademicYearId= AcademicYearId;
                 var validationOverlaps = await ValidateOverlapExistingPeriod(classTimeTableDetail, currentYear);

                if (validationOverlaps.Count > 0)
                {
                    response.lstOverlapPeriod.AddRange(validationOverlaps);
                    response.IsSuccess = false;
                }
            }

            if (!response.IsSuccess)
            {
                response.lstOverlapPeriod = response.lstOverlapPeriod.GroupBy(x =>
                new
                {
                    x.TeacherId,
                    x.Day,
                    x.ClassName,
                    x.StartingHour,
                    x.StartingMinute,
                    x.EndingHour,
                    x.EndingMinute
                }).Select(y => y.First()).OrderBy(x=>x.Day)
                  .ThenBy(x=>x.StartingHour)
                  .ThenBy(x=>x.StartingMinute)
                  .ToList();
            }

            return Ok(response);
        }

        private async Task<List<TeacherOverlapComparisonErrorDto>> ValidateOverlapExistingPeriod(ClassTimeTableDto classTimeTable, int currentYear)
        {
            var lstTeacherId = classTimeTable
                                    .LstClassTimeTableRow
                                    .SelectMany(x => x.LstClassTimeTableColumn
                                    .Where(x => x.TeacherId != null)
                                    .Select(y => y.TeacherId.Value))
                                    .Distinct();

            Dictionary<int, List<TeacherOverlapComparisonPeriodDto>> dictTeacherPeriodToSave =
                new Dictionary<int, List<TeacherOverlapComparisonPeriodDto>>();
            foreach (var row in classTimeTable.LstClassTimeTableRow)
            {
                foreach (var column in row.LstClassTimeTableColumn)
                {
                    if (column.TeacherId != null)
                    {
                        var teacherDetail = new TeacherOverlapComparisonPeriodDto
                        {
                            TeacherId = column.TeacherId.Value,
                            Day = column.Day,
                            StartDate = new DateTime(currentYear, 1, 1, row.StartingHour, row.StartingMinute, 0, DateTimeKind.Utc),
                            EndDate = new DateTime(currentYear, 1, 1, row.EndingHour, row.EndingMinute, 0, DateTimeKind.Utc),
                            SubjectId = column.SubjectId.Value,
                            SubjectName = column.SubjectName,
                            DayName = column.DayName,
                            TeacherName = column.TeacherName,
                            StartingHour = row.StartingHour,
                            StartingMinute = row.StartingMinute,
                            EndingHour = row.EndingHour,
                            EndingMinute = row.EndingMinute
                        };
                        if (!dictTeacherPeriodToSave.ContainsKey(column.TeacherId.Value))
                        {
                            dictTeacherPeriodToSave.Add(column.TeacherId.Value, new List<TeacherOverlapComparisonPeriodDto> { teacherDetail });

                        }
                        else
                        {
                            dictTeacherPeriodToSave[column.TeacherId.Value].Add(teacherDetail);
                        }
                    }
                }
            }

            Dictionary<int, List<TeacherOverlapComparisonPeriodDto>> dictTeacherExistingPeriod =
                 new Dictionary<int, List<TeacherOverlapComparisonPeriodDto>>();
            foreach (var teacherId in lstTeacherId)
            {
                var teacherExistingTimeTable = await _classTimeTableService.GetTeacherClassTimeTable(new TeacherClassTimeTableRequestDto { TeacherId = teacherId, AcademicYearId = classTimeTable.AcademicYearId });
                foreach (var timeTable in teacherExistingTimeTable.ClassTimeTable)
                {
                    foreach (var row in timeTable.LstClassTimeTableRow)
                    {
                        foreach (var column in row.LstClassTimeTableColumn)
                        {
                            column.ClassName = timeTable.ClassName;
                        }

                    }
                }
                if (classTimeTable.ClassTimeTableId > 0)
                {
                    teacherExistingTimeTable.ClassTimeTable = teacherExistingTimeTable.ClassTimeTable.Where(x => x.ClassTimeTableId != classTimeTable.ClassTimeTableId).ToList();
                }
                foreach (var row in teacherExistingTimeTable.ClassTimeTable.SelectMany(x => x.LstClassTimeTableRow))
                {
                    foreach (var column in row.LstClassTimeTableColumn)
                    {
                        if (column.TeacherId != null)
                        {
                            var teacherDetail = new TeacherOverlapComparisonPeriodDto
                            {
                                TeacherId = column.TeacherId.Value,
                                Day = column.Day,
                                StartDate = new DateTime(currentYear, 1, 1, row.StartingHour, row.StartingMinute, 0, DateTimeKind.Utc),
                                EndDate = new DateTime(currentYear, 1, 1, row.EndingHour, row.EndingMinute, 0, DateTimeKind.Utc),
                                SubjectId = column.SubjectId.Value,
                                SubjectName = column.SubjectName,
                                DayName = column.DayName,
                                TeacherName = column.TeacherName,
                                ClassName = column.ClassName,

                            };
                            if (!dictTeacherExistingPeriod.ContainsKey(column.TeacherId.Value))
                            {
                                dictTeacherExistingPeriod.Add(column.TeacherId.Value, new List<TeacherOverlapComparisonPeriodDto> { teacherDetail });

                            }
                            else
                            {
                                dictTeacherExistingPeriod[column.TeacherId.Value].Add(teacherDetail);
                            }
                        }
                    }
                }

            }
            List<TeacherOverlapComparisonErrorDto> lstOverLappedPeriod = new List<TeacherOverlapComparisonErrorDto>();
            foreach (var teacherKey in dictTeacherPeriodToSave.Keys)
            {
                if (dictTeacherExistingPeriod.ContainsKey(teacherKey))
                {
                    foreach (var periodToSave in dictTeacherPeriodToSave[teacherKey])
                    {
                        foreach (var existingPeriod in dictTeacherExistingPeriod[teacherKey])
                        {
                            if (periodToSave.Day == existingPeriod.Day &&
                                 existingPeriod.StartDate < periodToSave.EndDate
                                && existingPeriod.EndDate > periodToSave.StartDate)
                            {
                                lstOverLappedPeriod.Add(new TeacherOverlapComparisonErrorDto
                                {
                                    Day = existingPeriod.Day,
                                    DayName = existingPeriod.DayName,
                                    ExistingSubjectId = existingPeriod.SubjectId,
                                    ExistingSubjectName = existingPeriod.SubjectName,
                                    TeacherId = existingPeriod.TeacherId,
                                    TeacherName = existingPeriod.TeacherName,
                                    SubjectIdToSave = periodToSave.SubjectId,
                                    SubjectNameToSave = periodToSave.SubjectName,
                                    StartingHour = periodToSave.StartingHour,
                                    StartingMinute = periodToSave.StartingMinute,
                                    EndingMinute = periodToSave.EndingMinute,
                                    EndingHour = periodToSave.EndingHour,
                                    ClassName = existingPeriod.ClassName,
                                });
                            }
                        }
                    }
                }

            }

            return lstOverLappedPeriod;
        }


    }
}
