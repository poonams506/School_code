using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolEventModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolMonthEventModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolEventModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolMonthEventModule;

namespace SchoolApiApplication.Controllers.SchoolMonthEventModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolMonthEventController : ControllerBase
    {
        private readonly ISchoolMonthEventService _schoolMonthEventService;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public SchoolMonthEventController(IWebHostEnvironment hostingEnvironment, ISchoolMonthEventService schoolMonthEventService)
        {
            _hostingEnvironment = hostingEnvironment;
            _schoolMonthEventService = schoolMonthEventService;
        }
        [HttpGet]
        [Route("SchoolMonthEvent")]

        public async Task<ActionResult<SchoolMonthEventResponseDto>> SchoolMonthEventStaffSelect(int AcademicYearId)
        {
            var result = await _schoolMonthEventService.SchoolMonthEventStaffSelect(AcademicYearId);
            foreach (var schoolEvent in result.SchoolMonthEventList)
            {
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
            }
            return Ok(result);
        }


      


        
    }
}
