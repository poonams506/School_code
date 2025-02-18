using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.BusinessLayer.Interfaces.TeachingLoadAnalysisModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.SchoolHolidayModule
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchoolHolidayController : ControllerBase
    {

        private readonly ISchoolHolidayService _schoolHolidayService ;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public SchoolHolidayController(IWebHostEnvironment hostingEnvironment, ISchoolHolidayService schoolHolidayService )
        {
            _hostingEnvironment = hostingEnvironment;
            _schoolHolidayService = schoolHolidayService;
        }


        [HttpPost]
        [Route("GetHolidayDetails")]

        public async Task<ActionResult<DatatableResponseModel>> GetHolidayDetails(DatatableRequestWrapper requestObjectWrapper)
        {
            var SchoolHolidayList = await _schoolHolidayService.GetHolidayDetails(requestObjectWrapper);
            return Ok(SchoolHolidayList);
        }


        [Authorize]
        [HttpGet("SchoolHolidaySelect")]
        public async Task<ActionResult<SchoolHolidayResponseDto>> SchoolHolidaySelect(int AcademicYearId)
        {
            var result = await _schoolHolidayService.SchoolHolidaySelect(AcademicYearId);


            foreach (var schoolHoliday in result.HolidayTypeDetailsList)
            {

                if (schoolHoliday.CalendarDate.Value.Day > 0)
                {

                    schoolHoliday.ngbCalendarDate = new SchoolNgbDateModel
                    {
                        year = schoolHoliday.CalendarDate.Value.Year,
                        month = schoolHoliday.CalendarDate.Value.Month,
                        day = schoolHoliday.CalendarDate.Value.Day
                    };

                }
            }

            return Ok(result);
        }

        [HttpDelete]
        [Route("SchoolHolidayDelete")]
        public async Task<ActionResult<int>> SchoolHolidayDelete(long SchoolHolidayId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _schoolHolidayService.SchoolHolidayDelete(SchoolHolidayId, userId));
        }


        [Authorize]
        [HttpPost("SchoolHolidayInsert")]
        public async Task<ActionResult<string>> SchoolHolidayInsert(SchoolHolidayResponseDto shdObj)

        {
           // SchoolHolidayResponseDto shdObj = JsonConvert.DeserializeObject<SchoolHolidayResponseDto>(Request.Form["schoolHolidayDetail"], new TrimmingConverter());

            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            
                    foreach (var holidayDetails in shdObj.HolidayTypeDetailsList) 
                    {
                        //if (holidayDetails.ngbCalendarDate != null && holidayDetails.ngbCalendarDate.day > 0)
                        if (holidayDetails.ngbCalendarDate.day > 0)

                    {
                        holidayDetails.CalendarDate = new DateTime(holidayDetails.ngbCalendarDate.year,
                                                              holidayDetails.ngbCalendarDate.month,
                                                              holidayDetails.ngbCalendarDate.day);
                        }
                    }

                var result = await _schoolHolidayService.SchoolHolidayInsert(shdObj, userId);
                return Ok(result);
        }

        [Authorize]
        [HttpPost("CheckExistResponse")]
        public async Task<ActionResult<ExistResposeDto>> CheckExistResponse(CalendarDateRequestDto obj)
        {
            
                if (obj.ngbCalendarDate.day > 0)

                {
                    obj.CalendarDate = new DateTime(obj.ngbCalendarDate.year,
                                                         obj.ngbCalendarDate.month,
                                                         obj.ngbCalendarDate.day);
                }
            

            var result = await _schoolHolidayService.CheckExistResponse(obj);
            return Ok(result);

        }





    }

}
