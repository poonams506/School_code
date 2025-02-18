using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolCalendarModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolEventModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolCalendarModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolEventModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolCalendarModule;
using SchoolApiApplication.DTO.SchoolEventModule;

namespace SchoolApiApplication.Controllers.SchoolCalendarModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolCalendarController : ControllerBase
    {
        private readonly ISchoolCalendarService _schoolCalendarService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IStorageService _storageService;
        private readonly ICommonAppService _commonAppService;
        public SchoolCalendarController(IWebHostEnvironment hostingEnvironment, 
            ISchoolCalendarService schoolCalendarService,
            ICommonAppService commonAppService,
            IStorageService storageService)
        {
            _hostingEnvironment = hostingEnvironment;
            _schoolCalendarService = schoolCalendarService;
            _storageService = storageService;
            _commonAppService = commonAppService;
        }

        [Authorize]
        [HttpGet("SchoolCalenadarSelect")]
        public async Task<ActionResult<SchoolCalendarResponseDto>> SchoolCalendarHolidayEventSelect(int AcademicYearId)
        {


            var result = await _schoolCalendarService.SchoolCalendarHolidayEventSelect( AcademicYearId);
            foreach (var schoolCalendar in result.EventHolidayList)
            {
                if (schoolCalendar.StartDate != null && schoolCalendar.StartDate.Value.Day > 0)
                {
                    schoolCalendar.ngbStartDate = new SchoolNgbDateModel
                    {
                        year = schoolCalendar.StartDate.Value.Year,
                        month = schoolCalendar.StartDate.Value.Month,
                        day = schoolCalendar.StartDate.Value.Day
                    };
                }
                if (schoolCalendar.EndDate != null && schoolCalendar.EndDate.Value.Day > 0)
                {
                    schoolCalendar.ngbEndDate = new SchoolNgbDateModel
                    {
                        year = schoolCalendar.EndDate.Value.Year,
                        month = schoolCalendar.EndDate.Value.Month,
                        day = schoolCalendar.EndDate.Value.Day
                    };
                }
                if (schoolCalendar.StartTime != null && schoolCalendar.StartTime.Value.Hour > 0)
                {
                    schoolCalendar.ngbStartTime = new SchoolNgbTimeModel
                    {
                        hour = schoolCalendar.StartTime.Value.Hour,
                        minute = schoolCalendar.StartTime.Value.Minute,
                        second = schoolCalendar.StartTime.Value.Second
                    };
                }
                if (schoolCalendar.EndTime != null && schoolCalendar.EndTime.Value.Hour > 0)
                {
                    schoolCalendar.ngbEndTime = new SchoolNgbTimeModel
                    {
                        hour = schoolCalendar.EndTime.Value.Hour,
                        minute = schoolCalendar.EndTime.Value.Minute,
                        second = schoolCalendar.EndTime.Value.Second

                    };
                }
                if (schoolCalendar.CalendarDate != null && schoolCalendar.CalendarDate.Value.Day > 0)
                {

                    schoolCalendar.ngbCalendarDate = new SchoolNgbDateModel
                    {
                        year = schoolCalendar.CalendarDate.Value.Year,
                        month = schoolCalendar.CalendarDate.Value.Month,
                        day = schoolCalendar.CalendarDate.Value.Day
                    };

                }
                if (schoolCalendar.VacationStartDate != null && schoolCalendar.VacationStartDate.Value.Day > 0)
                {
                    schoolCalendar.ngbVacationStartDate = new SchoolNgbDateModel
                    {
                        year = schoolCalendar.VacationStartDate.Value.Year,
                        month = schoolCalendar.VacationStartDate.Value.Month,
                        day = schoolCalendar.VacationStartDate.Value.Day
                    };
                }
                if (schoolCalendar.VacationEndDate != null && schoolCalendar.VacationEndDate.Value.Day > 0)
                {
                    schoolCalendar.ngbVacationEndDate = new SchoolNgbDateModel
                    {
                        year = schoolCalendar.VacationEndDate.Value.Year,
                        month = schoolCalendar.VacationEndDate.Value.Month,
                        day = schoolCalendar.VacationEndDate.Value.Day
                    };
                }
                if (schoolCalendar.WeeklyOffDate != null && schoolCalendar.WeeklyOffDate.Value.Day > 0)
                {
                    schoolCalendar.ngbWeeklyOffDate = new SchoolNgbDateModel
                    {
                        year = schoolCalendar.WeeklyOffDate.Value.Year,
                        month = schoolCalendar.WeeklyOffDate.Value.Month,
                        day = schoolCalendar.WeeklyOffDate.Value.Day
                    };
                }
            }
            return Ok(result);
        }

        [Authorize]
        [HttpGet("GetSchoolCalendarEventsForTeacherApp")]
        public async Task<ActionResult<SchoolCalendarAppResponseDto>> GetSchoolCalendarEventsForTeacherApp(int AcademicYearId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            AcademicYearId = (int)schoolDetail.AcademicYearId;
           
            var result = await _schoolCalendarService.GetSchoolCalendarEventsForTeacherApp(AcademicYearId);
            foreach(var calendarEvent in result.LstEvents)
            {
                foreach (var eventDetail in calendarEvent.LstEventDetail)
                {
                    eventDetail.FullPath = await _storageService.GetFullPath(UploadFileType.SCHOOL_UPLOAD, eventDetail.FileName);

                }
                if (calendarEvent.StartDate != null && calendarEvent.StartDate.Value.Day > 0)
                {
                    calendarEvent.ngbStartDate = new SchoolNgbDateModel
                    {
                        year = calendarEvent.StartDate.Value.Year,
                        month = calendarEvent.StartDate.Value.Month,
                        day = calendarEvent.StartDate.Value.Day
                    };
                }
                if (calendarEvent.EndDate != null && calendarEvent.EndDate.Value.Day > 0)
                {
                    calendarEvent.ngbEndDate = new SchoolNgbDateModel
                    {
                        year = calendarEvent.EndDate.Value.Year,
                        month = calendarEvent.EndDate.Value.Month,
                        day = calendarEvent.EndDate.Value.Day
                    };
                }
                if (calendarEvent.StartTime != null && calendarEvent.StartTime.Value.Hour > 0)
                {
                    calendarEvent.ngbStartTime = new SchoolNgbTimeModel
                    {
                        hour = calendarEvent.StartTime.Value.Hour,
                        minute = calendarEvent.StartTime.Value.Minute,
                        second = calendarEvent.StartTime.Value.Second
                    };
                }
                if (calendarEvent.EndTime != null && calendarEvent.EndTime.Value.Hour > 0)
                {
                    calendarEvent.ngbEndTime = new SchoolNgbTimeModel
                    {
                        hour = calendarEvent.EndTime.Value.Hour,
                        minute = calendarEvent.EndTime.Value.Minute,
                        second = calendarEvent.EndTime.Value.Second

                    };
                }
                if (calendarEvent.CalendarDate != null && calendarEvent.CalendarDate.Value.Day > 0)
                {

                    calendarEvent.ngbCalendarDate = new SchoolNgbDateModel
                    {
                        year = calendarEvent.CalendarDate.Value.Year,
                        month = calendarEvent.CalendarDate.Value.Month,
                        day = calendarEvent.CalendarDate.Value.Day
                    };

                }
            }
            return Ok(result);
        }
    }
}
