using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolEventModule;
using SchoolApiApplication.BusinessLayer.Interfaces.SchoolVacationModule;
using SchoolApiApplication.BusinessLayer.Services.SchoolEventModule;
using SchoolApiApplication.Common;
using SchoolApiApplication.DTO.CommonModule;
using SchoolApiApplication.DTO.HomeworkModule;
using SchoolApiApplication.DTO.SchoolEventModule;
using SchoolApiApplication.DTO.SchoolHolidayModule;
using SchoolApiApplication.DTO.SchoolVacationModule;
using System.Security.Claims;

namespace SchoolApiApplication.Controllers.SchoolVacationModule
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolVacationController : ControllerBase
    {
        private readonly ISchoolVacationService _schoolVacationService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public SchoolVacationController(IWebHostEnvironment hostingEnvironment, ISchoolVacationService schoolVacationService)
        {
            _hostingEnvironment = hostingEnvironment;
            _schoolVacationService = schoolVacationService;
        }

        [HttpPost]
        [Route("SchoolVacationDetails")]

        public async Task<ActionResult<DatatableResponseModel>> SchoolVacationDetails(DatatableRequestWrapper requestObjectWrapper)
        {
            var SchoolVacationList = await _schoolVacationService.SchoolVacationDetails(requestObjectWrapper);
            return Ok(SchoolVacationList);
        }



        [Authorize]
        [HttpGet("GetSchoolVacationSelect")]
        public async Task<ActionResult<SchoolVacationDto>> GetSchoolVacationSelect(long? SchoolVacationId)
        {

            var result = await _schoolVacationService.GetSchoolVacationSelect(SchoolVacationId);
            if (result.StartDate != null && result.StartDate.Value.Day > 0)
            {
                result.ngbStartDate = new SchoolNgbDateModel
                {
                    year = result.StartDate.Value.Year,
                    month = result.StartDate.Value.Month,
                    day = result.StartDate.Value.Day
                };
            }
            if (result.EndDate != null && result.EndDate.Value.Day > 0)
            {
                result.ngbEndDate = new SchoolNgbDateModel
                {
                    year = result.EndDate.Value.Year,
                    month = result.EndDate.Value.Month,
                    day = result.EndDate.Value.Day
                };
            }

            return Ok(result);
        }

        [HttpDelete]
        [Route("SchoolVacationDelete")]
        public async Task<ActionResult<int>> SchoolVacationDelete(long? SchoolVacationId)
        {
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            return Ok(await _schoolVacationService.SchoolVacationDelete(SchoolVacationId, userId));
        }



        [Authorize]
        [HttpPost("UpdateSchoolVacation")]
        public async Task<ActionResult<int>> UpdateSchoolVacation(SchoolVacationDto Obj)
        {
            //SchoolVacationDto schoolVacationDto = JsonConvert.DeserializeObject<SchoolVacationDto>(Request.Form["schoolvacation"], new TrimmingConverter());
            int userId = Convert.ToInt32(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);
            if (Obj.ngbStartDate != null && Obj.ngbStartDate.day > 0)
            {
                Obj.StartDate = new DateTime(Obj.ngbStartDate.year,
                 Obj.ngbStartDate.month,
                 Obj.ngbStartDate.day);
            }
            if (Obj.ngbEndDate != null && Obj.ngbEndDate.day > 0)
            {
                Obj.EndDate = new DateTime(Obj.ngbEndDate.year,
                 Obj.ngbEndDate.month,
                 Obj.ngbEndDate.day);
            }
            var result = await _schoolVacationService.UpdateSchoolVacation(Obj, userId);
            return Ok(result);
        }
    }
}
