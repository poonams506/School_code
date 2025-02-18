using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using SchoolApiApplication.BusinessLayer.Interfaces.MobileAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.ParentAppModule;
using SchoolApiApplication.BusinessLayer.Interfaces.StorageModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.ParentAppModule;
using SchoolApiApplication.DTO.ParentAppModule.FeePayment;
using SchoolApiApplication.DTO.SchoolCalendarModule;
using SchoolApiApplication.DTO.StudentAttendanceModule;

namespace SchoolApiApplication.Controllers.ParentAppModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentAppController : ControllerBase
    {
        private readonly IParentAppService _parentAppService;
        private readonly ICommonAppService _commonAppService;
        private readonly IStorageService _storageService;
        private readonly IWebHostEnvironment _hostingEnvironment;



        public ParentAppController(
            IWebHostEnvironment hostingEnvironment,
            IParentAppService parentAppService,
            ICommonAppService commonAppService,
            IStorageService storageService)
        {
            _hostingEnvironment = hostingEnvironment;
            _parentAppService = parentAppService;
            _commonAppService = commonAppService;
            _storageService = storageService;
        }

        [Authorize]
        [HttpGet("GetParentFeePaymentDetails")]
        public async Task<ActionResult<FeePaymentTopSectionDto>> GetParentFeePaymentDetails(long studentId)
        {
            
                var schoolDetail = await _commonAppService.GetSchoolDetail();
                var result = await _parentAppService.GetParentFeePaymentDetails(studentId, schoolDetail.AcademicYearId);
                return Ok(result);

        }

        [Authorize]
        [HttpGet("GetParentTransportFeePaymentDetails")]
        public async Task<ActionResult<TransportFeePaymentTopSectionDto>> GetParentTransportFeePaymentDetails(long studentId)
        {

            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.GetParentTransportFeePaymentDetails(studentId, schoolDetail.AcademicYearId);
            return Ok(result);

        }

        [HttpGet]
        [Route("OneMonthEvent")]

        public async Task<ActionResult<OneMonthEventParentAppResponseDto>> OneMonthEventDetails(int classId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.OneMonthEventDetails(schoolDetail.AcademicYearId,classId);
            foreach (var schoolEvent in result.OneMonthEventList)
            {
                foreach (var eventDetail in schoolEvent.LstEventDetail)
                {
                    eventDetail.FullPath = await _storageService.GetFullPath(UploadFileType.SCHOOL_UPLOAD, eventDetail.FileName);

                }
                if (schoolEvent.StartDate != null && schoolEvent.StartDate.Value.Day > 0)
                {
                    schoolEvent.ngbStartDate = new SchoolNgbDateModel
                    {
                        year = schoolEvent.StartDate.Value.Year,
                        month = schoolEvent.StartDate.Value.Month,
                        day = schoolEvent.StartDate.Value.Day
                    };
                }
                if (schoolEvent.EndDate != null && schoolEvent.EndDate.Value.Day > 0)
                {
                    schoolEvent.ngbEndDate = new SchoolNgbDateModel
                    {
                        year = schoolEvent.EndDate.Value.Year,
                        month = schoolEvent.EndDate.Value.Month,
                        day = schoolEvent.EndDate.Value.Day
                    };
                }
                if (schoolEvent.StartTime != null && schoolEvent.StartTime.Value.Hour > 0)
                {
                    schoolEvent.ngbStartTime = new SchoolNgbTimeModel
                    {
                        hour = schoolEvent.StartTime.Value.Hour,
                        minute = schoolEvent.StartTime.Value.Minute,
                        second = schoolEvent.StartTime.Value.Second
                    };
                }
                if (schoolEvent.EndTime != null && schoolEvent.EndTime.Value.Hour > 0)
                {
                    schoolEvent.ngbEndTime = new SchoolNgbTimeModel
                    {
                        hour = schoolEvent.EndTime.Value.Hour,
                        minute = schoolEvent.EndTime.Value.Minute,
                        second = schoolEvent.EndTime.Value.Second
                    };
                }
                //if (schoolEvent.LstEventDate. != null && schoolEvent.EventStartDate.Value.Day > 0)
                //{
                //    schoolEvent.ngbEventStartDate = new SchoolNgbDateModel
                //    {
                //        year = schoolEvent.EventStartDate.Value.Year,
                //        month = schoolEvent.EventStartDate.Value.Month,
                //        day = schoolEvent.EventStartDate.Value.Day
                //    };
                //}
                //if (schoolEvent.EventEndDate != null && schoolEvent.EventEndDate.Value.Day > 0)
                //{
                //    schoolEvent.ngbEventEndDate = new SchoolNgbDateModel
                //    {
                //        year = schoolEvent.EventEndDate.Value.Year,
                //        month = schoolEvent.EventEndDate.Value.Month,
                //        day = schoolEvent.EventEndDate.Value.Day
                //    };
                //}
            }
            return Ok(result);
        }


        [HttpGet]
        [Route("OneDayLectureSelect")]

        public async Task<ActionResult<TeacherOneDayLecturesParentAppResponseDto>> TeacherOneDayLecturesParentDetails(int classId, int DayNo)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.TeacherOneDayLecturesParentDetails(schoolDetail.AcademicYearId,classId, DayNo);
            return Ok(result);
        }


        [HttpGet]
        [Route("AttendanceMissingParent")]

        public async Task<ActionResult<MissingAttendanceParentAppDto>> AttendanceMissingParentDetails( int StudentId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.AttendanceMissingParentDetails(schoolDetail.AcademicYearId,StudentId);
            return Ok(result);
        }
        
        [HttpGet]
        [Route("StudentGradeDivision")]
        public async Task<ActionResult<StudentGradeDivisionParentAppDto>> StudentGradeDivisionSelect (int parentId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.StudentGradeDivisionSelect(schoolDetail.AcademicYearId, parentId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("GetParentAppListSelect")]
        public async Task<ActionResult<SchoolParentCalendarResponseDto>> GetParentAppListSelect(int academicYearId,int classId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            academicYearId = (int)schoolDetail.AcademicYearId;


            var result = await _parentAppService.GetParentAppListSelect(academicYearId, classId);
            foreach (var calendarEvent in result.ParentLstEvents)
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
        [Authorize]
        [HttpGet]
        [Route("GetAttendanceDetailByStudentId")]
        public async Task<ActionResult<StudentAttendanceMobileResponseDto>> GetAttendanceDetailByStudentId(long StudentId)
        {
            var schoolDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.GetAttendanceDetailByStudentId(StudentId,schoolDetail.AcademicYearId);
             return Ok(result);   
        }
        [Authorize]
        [HttpGet]
        [Route("GetVehicleTrackListSelect")]
        public async Task<ActionResult<VehicleTrackResponseDto>> GetVehicleTrackListSelect(long StudentId)
        {
            var vehicleTrackDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.GetVehicleTrackListSelect(StudentId, vehicleTrackDetail.AcademicYearId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet]
        [Route("GetStoppageTrackListSelect")]
        public async Task<ActionResult<StoppageTrackResponseDto>> GetStoppageTrackListSelect(long StudentId)
        {
            var stoppageTrackDetail = await _commonAppService.GetSchoolDetail();
            var result = await _parentAppService.GetStoppageTrackListSelect(StudentId, stoppageTrackDetail.AcademicYearId);
            return Ok(result);
        }
    }
}


