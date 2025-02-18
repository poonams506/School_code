using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolHolidayModule;
using SchoolApiApplication.BusinessLayer.Interfaces.WeeklyDayOffModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolHolidayModule;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.WeeklyDayOffModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.WeeklyDayOffModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeeklyDayOffController : ControllerBase
    {
        private readonly IWeeklyDayOffService _weeklyDayOffService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public WeeklyDayOffController(IWebHostEnvironment hostingEnvironment, IWeeklyDayOffService weeklyDayOffService, IHttpContextAccessor httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
            _weeklyDayOffService = weeklyDayOffService;
            _httpContextAccessor = httpContextAccessor;

        }

        [Authorize]
        [HttpGet("WeeklyDayOffSelect")] 
        public async Task<ActionResult<WeeklyDayOffDto>> WeeklyDayOffSelect(int academicYearId)
            {
            var result = await _weeklyDayOffService.WeeklyDayOffSelect(academicYearId);

            return Ok(result);
        }

        [Authorize]
        [HttpPost("WeeklyDayOffInsert")]
        public async Task<ActionResult<int>> WeeklyDayOffInsert(WeeklyDayOffDto obj)


        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var result = await _weeklyDayOffService.WeeklyDayOffInsert(obj, userId);
            return Ok(result);
        }


    }
}
